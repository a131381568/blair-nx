# BlairNx

# 環境

- node 版本 v20.17
- 使用 [pnpm](https://pnpm.io/installation) 管理依賴，安裝後在根目錄執行：

  ```shell
  pnpm install
  ```

- 主套件版本
  + nx 19.8.0
  + vue 3.4.38
  + react 18.3.1

# 本地開發

```shell
pnpm exec nx serve boilerplate
```

# 測試

## 單元測試

使用 vitest 來撰寫單元測試

### 針對檔案
```shell
pnpm exec nx test boilerplate App.spec.ts
```

### 針對專案
```shell
pnpm exec nx test boilerplate
```

### 所有專案
```shell
pnpm exec nx run-many -t test
```

## E2E 測試

### cypress 介面
```shell
# 本地起 web server
pnpm exec nx serve boilerplate
# 開啟 cypress 介面
pnpm exec nx cy:op boilerplate
```

### headless 模式
```shell
# 本地起 web server
pnpm exec nx serve boilerplate
# 開啟 cypress 介面
pnpm exec nx cy:headless boilerplate
```

# 程式碼檢查

解決方案為 [@antfu/eslint-config](https://github.com/antfu/eslint-config)

```shell
# 針對單獨專案
pnpm exec nx lint boilerplate
# 全部專案
pnpm exec nx run-many -t lint --skip-nx-cache
```

# 打包

```shell
# 針對單獨專案
pnpm exec nx build boilerplate
# 全部專案(公開)
pnpm exec nx run-many -t build -p tag:publish:true -c production
# 測試專案
pnpm exec nx run-many -t build -p tag:type:front_app -c production
```

# 其他指令

```shell
# 建立 app
pnpm exec nx g @nx/vue:app my-app
# 查看依賴
pnpm exec nx graph
# 重啟 nx 服務
pnpm exec nx reset
```
