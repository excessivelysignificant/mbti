# 16 型人格测试 · 看见真实的你

一个精致、轻量的 MBTI 测试 H5。**构建产物是单个 HTML 文件**，可双击本地打开，也可托管到任意静态服务，发链接到微信对方一点即开。

- 16 / 28 题双模式（简单版 / 准确版）
- 玻璃拟态 + 渐变设计，移动端 / 桌面端通用
- 结果页可生成人格卡片图，**长按保存**后转发朋友圈

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5173
```

## 构建（产出单文件 HTML）

```bash
npm run build
```

输出位置：`dist/index.html`（CSS / JS / 图片全部 inline，约 300 KB / gzip 100 KB）。

```bash
npm run preview  # 本地预览构建产物
```

## 分发给别人 · 三种方式

### 方式 A：托管到 Cloudflare Pages（推荐，免费 + 即拿即用）

1. 注册 [Cloudflare Pages](https://pages.cloudflare.com/)
2. 新建项目 → Direct Upload → 把 `dist/` 文件夹拖进去
3. 拿到形如 `https://xxx.pages.dev` 的链接
4. 把链接发到微信，对方一点即在内置浏览器打开

> 同类替代：Vercel（拖 `dist/`）、Netlify Drop（拖 `dist/`）、GitHub Pages。

### 方式 B：托管到自己服务器

把 `dist/index.html` 上传到任意 Web 目录即可。无后端依赖。

### 方式 C：直接发文件（不推荐）

把 `dist/index.html` 在微信里以「文件」发送，对方下载后用浏览器打开也能用。
但微信不会自动渲染 .html，需要对方手动选择浏览器打开，体验远不如方式 A。

## 微信验证清单

线上后用真机微信打开链接，确认：

1. 封面 → 答题 → 结果 全流程顺畅
2. 玻璃拟态 / 动画 在 iOS / Android 微信内置浏览器都正常（注意 Android X5 内核对 `backdrop-filter` 兼容性）
3. 点「生成我的人格卡片」→ 弹窗里**长按图片**应当唤起「保存到相册」菜单
4. 保存后再发到聊天 / 朋友圈正常显示

## 题库 / 人格扩展

- `src/data/questions.ts`：题库，标记 `tier: 'basic' | 'extra'`，简单版只用 `basic`，准确版全用
- `src/data/personalities.ts`：16 类型的名称、描述、优势、搭档、主题色，自由调整文案

## 技术栈

React 18 · TypeScript · Vite 5 · `vite-plugin-singlefile` · Tailwind CSS · Framer Motion · html-to-image
