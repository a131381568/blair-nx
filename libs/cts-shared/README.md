# Cts Shared

- 專案名稱：cts-shared

此為 cts 的共享專案，可以分別給前後端使用裡面的資源

- constants: 靜態文字設定檔
- contracts: API 合約
- dto: 常用的共享傳遞資料結構
- schemas: 資料表相關的結構, 與相關的驗證器
- types: 共用型別




# railway 相關

## ctsb_nx 專案內部關係圖

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


## 部署邏輯

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
