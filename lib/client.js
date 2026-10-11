window.__ModuleLoader__.load({
  id: 'dsh-workbench-console',
  factory: (require) => {
    var module = { exports: {} }; var exports = module.exports
    const React = require('react')
    const h = React.createElement

    const RPC = '/_dsh/dsh-workbench-console'
    const NS = 'workbench.console'
    const PANEL = 'workbench-console'

    const zh = {
      sectionTitle: '工作台', add: '＋', addTitle: '新增工作台', manage: '管理工作台',
      panelTitle: '工作台', empty: '还没有工作台。', inputPlaceholder: '输入内容后按回车…',
      addItem: '添加', clearDone: '清空已完成', rename: '改名', remove: '删除',
      confirm: '创建', close: '关闭', namePlaceholder: '例如：选品台', glyphPlaceholder: '图标，如 🧩',
      descPlaceholder: '简介（可留空）', enabled: '显示', emptyList: '这个工作台还没有条目',
      failed: '操作失败', noModule: '该工作台尚未就绪', loading: '加载中…'
    }

    const CSS = [
      '.qwc-box{display:flex;flex-direction:column;gap:2px;margin:4px 0 8px;padding:0 4px;box-sizing:border-box;flex:0 0 100%;width:100%;max-width:100%;min-width:0;align-self:stretch}',
      '.qwc-head{display:flex;align-items:center;justify-content:space-between;gap:6px;padding:2px 4px 4px;color:var(--dsw-alias-label-secondary,currentColor);font-size:11px;font-weight:600;opacity:.72}',
      '.qwc-headbtn{background:none;border:0;color:inherit;font:inherit;cursor:pointer;opacity:.85;padding:1px 6px;border-radius:5px;font-size:13px;line-height:1.2}',
      '.qwc-headbtn:hover{opacity:1;background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.14))}',
      '.qwc-row{display:flex;align-items:center;gap:8px;width:100%;min-width:0;box-sizing:border-box;padding:6px 7px;border:0;border-radius:6px;background:none;color:inherit;font:inherit;cursor:pointer;text-align:left}',
      '.qwc-row:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.14))}',
      '.qwc-row[data-active="true"]{background:var(--dsw-alias-interactive-bg-active,rgba(127,127,127,.2))}',
      '.qwc-glyph{flex:none;width:18px;text-align:center;font-size:13px;line-height:1}',
      '.qwc-label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12.5px}',
      '.qwc-count{flex:none;font-size:10.5px;opacity:.55;font-variant-numeric:tabular-nums}',
      '.qwc-rail{display:flex;flex-direction:column;align-items:center;gap:2px;margin:4px 0 8px;flex:0 0 100%;width:100%}',
      '.qwc-railitem{width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:0;border-radius:6px;background:none;color:inherit;cursor:pointer;font-size:15px;padding:0}',
      '.qwc-railitem:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.14))}',
      '.qwc-railitem[data-active="true"]{background:var(--dsw-alias-interactive-bg-active,rgba(127,127,127,.2))}',
      '.qwc-panel{display:flex;flex-direction:column;gap:14px;padding:22px 26px;height:100%;box-sizing:border-box;overflow:auto}',
      '.qwc-title{margin:0;font-size:19px;font-weight:600}',
      '.qwc-sub{margin:0;font-size:12.5px;line-height:1.6;opacity:.7}',
      '.qwc-card{border:1px solid var(--dsw-alias-border-default,rgba(127,127,127,.25));border-radius:9px;padding:12px 14px;display:flex;flex-direction:column;gap:10px}',
      '.qwc-field{display:flex;flex-direction:column;gap:5px;font-size:12px;opacity:.85}',
      '.qwc-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px}',
      '.qwc-item{display:flex;align-items:flex-start;gap:9px;padding:5px 6px;border-radius:6px}',
      '.qwc-item:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.1))}',
      '.qwc-text{flex:1;min-width:0;font-size:13px;line-height:1.5;word-break:break-word}',
      '.qwc-done{text-decoration:line-through;opacity:.5}',
      '.qwc-x{flex:none;border:0;background:none;color:inherit;opacity:.35;cursor:pointer;font-size:14px;line-height:1;padding:0 3px}',
      '.qwc-x:hover{opacity:.9}',
      '.qwc-add{display:flex;gap:8px;align-items:center}',
      '.qwc-input{flex:1;min-width:0;box-sizing:border-box;padding:7px 9px;border-radius:7px;border:1px solid var(--dsw-alias-border-default,rgba(127,127,127,.35));background:var(--dsw-alias-bg-elevated,transparent);color:inherit;font:inherit;font-size:13px}',
      '.qwc-btn{padding:6px 12px;border-radius:7px;border:1px solid var(--dsw-alias-border-default,rgba(127,127,127,.35));background:none;color:inherit;font:inherit;font-size:12.5px;cursor:pointer;white-space:nowrap}',
      '.qwc-btn:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.14))}',
      '.qwc-btn[disabled]{opacity:.45;cursor:default}',
      '.qwc-error{color:#e5484d;font-size:12px}',
      '.qwc-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:4px}',
      '.qwc-managelist{display:flex;flex-direction:column;gap:6px;max-height:44vh;overflow:auto}',
      '.qwc-managerow{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:7px;border:1px solid var(--dsw-alias-border-default,rgba(127,127,127,.25))}',
      '.qwc-switch{display:flex;align-items:center;gap:5px;font-size:11.5px;opacity:.8;flex:none}',
      '.qwc-fill{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.qwc-tag{font-size:10.5px;padding:1px 7px;border-radius:999px;border:1px solid currentColor;opacity:.6;flex:none}',
      '[class*="footerActions"]{flex-wrap:wrap;row-gap:2px;align-items:center}'
    ].join('')

    function installStyles() {
      if (typeof document === 'undefined') return
      const ex = document.querySelector('style[data-qwc]')
      if (ex) { if (ex.textContent !== CSS) ex.textContent = CSS; return }
      const t = document.createElement('style')
      t.dataset.qwc = '1'; t.dataset.pluginCss = 'dsh-workbench-console/ui.css'; t.textContent = CSS
      document.head.appendChild(t)
    }

    // ══════════════════════════════════════════════════════════════════════
    // 框架核心：工作台注册表。业务插件通过 ctx.workbenchConsole.register() 注册。
    //   register({ id, title, glyph, description, component, order }) => disposer
    //   模块数据用 ctx.workbenchConsole.data(id) 读写（落到框架状态文件的 data 分区）。
    // ══════════════════════════════════════════════════════════════════════
    function createRegistry() {
      const modules = new Map()   // id -> { id, title, glyph, description, component, order }
      const listeners = new Set()
      const notify = () => { for (const f of [...listeners]) f() }
      return {
        register(def) {
          if (!def || typeof def.id !== 'string' || !def.id) throw new Error('workbenchConsole.register: 需要 id')
          if (typeof def.component !== 'function') throw new Error('workbenchConsole.register: 需要 component')
          const entry = {
            id: def.id,
            title: typeof def.title === 'string' && def.title ? def.title : def.id,
            glyph: typeof def.glyph === 'string' && def.glyph ? def.glyph : '🧩',
            description: typeof def.description === 'string' ? def.description : '',
            order: typeof def.order === 'number' ? def.order : 100,
            component: def.component
          }
          modules.set(def.id, entry)
          notify()
          return () => { if (modules.get(def.id) === entry) { modules.delete(def.id); notify() } }
        },
        list() { return [...modules.values()].sort((a, b) => a.order - b.order) },
        get(id) { return modules.get(id) || null },
        subscribe(f) { listeners.add(f); return () => { listeners.delete(f) } }
      }
    }

    function createStore(v) {
      let val = v; const ls = new Set()
      return { getSnapshot: () => val, subscribe: (f) => { ls.add(f); return () => { ls.delete(f) } }, set: (n) => { val = n; for (const f of [...ls]) f() } }
    }

    const registry = createRegistry()
    const stateStore = createStore({ version: 1, activeId: null, items: [], data: {} })
    const revStore = createStore(0)   // 注册表变化时自增，驱动重渲染
    registry.subscribe(() => revStore.set(revStore.getSnapshot() + 1))

    function useStore(s) {
      if (typeof React.useSyncExternalStore === 'function') return React.useSyncExternalStore(s.subscribe, s.getSnapshot, s.getSnapshot)
      const [v, setV] = React.useState(s.getSnapshot())
      React.useEffect(() => s.subscribe(() => setV(s.getSnapshot())), [s])
      return v
    }

    // ── 统一的「工作台列表」：代码模块 + 用户自建 ──
    function allWorkbenches(state) {
      const mods = registry.list().map((m) => ({ id: m.id, title: m.title, glyph: m.glyph, description: m.description, kind: 'module', count: null }))
      const items = (state.items || []).filter((x) => x.enabled !== false).map((x) => ({
        id: x.id, title: x.title, glyph: x.glyph, description: x.description, kind: 'item',
        count: (x.items || []).filter((t) => !t.done).length
      }))
      return [...mods, ...items]
    }

    // ── 侧边栏：工作区下方 ──
    function WorkbenchList(props) {
      const wide = props && props.wide !== false
      const state = useStore(stateStore)
      useStore(revStore)
      const list = allWorkbenches(state)
      const [busy, setBusy] = React.useState(false)
      if (list.length === 0) return null

      function select(id) {
        if (busy) return
        setBusy(true)
        Promise.resolve().then(() => api.setActive(id)).catch(() => {}).then(() => setBusy(false))
      }
      if (!wide) {
        return h('div', { className: 'qwc-rail' }, list.map((it) => h('button', {
          key: it.id, type: 'button', className: 'qwc-railitem', title: it.title, 'aria-label': it.title,
          'data-active': String(state.activeId === it.id), onClick: () => select(it.id)
        }, it.glyph)))
      }
      return h('div', { className: 'qwc-box' },
        h('div', { className: 'qwc-head' },
          h('span', null, zh.sectionTitle),
          h('button', { type: 'button', className: 'qwc-headbtn', title: zh.addTitle, onClick: () => api.manage(true) }, zh.add)),
        list.map((it) => h('button', {
          key: it.id, type: 'button', className: 'qwc-row', title: it.title,
          'data-active': String(state.activeId === it.id), onClick: () => select(it.id)
        },
          h('span', { className: 'qwc-glyph' }, it.glyph),
          h('span', { className: 'qwc-label' }, it.title),
          it.kind === 'module' ? h('span', { className: 'qwc-count', title: '插件工作台' }, '◆')
            : h('span', { className: 'qwc-count' }, String(it.count))
        ))
      )
    }

    // ── 主面板：渲染当前工作台 ──
    function Panel() {
      const state = useStore(stateStore)
      const rev = useStore(revStore)
      const [managing, setManaging] = React.useState(false)
      const list = allWorkbenches(state)
      const current = list.find((x) => x.id === state.activeId) || null

      let body = null
      if (managing) body = h(Manage)
      else if (!current) {
        body = h('div', { className: 'qwc-panel' },
          h('h1', { className: 'qwc-title' }, zh.panelTitle),
          h('p', { className: 'qwc-sub' }, list.length ? '从左侧「工作台」里选一个开始。' : zh.empty),
          h('div', null, h('button', { type: 'button', className: 'qwc-btn', onClick: () => setManaging(true) }, zh.manage)))
      } else {
        const mod = registry.get(current.id)
        if (mod) {
          const C = mod.component
          body = h('div', { style: { height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column' } },
            h(C, { workbench: { id: mod.id, title: mod.title }, api: moduleApi(mod.id) }))
        } else {
          body = h(ItemPanel, { item: (state.items || []).find((x) => x.id === current.id) })
        }
      }
      return h('div', { className: 'qwc-panel', style: { padding: 0, gap: 0, height: '100%' } }, body)
    }

    // ── 用户自建（简易）工作台面板 ──
    function ItemPanel(props) {
      const state = useStore(stateStore)
      const it = (state.items || []).find((x) => x.id === (props.item && props.item.id)) || props.item
      const [draft, setDraft] = React.useState('')
      const [err, setErr] = React.useState(null)
      const [busy, setBusy] = React.useState(false)
      if (!it) return h('div', { className: 'qwc-panel' }, h('p', { className: 'qwc-sub' }, zh.emptyList))
      const run = (fn) => {
        if (busy) return
        setBusy(true); setErr(null)
        Promise.resolve().then(fn).catch((e) => setErr(String(e && e.message || e))).then(() => setBusy(false))
      }
      const items = it.items || []
      const done = items.filter((x) => x.done).length
      return h('div', { className: 'qwc-panel' },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' } },
          h('h1', { className: 'qwc-title' }, (it.glyph || '🧩') + ' ' + it.title),
          h('span', { className: 'qwc-tag' }, items.length + ' 项 · ' + done + ' 已完成')),
        it.description ? h('p', { className: 'qwc-sub' }, it.description) : null,
        h('div', { className: 'qwc-add' },
          h('input', {
            className: 'qwc-input', value: draft, placeholder: zh.inputPlaceholder,
            onChange: (e) => setDraft(e.target.value),
            onKeyDown: (e) => { if (e.key === 'Enter') run(async () => { const t = draft.trim(); if (!t) return; await api.listOp(it.id, 'add', { text: t }); setDraft('') }) }
          }),
          h('button', { type: 'button', className: 'qwc-btn', disabled: busy || !draft.trim(), onClick: () => run(async () => { const t = draft.trim(); if (!t) return; await api.listOp(it.id, 'add', { text: t }); setDraft('') }) }, zh.addItem)),
        err ? h('div', { className: 'qwc-error' }, err) : null,
        items.length === 0 ? h('p', { className: 'qwc-sub' }, zh.emptyList)
          : h('div', null,
              h('ul', { className: 'qwc-list' }, items.map((it2) => h('li', { className: 'qwc-item', key: it2.id },
                h('input', { type: 'checkbox', checked: it2.done, onChange: () => run(() => api.listOp(it.id, 'toggle', { itemId: it2.id })) }),
                h('span', { className: it2.done ? 'qwc-text qwc-done' : 'qwc-text' }, it2.text),
                h('button', { type: 'button', className: 'qwc-x', title: zh.remove, onClick: () => run(() => api.listOp(it.id, 'remove', { itemId: it2.id })) }, '×')))),
              done > 0 ? h('div', { style: { marginTop: 12 } }, h('button', { type: 'button', className: 'qwc-btn', disabled: busy, onClick: () => run(() => api.listOp(it.id, 'clear-done', {})) }, zh.clearDone)) : null))
    }

    // ── 管理（面板内视图，无覆盖层）──
    function Manage() {
      const state = useStore(stateStore)
      const [title, setTitle] = React.useState('')
      const [glyph, setGlyph] = React.useState('')
      const [desc, setDesc] = React.useState('')
      const [err, setErr] = React.useState(null)
      const [busy, setBusy] = React.useState(false)
      const run = (fn) => {
        if (busy) return
        setBusy(true); setErr(null)
        Promise.resolve().then(fn).catch((e) => setErr(String(e && e.message || e))).then(() => setBusy(false))
      }
      const items = state.items || []
      return h('div', { className: 'qwc-panel' },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' } },
          h('h1', { className: 'qwc-title' }, zh.manage),
          h('span', { style: { flex: 1 } }),
          h('button', { type: 'button', className: 'qwc-btn', onClick: () => api.manage(false) }, zh.close)),
        h('div', { className: 'qwc-card' },
          h('p', { className: 'qwc-sub' }, '插件注册的工作台（◆）由各插件自己管理，这里只列出；下面是你在本机自建的工作台。'),
          h('div', { className: 'qwc-sub' }, '已注册的插件工作台：' + (registry.list().map((m) => m.title).join('、') || '（暂无）')),
          h('div', { className: 'qwc-managelist' },
            items.map((it) => h('div', { className: 'qwc-managerow', key: it.id },
              h('span', { className: 'qwc-glyph' }, it.glyph),
              h('span', { className: 'qwc-fill', title: it.title }, it.title),
              h('label', { className: 'qwc-switch' },
                h('input', { type: 'checkbox', checked: it.enabled !== false, disabled: busy, onChange: () => run(() => api.update(it.id, { enabled: it.enabled === false })) }), zh.enabled),
              h('button', { type: 'button', className: 'qwc-btn', disabled: busy, onClick: () => { const n = window.prompt(zh.rename, it.title); if (n === null || !n.trim()) return; run(() => api.update(it.id, { title: n.trim() })) } }, zh.rename),
              h('button', { type: 'button', className: 'qwc-btn', disabled: busy, onClick: () => { if (!window.confirm(zh.remove + ' “' + it.title + '”？')) return; run(() => api.remove(it.id)) } }, zh.remove)))),
          h('label', { className: 'qwc-field' }, zh.addTitle, h('input', { className: 'qwc-input', value: title, placeholder: zh.namePlaceholder, onChange: (e) => setTitle(e.target.value) })),
          h('label', { className: 'qwc-field' }, zh.glyphPlaceholder, h('input', { className: 'qwc-input', value: glyph, maxLength: 4, placeholder: '🧩', onChange: (e) => setGlyph(e.target.value) })),
          h('label', { className: 'qwc-field' }, zh.descPlaceholder, h('input', { className: 'qwc-input', value: desc, onChange: (e) => setDesc(e.target.value) })),
          err ? h('div', { className: 'qwc-error' }, zh.failed + '：' + err) : null,
          h('div', { className: 'qwc-actions' },
            h('button', { type: 'button', className: 'qwc-btn', disabled: busy || !title.trim(), onClick: () => run(async () => { await api.add({ title, glyph, description: desc }); setTitle(''); setGlyph(''); setDesc('') }) }, zh.confirm))))
    }

    // ── 内部 api（组件直接用，不走 props）──
    async function rpc(method, args) {
      const res = await fetch(RPC + '/' + method, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(args || {}) })
      const raw = await res.text()
      let j = null; try { j = raw ? JSON.parse(raw) : null } catch {}
      if (!res.ok) throw new Error((j && j.error) || ('HTTP ' + res.status))
      if (j && j.ok === false) throw new Error(j.error || 'unknown')
      return j
    }
    const api = {
      async refresh() { const s = await rpc('snapshot', {}); stateStore.set(s); return s },
      async setActive(id) {
        const cur = stateStore.getSnapshot()
        stateStore.set(Object.assign({}, cur, { activeId: id }))
        try { panelSelect() } catch {}
        const r = await rpc('setActive', { id })
        if (r && r.state) stateStore.set(r.state)
      },
      async add(input) { const r = await rpc('addItem', input); if (r && r.state) stateStore.set(r.state) },
      async update(id, patch) { const r = await rpc('updateItem', { id, patch }); if (r && r.state) stateStore.set(r.state) },
      async remove(id) { const r = await rpc('removeItem', { id }); if (r && r.state) stateStore.set(r.state) },
      async listOp(id, action, extra) { const r = await rpc('listOp', Object.assign({ id, action }, extra || {})); if (r && r.state) stateStore.set(r.state) },
      manage(on) { manageStore.set(!!on) }
    }
    const manageStore = createStore(false)

    /** 模块 API：给注册进来的工作台用，读写自己的数据分区 */
    function moduleApi(id) {
      return {
        id,
        async read(key) { const r = await rpc('readData', { key: 'wb:' + id + ':' + key }); return r.value },
        async write(key, value) { return await rpc('writeData', { key: 'wb:' + id + ':' + key, value }) },
        async getAll() { const s = await rpc('snapshot', {}); const d = s.data || {}; const pre = 'wb:' + id + ':'; const out = {}; for (const k of Object.keys(d)) if (k.startsWith(pre)) out[k.slice(pre.length)] = d[k]; return out }
      }
    }

    // 面板切换（layout.selectPanel）由 apply 提供
    let selectPanelFn = () => {}
    function panelSelect() { try { selectPanelFn() } catch {} }

    const inject = ['slots', 'locale', 'layout']

    function apply(ctx) {
      installStyles()
      ctx.effect(() => ctx.locale.register(NS, { zh, en: zh }), 'workbench-console: dict')
      selectPanelFn = () => { try { ctx.layout.selectPanel(PANEL) } catch {} }
      manageStore.subscribe(() => { if (manageStore.getSnapshot()) panelSelect() })

      // ★ 框架对外暴露的服务：其他插件用它注册工作台
      ctx.provide('workbenchConsole', {
        /** 注册一个工作台。返回注销函数（请交给 ctx.effect 管理）。 */
        register(def) {
          const off = registry.register(def)
          // 首次注册时让面板可见
          return off
        },
        list: () => registry.list(),
        get: (id) => registry.get(id),
        /** 读写该工作台自己的数据分区（可选，也可自己用宿主路由） */
        data(id) { return moduleApi(id) },
        /** 让侧边栏/面板重新读取状态 */
        refresh: () => api.refresh()
      })

      ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: PANEL, locale: NS }, Panel))
      ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({ name: 'sidebar.footer.action', id: 'workbench-console-list', order: -100, locale: NS }, WorkbenchList))

      void api.refresh().catch(() => {})
    }

    exports.apply = apply
    exports.inject = inject
    exports.__registry = registry   // 供外部插件/测试访问（可选）
    return module.exports
  }
})
