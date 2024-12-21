import { Outlet } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

export function Layout() {
	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white shadow">
				<div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
					<h1 className="text-xl font-bold">Todo App</h1>
					<div className="flex items-center gap-2">
						<LanguageSwitcher />
						<ThemeToggle />
					</div>
				</div>
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
}
