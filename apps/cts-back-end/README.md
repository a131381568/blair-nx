# Cts Back End

- 專案名稱：cts-back-end
- 本機端網址：http://localhost:3000

此為 [catching-the-star-master](https://github.com/a131381568/ctsm-sql) 的後端重構專案

## A. 簡述
此專案為 [cts-front-end](#) 的後端系統，不同於原本舊後端的 GraphQL，是使用 RESTful 的 [NestJS](https://docs.nestjs.com/) 開發

## B. 使用技術

- 資料庫: PostgreSQL
- 資料庫溝通: Prisma
- 後端框架: NestJs 
- 身份驗證: Passport, JWT
- API 合約: ts-rest, zod
- 加密解密: CryptoJS/Bcrypt
- 生成 ID: Nano ID
- API 文件: Bruno

## C. 詳盡資訊

### C-1 登入邏輯

```mermaid
sequenceDiagram
  participant Frontend
  participant Backend
  
  Note over Frontend,Backend: 1. 使用者登入，前端發送憑證給後端
  
  Frontend->>Backend: POST /auth/login (credentials)
  Backend-->>Frontend: access_token, refresh_token (valid for 15 mins & 7 days)

  Note over Frontend,Backend: 2. 前端使用 access_token 請求受保護資源
  
  Frontend->>Backend: GET /protected/resource (Authorization: Bearer access_token)
  Backend-->>Frontend: 200 OK (protected resource)

  Note over Frontend,Backend: 3. access_token 過期（例如 15 分鐘後）
  
  Frontend->>Backend: GET /protected/resource (Authorization: Bearer expired access_token)
  Backend-->>Frontend: 401 Unauthorized (access_token expired)
  
  Note over Frontend,Backend: 4. 前端發送 refresh_token 請求以換取新的 access_token
  
  Frontend->>Backend: POST /auth/refresh (refresh_token)
  Backend-->>Frontend: new access_token (valid for 15 mins)
  
  Note over Frontend,Backend: 5. access_token 刷新成功，繼續使用新 token 請求資源
  
  Frontend->>Backend: GET /protected/resource (Authorization: Bearer new access_token)
  Backend-->>Frontend: 200 OK (protected resource)
  
  Note over Frontend,Backend: 6. refresh_token 過期（例如 7 天後）

  Frontend->>Backend: POST /auth/refresh (expired refresh_token)
  Backend-->>Frontend: 401 Unauthorized (refresh_token expired, re-login required)
  
  Note over Frontend,Backend: 7. 使用者需重新登入以取得新的 token

  Frontend->>Backend: POST /auth/login (credentials)
  Backend-->>Frontend: new access_token, refresh_token (valid for 15 mins & 7 days)

```

### C-2 資料表架構關聯
![資料表架構關聯](https://i.imgur.com/Qf4VUEN.png)

### C-3 API
使用 [Bruno](https://github.com/usebruno/bruno) 作為測試 API 的工具，且文件檔在`apps/cts-back-end/bruno`，能夠跟著進版控
![bruno_about](https://i.imgur.com/RTA3ikG.png)

### C-4 專案間的依賴關係
- [專案依賴](#)
- [查看前端專案](#)
- [查看共享專案](#)


## D. 本地開發

1. 啟動資料庫與 pgAdmin
```shell
pnpm exec nx docker:d cts-back-end

```

2. 起本地 NestJS Server
```shell
pnpm exec nx serve cts-back-end
```
- 每次起後端 Server 時，都會觸發`copy-env`指令
- 需要讓`.env`放置在`apps/cts-back-end/bruno`下才會生效

3. 檢查程式碼
```shell
pnpm exec nx lint cts-back-end
```

4. 遷移資料庫
```shell
pnpm exec nx prisma:m cts-back-end
pnpm exec nx prisma:g cts-back-end
```

## D. 打包

1. 將前後端檔案打包至`dist/cts`
```shell
 pnpm exec nx deploy cts-back-end
```

2. 將 `dist/cts` 內的檔案搬移到要部署的地方後, 在根目錄建立容器
```shell
docker-compose up -d
```

## E. 部署

https://railway.app/
