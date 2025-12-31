# @icms/components

轻量的 Next.js UI 组件库脚手架（TypeScript + Tailwind），用于内部 CMS 快速搭站。

快速开始

1. 安装依赖（在库目录）:

```bash
npm install
```

2. 本地开发（watch 构建）:

```bash
npm run dev
```

3. 打包（会输出到 `dist/`）:

```bash
npm run build
```

在 Next.js 项目中使用

服务端渲染组件（Server Component，直接在 `app` 目录中可直接导入）:

```tsx
import { SsrCard } from '@icms/components';

export default function Page(){
  return <SsrCard title="服务端卡片">服务端渲染内容</SsrCard>
}
```

客户端组件（Client Component，需要在客户端使用）:

```tsx
import { ClientButton } from '@icms/components';

export default function Page(){
  return <ClientButton initial={0} label="点赞" />
}
```

引入样式

如果你希望使用组件库自带的样式（`dist/styles.css`），在你的 Next.js 项目中可以按需引入：

- 使用 App Router (`app/layout.tsx`)：

```tsx
import './globals.css'; // 你的全局样式（可保留）
import '@icms/components/dist/styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
```

- 使用 Pages Router (`pages/_app.tsx`)：

```tsx
import '../styles/globals.css';
import '@icms/components/dist/styles.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

说明：如果你在项目中已启用 Tailwind，并希望统一使用同一套 Tailwind 编译配置，建议在宿主项目中直接引入组件的原子类并把组件样式纳入宿主 Tailwind 的 `content` 扫描范围，或在发布包时使用 `dist/styles.css`（库已提供）。

发布到 npm

1. 确认 `package.json` 中 `name`、`version`、`publishConfig` 正确。
2. 登录 `npm login`。
3. 运行 `npm publish`。
