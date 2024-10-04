# demoProject

- 專案名稱：boilerplate
- 本機端網址：http://localhost:4200
- 測試環境網址：https://test.puraliena.com/boilerplate

## 起本地環境

- 前端
```shell
pnpm exec nx run boilerplate:serve:local
```

## 檢查程式碼

```shell
pnpm exec nx lint boilerplate
```

## 單元測試

```shell
pnpm exec nx test boilerplate
```

## E2E 測試

請查閱 apps/boilerplate-e2e

# Bruno API 文件

類似 postman 的 api 檢查工具，[官方](https://github.com/usebruno/bruno)

可以開啟桌機的 [GUI](https://www.usebruno.com/downloads) 工具，也可以使用 [CLI](https://docs.usebruno.com/bru-cli/overview) 打指令 

設置連結檔案, 使其環境變數生效

```shell
# 位置在 nx 根目錄
ln -s ./.env.local ./apps/boilerplate/bruno/.env
```

