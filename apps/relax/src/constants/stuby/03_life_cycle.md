# 生命週期對應

## Vue3 Component

```javascript
const MyComponent = defineComponent({
  setup() {
    // 1. setup 函數開始執行（組件初始化）
    console.log('1. setup start');

    // 2. 同步代碼執行
    const count = ref(0);
    console.log('2. sync code');

    // 3. nextTick - DOM 更新後執行
    nextTick(() => {
      console.log('5. nextTick callback');
    });

    // 4. onMounted - 組件掛載完成
    onMounted(() => {
      console.log('6. mounted');
    });

    // 5. onUpdated - 組件更新完成
    onUpdated(() => {
      console.log('7. updated');
    });

    // 6. onUnmounted - 組件卸載
    onUnmounted(() => {
      console.log('8. unmounted');
    });

    console.log('3. setup end');
    return () => {
      console.log('4. render');
      return <div>{count.value}</div>;
    };
  }
});
```

## React Component

```javascript
function MyComponent() {
    // 1. 組件函數開始執行（每次渲染都會執行）
    console.log('1. component function start');

    // 2. 同步代碼執行
    const [count, setCount] = useState(0);
    console.log('2. sync code');

    // 3. useLayoutEffect - DOM 變更後，畫面渲染前
    useLayoutEffect(() => {
        console.log('4. layout effect');

        return () => {
          // 下次 layout effect 執行前 或 組件卸載時
          console.log('cleanup layout effect');
        };

    });

    // 4. useEffect - 畫面渲染後
    useEffect(() => {
        console.log('6. effect');

        return () => {
          // 下次 effect 執行前 或 組件卸載時
          console.log('cleanup effect');
        };

    });

    console.log('3. render');
    return <div>{count}</div>;
}
```
