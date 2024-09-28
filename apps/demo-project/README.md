# demoProject

- 專案名稱：demo project
- 本機端網址：http://localhost:4200/demo
- 測試環境網址：https://test.puraliena.com/demo

## 起本地環境

- 前端
```shell
pnpm exec nx run demo-project:serve:local
```

## 檢查程式碼

```shell
pnpm exec nx lint demo-project
```

## 單元測試

```shell
pnpm exec nx test demo-project
```

## cypress 介面

```shell
# 開啟本地環境的前提下執行
pnpm exec nx run demo-project:cy:op
```

## headless 模式

```shell
# 開啟本地環境的前提下執行
# 執行 cypress 所有測試
pnpm exec nx run demo-project:cy:headless
```
