# 循序漸進學習開發 React Todo List 大綱

以下是跟你一起規劃的循序漸進 React Todo List 學習路線。這個規劃會從基礎開始，逐步引入更進階的概念：

### 第一章：React 基礎 & JSX

- 學習目標：理解 React 組件的基本結構和 JSX 語法
- 重點：
  - 函數組件的基本寫法
  - JSX 的語法規則和表達式使用
  - Props 的傳遞和接收
- 實作：創建基本的 Todo List 靜態頁面結構

### 第二章：useState & 基礎互動

- 學習目標：理解 React 的狀態管理和事件處理
- 重點：
  - useState hook 的使用
  - 事件處理函數的綁定
  - 表單控制
- 實作：新增和刪除 todo 項目的功能

### 第三章：useEffect & 生命週期 (擴充版)

我建議將第三章擴充為 4 個小節，以便更深入理解 useEffect：

### 3.1 基礎概念

- useEffect 的基本語法和使用方式
- 依賴數組的作用
- 清理函數的使用時機

### 3.2 常見使用場景

- 數據獲取 (Data Fetching)
- 訂閱外部事件
- DOM 操作
- 本地存儲操作

### 3.3 useEffect 的常見濫用情況和最佳實踐

```typescript
// ❌ 錯誤示例：重複觸發
useEffect(() => {
	setCount(count + 1);
}, [count]);

// ✅ 正確示例
useEffect(() => {
	if (needUpdate) {
		setCount(prevCount => prevCount + 1);
	}
}, [needUpdate]);

// ❌ 不必要的 useEffect：處理派生狀態
useEffect(() => {
	setItemCount(items.length);
}, [items]);

// ✅ 直接計算派生值
const itemCount = items.length;
```

### 3.4 useEffect 的替代方案

- 使用 useMemo 處理計算值
- 使用 useCallback 處理事件處理器

### 3.5 自定義 Hook & 邏輯復用

- 學習目標：學習如何抽象和復用邏輯
- 重點：
  - 自定義 Hook 的設計原則
  - 邏輯分離和組織
  - 代碼復用最佳實踐
- 實作：將 Todo List 的核心邏輯抽離成自定義 Hook

### 第四章：效能優化

- 學習目標：理解 React 的效能優化技巧
- 重點：
  - useMemo 和 useCallback 的使用
  - React.memo 的應用
  - 效能優化的時機
- 實作：優化 Todo List 的渲染效能

### 第五章：useContext & 全域狀態

- 學習目標：理解 React 的上下文機制
- 重點：
  - Context API 的使用
  - Provider 和 Consumer 的概念
  - 全局狀態管理的基礎
- 實作：實現多個組件共享 Todo 狀態

### 第六章：useReducer & 複雜狀態管理

- 學習目標：學習處理複雜的狀態邏輯
- 重點：
  - useReducer 的使用場景
  - action 和 reducer 的概念
  - 狀態更新的預測性
- 實作：重構 Todo List 使用 useReducer 管理狀態

### 第七章：Redux/Zustand 狀態管理

#### 7.1 狀態管理基礎

- Redux/Zustand 核心概念
- Action 和 Store 設計原則
- 中間件和異步操作
- 實作：使用 Redux/Zustand 重構 Todo List

#### 7.2 狀態同步檢查機制

1. **狀態調試工具**

```typescript
function useStateDebugger(componentState: any, globalState: any) {
	useEffect(() => {
		console.group('State Sync Check');
		console.log('Component State:', componentState);
		console.log('Global State:', globalState);
		console.groupEnd();
	}, [componentState, globalState]);
}
```

2. **狀態差異比對**

```typescript
// 檢查狀態差異
function compareStates(localState: any, globalState: any) {
	const differences: Record<string, { local: any; global: any }> = {};
	Object.keys(localState).forEach((key) => {
		if (localState[key] !== globalState[key]) {
			differences[key] = {
				local: localState[key],
				global: globalState[key]
			};
		}
	});
	return differences;
}
```

#### 7.3 避免狀態不同步的最佳實踐

1. **單一數據源**

```typescript
// ❌ 錯誤示例
function TodoItem({ todo }) {
	const [localComplete, setLocalComplete] = useState(todo.complete);
}

// ✅ 正確示例
function TodoItem() {
	const { complete, toggleTodo } = useTodoStore();
}
```

