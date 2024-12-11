import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
		error: null,
	};

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	public componentDidCatch(error: Error, _errorInfo: ErrorInfo) {
		this.setState({
			hasError: true,
			error,
		});
	}

	public resetError = () => {
		this.setState({
			hasError: false,
			error: null,
		});
	};

	public render() {
		if (this.state.hasError) {
			return this.props.fallback || (
				<div className="p-4 border border-red-500 rounded">
					<h2 className="text-lg font-bold text-red-500">發生錯誤</h2>
					<p className="mt-2">{this.state.error?.message}</p>
					<button
						type="button"
						onClick={this.resetError}
						className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
					>
						重試
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}
