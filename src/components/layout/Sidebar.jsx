import { House, ListTodo, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
	return (
		<div className="flex h-full w-64 flex-col bg-gray-900 p-6 text-white">
			<h1 className="mb-8 text-2xl font-bold tracking-wide">
				Task Manager
			</h1>

			<nav className="flex flex-col gap-4">
				<NavLink
					to="/"
					className={({ isActive }) =>
						`flex items-center gap-3 rounded-lg p-3 transition ${
							isActive ? "bg-gray-700" : "hover:bg-gray-800"
						}`
					}
				>
					<House size={20} /> Dashboard
				</NavLink>

				<NavLink
					to="/tasks"
					className={({ isActive }) =>
						`flex items-center gap-3 rounded-lg p-3 transition ${
							isActive ? "bg-gray-700" : "hover:bg-gray-800"
						}`
					}
				>
					<ListTodo size={20} /> Tasks
				</NavLink>

				<NavLink
					to="/settings"
					className={({ isActive }) =>
						`flex items-center gap-3 rounded-lg p-3 transition ${
							isActive ? "bg-gray-700" : "hover:bg-gray-800"
						}`
					}
				>
					<Settings size={20} /> Settings
				</NavLink>
			</nav>
		</div>
	);
}