2. **同步更新器**

```typescript
function useSyncedState<T>(
	localValue: T,
	globalValue: T,
	onSync: (value: T) => void
) {
	useEffect(() => {
		if (localValue !== globalValue) {
			onSync(globalValue);
		}
	}, [globalValue]);
	return localValue;
}
```

#### 7.4 複雜組件狀態策略

1. **狀態分層**

```typescript
interface TodoItemState {
	// UI 狀態：組件內維護
	isEditing: boolean;
	dragState: 'none' | 'dragging' | 'dropped';

	// 業務狀態：全局管理
	todo: Todo;
}
```

2. **異步同步處理**

```typescript
function useTodoSync() {
	const localTodos = useLocalTodos();
	const globalTodos = useGlobalTodos();

	useEffect(() => {
		const unsyncedTodos = findUnsyncedTodos(localTodos, globalTodos);
		if (unsyncedTodos.length > 0) {
			syncTodos(unsyncedTodos);
		}
	}, [localTodos, globalTodos]);
}
```

重點:

- 狀態同步問題預防
- 開發調試工具
- 狀態分層策略
- 實務最佳實踐

### 第八章：React Hooks 進階

#### 8.1 useRef & forwardRef

```typescript
// ❌ 錯誤：直接操作 DOM
function Input() {
  useEffect(() => {
    document.querySelector('input').focus()
  }, [])
}

// ✅ 正確：使用 useRef
function Input() {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  return <input ref={inputRef} />
}
```

跨組件傳遞 ref:

```typescript
const Input = forwardRef<HTMLInputElement>((props, ref) => {
  return <input ref={ref} {...props} />
})

const Form = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  return <Input ref={inputRef} />
}
```

#### 8.2 useImperativeHandle

```typescript
interface InputHandle {
  focus: () => void
  clear: () => void
}

const Input = forwardRef<InputHandle, Props>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      if (inputRef.current) inputRef.current.value = ''
    }
  }))

  return <input ref={inputRef} />
})
```

#### 8.3 useLayoutEffect

```typescript
// ❌ 可能閃爍
const [width, setWidth] = useState(0);
useEffect(() => {
	setWidth(element.getBoundingClientRect().width);
}, [element]);

// ✅ 同步更新防止閃爍
useLayoutEffect(() => {
	setWidth(element.getBoundingClientRect().width);
}, [element]);
```

#### 8.4 再次探討效能優化

1. useMemo & useCallback

```typescript
// ❌ 過度優化
const value = useMemo(() => a + b, [a, b]);

// ✅ 複雜計算才使用
const sortedList = useMemo(() => {
	return expensiveSort(items);
}, [items]);

// ✅ 避免子組件重渲染
const handleSubmit = useCallback(() => {
	submit(formData);
}, [formData]);
```

2. store selector 和 shallow

#### 8.5 中間件應用

1. persist
2. devtools

#### 8.6 Redux DevTools 整合

### 第九章：React Router 路由管理

#### 9.1 基礎路由配置

```typescript
// ✅ 推薦寫法
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      }
    ]
  }
]);

// ❌ 避免使用 JSX 配置
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Root />} />
  </Routes>
</BrowserRouter>
```

#### 9.2 進階路由技巧

1. **路由守衛**

```typescript
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

// 使用
const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    )
  }
])
```

2. **資料預加載**

```typescript
// 定義 loader
async function todoLoader({ params }) {
  const todos = await fetchTodos(params.id)
  return { todos }
}

// 配置路由
{
  path: "todos/:id",
  element: <TodoPage />,
  loader: todoLoader,
  errorElement: <ErrorBoundary />
}
```

3. **動態路由**

```typescript
const routes = {
	admin: {
		path: '/admin',
		children: {
			users: {
				path: 'users',
				loader: usersLoader,
			}
		}
	}
};
```

4. **路由過渡動畫**

```typescript
function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* 路由配置 */}
      </Routes>
    </AnimatePresence>
  )
}
```

#### 9.3 常見問題與解決方案

```typescript
// ❌ 錯誤：在 useEffect 中使用導航
useEffect(() => {
	navigate('/dashboard');
}, []);

// ✅ 正確：使用事件處理
const handleLogin = () => {
	navigate('/dashboard');
};
```
