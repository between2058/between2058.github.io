# between2058

Johnny Chang（張舜程）的個人網站。視覺方向：「癸水 × 破軍」，一套東方未來觀測系統。

- 線上：<https://between2058.vercel.app>
- 舊網址 `between2058.github.io` 由根目錄的 `index.html`／`404.html` 轉址到新站，路徑會保留。

## 技術

Next.js 16（App Router）、React 19、Tailwind CSS 4、TypeScript，部署在 Vercel。

## 開發

```bash
npm ci
npm run dev      # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build
```

## 結構

```
src/app/[lang]/            頁面，zh 與 en 兩個語系都是靜態產生
  page.tsx                 首頁
  writing/                 文章列表與文章頁
src/content/site.ts        所有中英文文案，兩個語系放在同一處保持同步
src/content/posts.ts       文章 metadata；內文在 src/content/posts/*.html
src/components/            Instrument（觀測儀）、NameCut（破）、FluxDiagram 等
next.config.ts             `/` 依瀏覽器語言轉到 /zh 或 /en，舊 Hugo 網址轉到新文章頁
```

## 設計紀錄

- `PRODUCT.md`：產品定位與內容事實（Impeccable skill 使用）
- `DESIGN.md`：視覺系統
- `.impeccable/surfaces/`：各頁面的 direction contract
- `.claude/skills/impeccable/`：Impeccable 設計 skill（<https://github.com/pbakaus/impeccable>）
