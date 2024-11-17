# Cts Shared

- 專案名稱：cts-shared

> 此為 cts 的共享專案，可以分別給前後端使用裡面的資源

- constants: 靜態文字設定檔
- contracts: API 合約
- dto: 常用的共享傳遞資料結構
- schemas: 資料表相關的結構, 與相關的驗證器
- types: 共用型別


## railway

使用第三方的 [railway.app](https://railway.app/) 來做容器部署託管

- libs/cts-shared/.env.example: 有幾乎全部的環境變數
- Postgres 由 railway 託管，只要輸入環境變數，就能使用；會公開對外的資料庫連線方式，所以就能夠拿來倒資料、備份資料了
- 可以使用 [railwayapp/cli](https://docs.railway.com/reference/cli-api#up) 來開發測試部署作業
- 前端藉由 Nginx && Node 的容器，來裝打包出來的 Vue
- 後端端藉由 Node 的容器，來裝打包出來的 NestJS

## ctsb_nx 專案內部關係圖

```mermaid
graph TD
    GH[GitHub Actions] --> |Deploy| Ctsb[Backend Service<br/>star-api.puraliena.com]
    GH --> |Deploy| Ctsm[Frontend Service<br/>star.puraliena.com]
    Ctsb --> |Uses| PG[Postgres DB]
    Ctsm --> |API Calls| Ctsb
    BV[blood-volume] -.-> PG
    
    subgraph Railway
        Ctsb
        Ctsm
        PG
        BV
    end
```

## 部署邏輯

```mermaid
sequenceDiagram
    participant GH as GitHub Action
    participant Railway
    participant Service

    Note over GH,Railway: 部署失敗情況
    GH->>Railway: 推送新程式碼
    Railway-->>Railway: 檢查 Dockerfile/Nixpacks
    Railway--xService: 建構失敗
    Service->>Service: 保持運行舊版本

    Note over GH,Service: Railway 在建構失敗時<br/>不會更新或中斷現有服務<br/>繼續使用最後一次成功部署的版本
```
