import { useCallback, useEffect, useRef } from 'react';
import { TodoAPI } from '../api/todo';
import { useTodoStore } from '../stores/useTodoStore';

export function useTodoData() {
	const { setTodos, setError, setLoading } = useTodoStore();
	const fetchRequestRef = useRef<AbortController | null>(null);
	const isMountedRef = useRef(false);

	// 清理函數
	const cleanup = useCallback(() => {
		if (fetchRequestRef.current) {
			fetchRequestRef.current.abort();
			fetchRequestRef.current = null;
		}
	}, []);

	// 組件卸載時清理
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
			cleanup();
		};
	}, [cleanup]);

	const fetchTodos = useCallback(async () => {
		// 確保之前的請求被取消
		cleanup();

		// 創建新的 AbortController
		const controller = new AbortController();
		fetchRequestRef.current = controller;

		try {
			setLoading(true);
			const data = await TodoAPI.getAll({
				signal: controller.signal,
			});

			// 檢查組件是否還在掛載狀態
			if (isMountedRef.current) {
				setTodos(data);
				setError(null);
			}
		}
		catch (err) {
			if (!isMountedRef.current)
				return;

			if (err instanceof Error && err.name === 'AbortError')
				return;

			setError(err instanceof Error ? err : new Error('Failed to fetch todos'));
		}
		finally {
			if (isMountedRef.current)
				setLoading(false);
		}
	}, [setTodos, setError, setLoading, cleanup]);

	return { fetchTodos };
}
