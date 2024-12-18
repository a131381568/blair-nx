# 響應式系統的差異

## Vue3: 自動追蹤依賴

```javascript
const count = ref(0);
// 自動追蹤 count 的變化
watch(count, newVal => console.log(newVal));
```

## React: 需明確聲明依賴

```javascript
const [count, setCount] = useState(0);
// 必須在依賴數組中列出 count
useEffect(() => {
	console.log(count);
}, [count]);
```
