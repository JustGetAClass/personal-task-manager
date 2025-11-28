import { useEffect } from "react";
import { useTaskStore } from "../store/taskStore";

export default function Settings() {
	const settings = useTaskStore((state) => state.settings);
	const saveToStorage = useTaskStore((state) => state.saveToStorage);

	useEffect(() => {
		const root = document.documentElement;
		if (settings.theme === "dark") {
			root.classList.add("dark");
		} else if (settings.theme === "light") {
			root.classList.remove("dark");
		} else if (settings.theme === "system") {
			const prefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)",
			).matches;
			if (prefersDark) {
				root.classList.add("dark");
			} else {
				root.classList.remove("dark");
			}
		}
	}, [settings.theme]);

	const handleChange = (key, value) => {
		useTaskStore.setState({
			settings: { ...settings, [key]: value },
		});
		saveToStorage();
	};

	return (
		<div className="mx-auto max-w-2xl space-y-6 rounded-md bg-white p-6 shadow-sm dark:bg-gray-800">
			<h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
				Settings
			</h1>

			<div className="flex flex-col gap-2">
				<label className="font-semibold text-gray-700 dark:text-gray-200">
					Theme
				</label>
				<select
					value={settings.theme}
					onChange={(e) => handleChange("theme", e.target.value)}
					className="rounded-md border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
				>
					<option value="light">Light</option>
					<option value="dark">Dark</option>
					<option value="system">System</option>
				</select>
			</div>

			<div className="flex items-center gap-4">
				<label className="font-semibold text-gray-700 dark:text-gray-200">
					Show Completed Tasks
				</label>
				<input
					type="checkbox"
					checked={settings.showCompleted}
					onChange={(e) =>
						handleChange("showCompleted", e.target.checked)
					}
					className="h-5 w-5"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label className="font-semibold text-gray-700 dark:text-gray-200">
					Default Dashboard View
				</label>
				<select
					value={settings.defaultView}
					onChange={(e) =>
						handleChange("defaultView", e.target.value)
					}
					className="rounded-md border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
				>
					<option value="today">Today</option>
					<option value="week">This Week</option>
					<option value="urgent">Urgent</option>
				</select>
			</div>
		</div>
	);
}
