# 清理機制差異

## 1-具體例子 

### Vue3

```javascript
const MyComponent = defineComponent({
  setup() {
    // 1. 事件監聽
    onMounted(() => {
      window.addEventListener('resize', handleResize);
      // Vue3 會在組件卸載時自動清理
    });
    
    // 2. 計時器
    onMounted(() => {
      const timer = setInterval(() => {
        console.log('tick');
      }, 1000);
      
      // 需要手動清理
      onUnmounted(() => {
        clearInterval(timer);
      });
    });

    return () => <div>content</div>;
  }
});
```

### React

```javascript
function MyComponent() {
  // 1. 事件監聽
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    
    // cleanup function：
    // - 組件卸載時會執行
    // - 每次 effect 重新執行前也會執行
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空依賴數組 = 只在掛載時執行一次

  // 2. 計時器
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('tick');
    }, 1000);

    // cleanup function 會在：
    // - 組件卸載時清理
    // - 依賴項改變導致 effect 重新執行時也會清理
    return () => {
      clearInterval(timer);
    };
  }, []); // 空依賴數組

  return <div>content</div>;
}
```

## 2-主要差異

### a-執行時機

#### Vue3 需要手動處理重連邏輯

```javascript
watch(serverUrl, (newUrl, oldUrl) => {
  if (oldUrl) {
    connection.disconnect(); // 手動斷開舊連接
  }
  connection = createConnection(newUrl);
  connection.connect();
});
```

#### React 依賴項改變時，會先執行 cleanup，再執行新的 effect

```javascript
useEffect(() => {
  const connection = createConnection(serverUrl);
  connection.connect();
  
  return () => {
    connection.disconnect(); // 每次 serverUrl 改變前都會斷開舊連接
  };
}, [serverUrl]);
```

### b-資源清理

### Vue3 需要明確使用 onUnmounted

```javascript
setup() {
  let subscription;
  
  watchEffect(() => {
    subscription?.unsubscribe(); // 手動清理舊訂閱
    subscription = data$.subscribe();
  });

  onUnmounted(() => {
    subscription?.unsubscribe();
  });
}
```

### React 統一的清理模式

```javascript
useEffect(() => {
  const subscription = data$.subscribe();
  return () => subscription.unsubscribe();
}, [data$]);
```

### c-條件性清理

#### Vue3: 需要額外的邏輯控制

```javascript
watch(shouldConnect, (connect, wasConnected) => {
  if (connect) {
    connection = createConnection();
  } else if (wasConnected) {
    connection?.disconnect();
  }
});
```

#### React: 可以根據條件決定是否需要清理

```javascript
useEffect(() => {
  if (shouldConnect) {
    const connection = connect();
    return () => connection.disconnect();
  }
  // 不需要連接時，不返回清理函數
}, [shouldConnect]);

```

### d-設計理念

React 的 cleanup 機制更加系統化和統一，而 Vue3 則需要開發者更明確地管理資源清理。這種差異反映了兩個框架的設計理念：

1. React 偏向函數式，每次渲染都是新的函數調用
2. Vue3 偏向實例式，組件實例在整個生命週期中保持存在
