# Playground 本地调试

项目提供一个轻量的 `vite` + `react` playground，用于在仓库内快速预览和调试组件。playground 位于 `playground/` 目录。

要使用 playground：

1. 进入 playground 目录并安装依赖：

```bash
cd playground
npm install
```

2. 启动开发服务器：

```bash
npm run dev
```

或者直接从仓库根运行（会进入 playground 并安装依赖）：

```bash
npm run playground:dev
```

为何不会随 npm 一并发布

- 根 `package.json` 已指定 `files: ["dist"]`，因此只有 `dist` 会被包含进发布包。
- 仓库根也包含了 `.npmignore`，其中明确排除了 `playground/`，作为额外保障。

提示

- 你可以在 `playground/src/App.tsx` 中导入或新增示例以调试其他组件。
- 如果需要更复杂的演示或多个页面，考虑引入 Storybook 或扩展 playground。
