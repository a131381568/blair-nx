# blairUI

此專案為全 Nx 都可以共用的 UI 組件

## 燈箱相關

- 此組件的底層是使用 `vue-final-modal`，所以客製化與設定參數可以參考[官方文件](https://vue-final-modal.org/use-cases/confirm-modal)
- 範例

  1.  引入並使用實例
      ```javascript
      // cts-front-end/src/main.ts
      import { createVfm } from 'vue-final-modal';
      const bfmInstance = createVfm();
      app.use(router).use(bfmInstance).mount("#app");
      ```
  2.  安裝燈箱容器，通常都是在 layout 層`apps/cts-front-end/src/App.vue`
      ```html
      <template>
      		<!--- 前略 --->
      		<ModalsContainer />
      	</span>
      </template>
      ```
      ```javascript
      // script setup
      import { ModalsContainer } from 'vue-final-modal';
      ```
  3.  引入燈箱組合函式，與套用設定檔
      ```javascript
      // apps/cts-front-end/src/views/admin/AddSingleArticle.vue
      // script setup
      import { useConfirmModal, useMessageModal } from '@blair-nx-ui';
      const { showMsg } = useMessageModal();
      const { showConfirm } = useConfirmModal();
      
      // 顯示訊息燈箱
  		showMsg('error', '檔案大小超過 1 MB', '上傳訊息');
        articleInputInfo.value.image.error = '檔案大小超過 1 MB';
      }

      // 選擇性燈箱
      const checkResult =	await showConfirm({
        title: MODEL_TITLE,
        content: '確定新增該文章 ?',
      });
      ```
  4.  如此一來，觸發事件後，就可以叫出互動視窗了


## 檢查程式碼

```shell
pnpm exec nx lint blairUI
```

## 單元測試

```shell
pnpm exec nx test blairUI
```
