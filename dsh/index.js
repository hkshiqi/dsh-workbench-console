// dsh-workbench-console — 工作台框架（服务端）
// 职责：提供工作台外壳所需的通用存储与接口。**不包含任何业务工作台逻辑。**
// 业务工作台通过客户端 API ctx.workbenchConsole.register() 注册进来。
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { homedir } from 'node:os'

export const name = 'dsh-workbench-console'
export const inject = ['connection']

const ROUTE = '/_dsh/dsh-workbench-console'

function dshHomeDir() {
  const c = typeof process.env.DSH_HOME === 'string' ? process.env.DSH_HOME.trim() : ''
  return c.length > 0 ? c : join(homedir(), '.dsh')
}

export function apply(ctx, config) {
  const root = (config && typeof config.root === 'string' && config.root.length > 0)
    ? config.root : join(dshHomeDir(), 'dsh-workbench-console')
  const stateFile = join(root, 'state.json')

  const defaultState = {
    version: 1,
    activeId: null,
    /** 用户自建的简易工作台（数据驱动，非代码模块） */
    items: [],
    /** 各工作台模块自己的数据，按 dataKey 分区；框架不解释内容 */
    data: {},
    /** 工作台 → 绑定的对话 sessionId（深度绑定对话窗口） */
    binds: {}
  }

  function readState() {
    try {
      if (!existsSync(stateFile)) return JSON.parse(JSON.stringify(defaultState))
      const raw = JSON.parse(readFileSync(stateFile, 'utf8'))
      const s = Object.assign(JSON.parse(JSON.stringify(defaultState)), raw)
      if (!s.items || !Array.isArray(s.items)) s.items = []
      if (!s.data || typeof s.data !== 'object') s.data = {}
      if (!s.binds || typeof s.binds !== 'object') s.binds = {}
      return s
    } catch { return JSON.parse(JSON.stringify(defaultState)) }
  }
  function writeState(s) {
    try { mkdirSync(root, { recursive: true }); writeFileSync(stateFile, JSON.stringify(s, null, 2), 'utf8'); return null }
    catch (e) { return String(e && e.message || e) }
  }
  const newId = (p) => p + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7)

  const ROUTES = {
    /** 读全量状态（含各模块数据） */
    snapshot: async () => readState(),

    setActive: async (args) => {
      const s = readState()
      const id = args && args.id !== undefined ? args.id : null
      if (id !== null && !s.items.some((x) => x.id === id)) {
        // 代码模块的 id 不在 items 里，框架照存不误（模块由客户端注册表提供）
      }
      s.activeId = id
      const f = writeState(s)
      return f ? { ok: false, error: f } : { ok: true, state: s }
    },

    /** 新增一个用户自建工作台（简易型，数据驱动） */
    addItem: async (args) => {
      const s = readState()
      const item = {
        id: newId('wb'),
        title: String((args && args.title) || '').trim() || '未命名工作台',
        glyph: String((args && args.glyph) || '').trim() || '🧩',
        description: String((args && args.description) || ''),
        enabled: true,
        items: []
      }
      s.items.push(item)
      s.activeId = item.id
      const f = writeState(s)
      return f ? { ok: false, error: f } : { ok: true, state: s, created: item.id }
    },

    updateItem: async (args) => {
      const s = readState()
      const it = s.items.find((x) => x.id === String((args && args.id) || ''))
      if (!it) return { ok: false, error: '没有这个工作台' }
      const p = (args && args.patch) || {}
      if (typeof p.title === 'string' && p.title.trim()) it.title = p.title.trim()
      if (typeof p.glyph === 'string' && p.glyph.trim()) it.glyph = p.glyph.trim()
      if (typeof p.description === 'string') it.description = p.description
      if (typeof p.enabled === 'boolean') it.enabled = p.enabled
      const f = writeState(s)
      return f ? { ok: false, error: f } : { ok: true, state: s }
    },

    removeItem: async (args) => {
      const s = readState()
      const id = String((args && args.id) || '')
      const before = s.items.length
      s.items = s.items.filter((x) => x.id !== id)
      if (s.items.length === before) return { ok: false, error: '没有这个工作台' }
      if (s.activeId === id) s.activeId = s.items.length ? s.items[0].id : null
      const f = writeState(s)
      return f ? { ok: false, error: f } : { ok: true, state: s }
    },

    /** 简易工作台的条目操作 */
    listOp: async (args) => {
      const s = readState()
      const it = s.items.find((x) => x.id === String((args && args.id) || ''))
      if (!it) return { ok: false, error: '没有这个工作台' }
      if (!Array.isArray(it.items)) it.items = []
      const act = String((args && args.action) || '')
      const itemId = String((args && args.itemId) || '')
      if (act === 'add') {
        const text = String((args && args.text) || '').trim()
        if (!text) return { ok: false, error: '内容不能为空' }
        it.items.push({ id: newId('t'), text, done: false })
      } else if (act === 'toggle') {
        const t = it.items.find((x) => x.id === itemId)
        if (!t) return { ok: false, error: '条目不存在' }
        t.done = !t.done
      } else if (act === 'remove') {
        it.items = it.items.filter((x) => x.id !== itemId)
      } else if (act === 'clear-done') {
        it.items = it.items.filter((x) => !x.done)
      } else return { ok: false, error: '未知 action：' + act }
      const f = writeState(s)
      return f ? { ok: false, error: f } : { ok: true, state: s }
    },

    /** 重命名插件注册的工作台（存到 state.modTitles，不碰插件本身） */
    renameModule: async (args) => {
      const s = readState()
      const id = String((args && args.id) || '')
      const title = String((args && args.title) || '').trim()
      if (!id) return { ok: false, error: '缺少 id' }
      if (!title) return { ok: false, error: '名称不能为空' }
      if (!s.modTitles || typeof s.modTitles !== 'object') s.modTitles = {}
      s.modTitles[id] = title
      const f = writeState(s)
      return f ? { ok: false, error: f } : { ok: true, state: s }
    },

    /** 绑定/解绑对话：args = { id, sessionId }（sessionId 传 null 解绑） */
    bindSession: async (args) => {
      const s = readState()
      const id = String((args && args.id) || '')
      if (!id) return { ok: false, error: '缺少 id' }
      const sid = args && args.sessionId
      if (!s.binds || typeof s.binds !== 'object') s.binds = {}
      if (sid === null || sid === undefined || sid === '') delete s.binds[id]
      else s.binds[id] = String(sid)
      const f = writeState(s)
      return f ? { ok: false, error: f } : { ok: true, state: s, sessionId: s.binds[id] || null }
    },

    /** 模块数据分区读写（框架不解释内容，只是通用 KV） */
    readData: async (args) => {
      const s = readState()
      const key = String((args && args.key) || '')
      if (!key) return { ok: false, error: '缺少 key' }
      return { ok: true, key, value: s.data[key] === undefined ? null : s.data[key] }
    },
    writeData: async (args) => {
      const s = readState()
      const key = String((args && args.key) || '')
      if (!key) return { ok: false, error: '缺少 key' }
      s.data[key] = args ? args.value : null
      const f = writeState(s)
      return f ? { ok: false, error: f } : { ok: true, key }
    }
  }

  function respond(res, status, payload) {
    const body = JSON.stringify(payload)
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(body), 'Cache-Control': 'no-store' })
    res.end(body)
  }
  function readBody(req, limit) {
    return new Promise((resolve) => {
      let n = 0; const cs = []
      req.on('data', (c) => { n += c.length; if (n > limit) { req.destroy(); resolve(''); return } cs.push(c) })
      req.on('end', () => resolve(Buffer.concat(cs).toString('utf8')))
      req.on('error', () => resolve(''))
    })
  }

  ctx.inject(['connection', 'webServer'], function (webCtx) {
    webCtx.effect(function () {
      return webCtx.webServer.register({
        kind: 'prefix', path: ROUTE,
        handler: async function (req, res) {
          try {
            const rejection = webCtx.connection.requestRejection(req)
            if (rejection !== undefined) { respond(res, rejection, { ok: false, error: '请求被拒绝' }); return }
            const url = new URL(req.url || '/', 'http://localhost')
            if (!url.pathname.startsWith(ROUTE + '/')) { respond(res, 404, { ok: false, error: 'not found' }); return }
            const method = decodeURIComponent(url.pathname.slice(ROUTE.length + 1))
            const fn = Object.hasOwn(ROUTES, method) ? ROUTES[method] : null
            if (typeof fn !== 'function') { respond(res, 404, { ok: false, error: 'unknown method: ' + method }); return }
            let args = {}
            if (req.method === 'POST' || req.method === 'PUT') {
              const raw = await readBody(req, 512 * 1024)
              if (raw.length > 0) { try { args = JSON.parse(raw) } catch { respond(res, 400, { ok: false, error: 'invalid JSON' }); return } }
            }
            respond(res, 200, await fn(args))
          } catch (e) { respond(res, 500, { ok: false, error: String(e && e.message || e) }) }
        }
      })
    }, 'dsh-workbench-console: Web routes')
  })

  if (!existsSync(stateFile)) writeState(readState())
}
