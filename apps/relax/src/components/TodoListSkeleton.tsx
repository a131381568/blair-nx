export const TodoListSkeleton = () => (
	<div className="animate-pulse">
		<div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
		{[1, 2, 3].map(i => (
			<div key={i} className="h-12 bg-gray-100 rounded mb-2"></div>
		))}
	</div>
);
