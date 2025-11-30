import { useState } from "react";
import { useTaskStore } from "../store/taskStore";
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo";

export default function Tasks() {
	const allTasks = useTaskStore((state) => state.tasks);
	const searchTasks = useTaskStore((state) => state.searchTasks);

	const [query, setQuery] = useState("");

	const filteredTasks = query ? searchTasks(query) : allTasks;

	return (
		<div>
			<h1 className="mb-4 text-2xl font-bold">All Tasks</h1>
			<input
				type="text"
				placeholder="Search tasks..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="mb-4 w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-400"
			/>

			<AddTodo />

			<TodoList tasks={filteredTasks} />
		</div>
	);
}
