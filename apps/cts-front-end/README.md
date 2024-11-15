# Cts Front End

- 專案名稱：cts-front-end
- 此專案為 [catching-the-star-master](https://github.com/a131381568/catching-the-star-master) 的前端重構專案


## A. 簡述

**Catch the stars** (cts) 是基於 Vue3 製作的天文網站

- 天文科普/星星物語: 記載文章類型的資料
- 天文設施: 介紹天文機構與天文台規格
- 觀星地點: 藉由地圖上的座標得知觀星景點
- 管理後台: 可進行前台資料的新增、編輯和修改

### A-1 前台形象

ctsf: [https://star.puraliena.com](https://star.puraliena.com)
![home](https://i.imgur.com/p7QVKDf.png)

### A-2 後台管理

ctsb: [https://star.puraliena.com/login](https://star.puraliena.com/login)
![login](https://i.imgur.com/CuRF9jw.png)


## B. 專案規劃

需依據[產品需求文件](https://reurl.cc/rvM4pO)和[設計稿](#)製作成最初的[互動原型](#)，來梳理出[流程圖](#)和釐清需要製作的功能、系統與 UI 的可行性，才有辦法評估、拆分出`功項量(Task)`

### B-1 2022 開發

#### B-1-1 Schedule & Task 相關規劃 

+ [前台頁面規劃](https://ripple-dust-d2f.notion.site/23865d946d094a8a8bfbe99f791552b4?v=9da1d0522d0749199705f201fc0d4b6f)
+ [前台甘特圖](https://ripple-dust-d2f.notion.site/93bc79736eea4029b9eb2e9a01d1505f?v=e034f38c47d1478388fb247f603d560a)
+ [後台頁面規劃](https://ripple-dust-d2f.notion.site/3fb36641815641838a121097fb6c23b8?v=1b3fdd07eded4149a56eef7524ded4a7)
+ [後台甘特圖](https://www.notion.so/Catching-the-Star-c488452269b54603b5af18206f341b14)
+ [Mockup: 前台形象網站](https://www.behance.net/gallery/143701077/Catch-the-starts-Frontend)
+ [Mockup: 後台管理網站](https://www.behance.net/gallery/143703311/Catch-the-starts-Admin)
+ [Prototype: 前台形象網站](https://www.figma.com/proto/CJZnislU95GzNWrhISxrqH/ctsm-frontend?node-id=0%3A3&scaling=scale-down&page-id=0%3A1&starting-point-node-id=0%3A3)
+ 技術選型
  - vue3 & ts
  - markdown 編輯器: v-md-editor
  - graphql: apollo express
  - 地圖: leaflet
  - 表單驗證: vee-validate
  - 樣式庫: tailwindcss
  - 動畫庫: animate.css
  - E2E: cypress

<details>
<summary>B-1-2 UI Flow</summary>
<h5>登入操作圖</h5>
<img src="https://raw.githubusercontent.com/a131381568/catching-the-star-master/main/doc/images/02-login-flow.gif" alt="login">
<h5>編輯標語管理操作圖</h5>
<img src="https://raw.githubusercontent.com/a131381568/catching-the-star-master/main/doc/images/05-about-edit-flow.gif" alt="login">
<h5>觀星地點</h5>
<ul>
    <li><a href="https://whimsical.com/MeP6apkTk96bNkk7npKp8g">新增觀星地點操作圖</a></li>
    <li><a href="https://whimsical.com/BtE268F5MHSR2yqgsUhRHG">編輯觀星地點操作圖</a></li>
    <li><a href="https://whimsical.com/FMeregBV1yHQfH8VteifS3">刪除觀星地點操作圖</a></li>
</ul>
<h5>文章分類</h5>
<ul>
    <li><a href="https://whimsical.com/LzTEoYDcaQBSkHvnXqyG7R">新增文章分類操作圖</a></li>
    <li><a href="https://whimsical.com/T3zfjywRo4F6J1uo1ARZKo">編輯文章分類操作圖</a></li>
    <li><a href="https://whimsical.com/TLedgNSZCJvNrkxuL2hgzn">刪除文章分類操作圖</a></li>
</ul>
<h5>文章列表</h5>
<ul>
    <li><a href="https://whimsical.com/5qCvrSv7NrwkuBpyXiZpoT">新增文章操作圖</a></li>
    <li><a href="https://whimsical.com/YXvcXUgaat6jDXDK1j8Lj">編輯文章操作圖</a></li>
    <li><a href="https://whimsical.com/VPMsHu43vUZumgo3J15Tmv">刪除文章操作圖</a></li>
</ul>
<h5>天文機構</h5>
<ul>
    <li><a href="https://whimsical.com/JhkcyNUZD27yVgy83XL6wg">新增天文機構操作圖</a></li>
    <li><a href="https://whimsical.com/CKu22xZPD5Lfz3x1bVBnKy">編輯天文機構操作圖</a></li>
    <li><a href="https://whimsical.com/6Yhj5RTbnvuW98zDQXWKnU">刪除天文機構操作圖</a></li>
</ul>
<h5>天文臺</h5>
<ul>
    <li><a href="https://whimsical.com/Mb8RVarFm1cv451EoWtY5D">新增天文臺操作圖</a></li>
    <li><a href="https://whimsical.com/Y76tAqnCozfF94NvbP6ro3">編輯天文臺操作圖</a></li>
    <li><a href="https://whimsical.com/8S8iDonqA3wjpViGe3pzMz">刪除天文臺操作圖</a></li>
</ul>
</details>


### B-2 2024 重構

#### B-2-1 重構規劃
[blair-nx project board: 重構 ctsm 專案](https://github.com/a131381568/blair-nx/projects?query=is%3Aopen)

#### B-2-2 重構差異
- 整個專案架構，將前端跟後端都放進 Nx (Monorepo) 內管理
- 換掉原本套裝的 Apollo GraphQL 方案，改用 RESTful 的 NestJS
- 前後端藉由 cts-shared 專案來共用 type/schema 還有設定檔，藉此達到共用 ts-rest 的 API 合約
- 表單驗證功能由 Zod 來替代 
- 前端串接 API 改用獨立的 Vue Query (TanStack)
- 自行建立 Tailwind 動畫來替代 Animate.css
- 重建 eslint 環境與規則
- 燈箱相關功能藉由自製封裝的 Vue Final Modal 組件來實現
- Leaflet 相關功能封裝

## C. 詳盡資訊

### C-1 所有的路由
![所有路由](https://i.imgur.com/QabR3Uf.png)

### C-2 頁面依賴關係
![天文科普依賴](https://i.imgur.com/W9WR9hc.png)

### C-3 專案間的依賴關係
![專案間的依賴關係](https://i.imgur.com/rt5D6w4.png)
- [查看後端專案](#)
- [查看共享專案](#)


## D. 本機開發

> 確定環境變數都有填上，並且後端跟資料庫都有啟動

1. 安裝依賴

    ```shell
    pnpm install
    ```

2. 起本地環境

    ```shell
    pnpm exec nx serve cts-front-end
    # http://localhost:4200/
    ```

3. 檢查程式碼

    ```shell
    pnpm exec nx lint cts-front-end
    ```

## D. 部署

使用第三方的 railway.app: https://railway.app

- libs/cts-shared/.env.example: 有幾乎全部的環境變數
- 前端藉由客製化容器 Nginx 的 Dockerfile 來裝打包出來的 Vue
- 有特別為 ctsf 寫自動化打包的流程: .github/workflows/deploy-frontend.yml (後續還要改進)

## E. 聲明
- 僅作為學術研究用途，無商業行為。
- 素材與資料來源：台北市立天文科學教育館、南瀛天文教育園區、國立自然科學博物館、交通部中央氣象局、Freepik、Wikipedia、ELLE。
