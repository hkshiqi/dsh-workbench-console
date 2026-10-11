# dsh-workbench-console · 工作台框架

> 在 DSH 侧边栏「工作区」下方提供一个**可扩展的工作台外壳**。
> 本包只是框架——**不包含任何具体业务工作台**；具体工作台由其他插件通过 API 注册进来。

## 安装

```sh
dsh plugin --profile web add dsh-workbench-console
```

装完重启，侧边栏「工作区」下方出现 **工作台** 区域。

## 它是什么

一个**容器**。侧边栏里列出所有工作台、主区域渲染选中的那个。
工作台有两种来源：

| 来源 | 说明 |
|---|---|
| **插件注册**（◆） | 其他插件调用 `ctx.workbenchConsole.register()` 注册，代码在工作台插件里 |
| **用户自建** | 在工作台里点 ＋ 直接建，数据驱动（清单式），无需写代码 |

框架自己不实现任何业务逻辑，只负责：列表、切换、渲染插槽、数据落盘。

## 给工作台开发者

在插件客户端里：

```js
const inject = ['workbenchConsole']

function apply(ctx) {
  ctx.effect(() => ctx.workbenchConsole.register({
    id: 'my-workbench',
    title: '我的工作台',
    glyph: '🧩',
    description: '一句话说明',
    order: 100,
    component: MyWorkbench     // React 组件
  }), 'my-plugin: register')
}

function MyWorkbench(props) {
  // props.api.read(key) / props.api.write(key, value) —— 存取自己的工作台数据
  return React.createElement('div', null, '你好')
}
```

同时在该插件 `package.json` 声明依赖：

```json
{
  "dsh": { "client": { "inject": ["...", "dsh-workbench-console"] } },
  "dependencies": { "dsh-workbench-console": ">=2.0.0" }
}
```

### API

| 方法 | 说明 |
|---|---|
| `register(def)` | 注册一个工作台。返回注销函数，请交给 `ctx.effect` 管理 |
| `list()` | 列出已注册的工作台 |
| `get(id)` | 取某个工作台定义 |
| `data(id)` | 返回该工作台的数据读写器（`read` / `write` / `getAll`） |
| `refresh()` | 让侧边栏与面板重新读取状态 |

## 数据

`<DSH_HOME>/dsh-workbench-console/state.json`

- `items` —— 用户自建的工作台
- `data` —— 各插件工作台的数据分区（按 `wb:<id>:<key>` 存放），框架不解释内容

首次启动不会预置任何内容。

## 权限说明

- 读写：仅本机回环（宿主 webServer 路由）
- 落盘：仅自身数据目录
- 不执行子进程、不访问网络、不发送遥测

## License

MIT
