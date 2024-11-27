# BlairNx

此專案為 Monorepo 架構的 [Nx](https://nx.dev/getting-started/intro)

## 專案介紹

![nx_graph](https://i.imgur.com/b1lEPpt.png)

- APP

  + [boilerplate](https://github.com/a131381568/blair-nx/tree/development/apps/boilerplate) - 範本專案
  + [cts-front-end](https://github.com/a131381568/blair-nx/tree/development/apps/cts-front-end) - catch the stars 前端
  + [cts-back-end](https://github.com/a131381568/blair-nx/tree/development/apps/cts-back-end) - catch the stars 後端

- 共享庫與 E2E

  + [cts-shared](https://github.com/a131381568/blair-nx/tree/development/libs/cts-shared) - 僅 catch the stars 前後端專案的共享資源
  + [cts-front-end-e2e](https://github.com/a131381568/blair-nx/tree/development/apps/cts-front-end-e2e) - catch the stars 的 E2E 測試 (playwright)
  + [boilerplate-e2e](https://github.com/a131381568/blair-nx/tree/development/apps/boilerplate-e2e) - 範本專案的 E2E 測試 (cypress)
  + [blairComposables](https://github.com/a131381568/blair-nx/tree/development/libs/blairComposables) - 全域共享的 composables
  + [blairConfig](https://github.com/a131381568/blair-nx/tree/development/libs/blairConfig) - 全域共享的設定檔
  + [blairUI](https://github.com/a131381568/blair-nx/tree/development/libs/blairUI) - 全域共享的 UI 組件
  + [storybookHost](https://github.com/a131381568/blair-nx/tree/development/libs/storybookHost) - storybook 實例專案


## 環境

- node 版本 v20.17
- 使用 [pnpm](https://pnpm.io/installation) 管理依賴，安裝後在根目錄執行：

  ```shell
  pnpm install
  ```

- 主套件版本
  + nx 19.8.0
  + vue 3.4.38
  + react 18.3.1

## 本地開發

- 僅一次的 `npx` 指令，替代為 `pnpm dlx`
- `npx` 會直接執行 `npm`，須使用 `pnpm exec` 來執行指令

```shell
pnpm exec nx serve boilerplate
```

## 測試

### 單元測試

使用 vitest 來撰寫單元測試

#### 針對檔案
```shell
pnpm exec nx test boilerplate Home.spec.ts
```

#### 針對專案
```shell
pnpm exec nx test boilerplate
```

### E2E 測試

#### cypress 介面
```shell
# 本地起 web server
pnpm exec nx serve boilerplate
# 開啟 cypress 介面
pnpm exec nx cy:op boilerplate
```

#### headless 模式
```shell
# 本地起 web server
pnpm exec nx serve boilerplate
# 開啟 cypress 介面
pnpm exec nx cy:headless boilerplate
```

## 程式碼檢查

解決方案為 [@antfu/eslint-config](https://github.com/antfu/eslint-config)

```shell
# 針對單獨專案
pnpm exec nx lint boilerplate
# 全部專案
pnpm exec nx run-many -t lint --skip-nx-cache
```

## 打包

```shell
# 針對單獨專案
pnpm exec nx build boilerplate
# 全部專案(公開)
pnpm exec nx run-many -t build -p tag:publish:true -c production
# 測試專案
pnpm exec nx run-many -t build -p tag:type:front_app -c production
```

## 其他指令

```shell
# 建立 app
pnpm exec nx g @nx/vue:app my-app
# 查看依賴
pnpm exec nx graph
# 重啟 nx 服務
pnpm exec nx reset
```
