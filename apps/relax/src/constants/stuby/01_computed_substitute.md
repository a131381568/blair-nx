# 計算屬性的替代方案

## Vue3

```javascript
const fullName = computed(() => `${firstName.value} ${lastName.value}`);
```

## React

```javascript
// 1. 直接在渲染時計算
return <div>{firstName + ' ' + lastName}</div>;

// 2. 使用 useMemo（當計算成本較高時）
const fullName = useMemo(() => 
  `${firstName} ${lastName}`, 
  [firstName, lastName]
);

// 3. 使用 useCallback（當需要傳遞給子組件時）
const handleClick = useCallback(() => {
  console.log(firstName, lastName);
}, [firstName, lastName]);
```
