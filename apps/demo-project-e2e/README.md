# demoProjectE2E

## 前置作業

因為沒有在 setupNodeEvents 階段去開啟關閉 webServer 所以都要自己手動開啟跟關閉, 才不會造成 `cy:op` 和 `cy:headless` 的後續問題

```shell
# 手動起本地 webServer
pnpm exec nx run demo-project:serve:local
```

## cypress 介面

```shell
# 開啟本地環境的前提下執行
pnpm exec nx cy:op demo-project-e2e
```

## headless 模式

```shell
# 開啟本地環境的前提下執行
# 執行 cypress 所有測試
pnpm exec nx cy:headless demo-project-e2e
```
