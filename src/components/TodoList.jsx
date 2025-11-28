import { useState } from "react";
import { useTaskStore } from "../store/taskStore";

export default function TodoList({ tasks }) {
	const toggleComplete = useTaskStore((state) => state.toggleComplete);
	const deleteTask = useTaskStore((state) => state.deleteTask);
	const updateTask = useTaskStore((state) => state.updateTask);

	const [editingTask, setEditingTask] = useState(null);
	const [editTitle, setEditTitle] = useState("");
	const [editDescription, setEditDescription] = useState("");

	const startEdit = (task) => {
		setEditingTask(task.id);
		setEditTitle(task.title);
		setEditDescription(task.description);
	};

	const saveEdit = () => {
		updateTask(editingTask, {
			title: editTitle,
			description: editDescription,
		});
		setEditingTask(null);
	};

	return (
		<div className="mt-4 flex flex-col gap-4">
			{tasks.map((task) => (
				<div
					key={task.id}
					className={`flex items-start rounded-lg border p-4 shadow transition ${task.completed ? "border-gray-200 bg-gray-100" : "border-gray-300 bg-white"} hover:shadow-md`}
				>
					{/* Checkbox on the far left */}
					<input
						type="checkbox"
						checked={task.completed}
						onChange={() => toggleComplete(task.id)}
						className="mt-1 mr-4 h-5 w-5 accent-blue-500"
					/>

					{/* Task content */}
					<div className="flex-1">
						{editingTask === task.id ? (
							<>
								<input
									value={editTitle}
									onChange={(e) =>
										setEditTitle(e.target.value)
									}
									className="mb-2 w-full rounded border border-gray-300 p-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-400"
								/>
								<textarea
									value={editDescription}
									onChange={(e) =>
										setEditDescription(e.target.value)
									}
									className="w-full rounded border border-gray-300 p-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-400"
								/>
								<div className="mt-2 flex gap-2">
									<button
										onClick={saveEdit}
										className="rounded-md bg-blue-500 px-4 py-1 text-white shadow-sm transition hover:bg-blue-600"
									>
										Save
									</button>
									<button
										onClick={() => setEditingTask(null)}
										className="rounded-md bg-gray-300 px-4 py-1 text-gray-900 shadow-sm transition hover:bg-gray-400"
									>
										Cancel
									</button>
								</div>
							</>
						) : (
							<>
								<h3
									className={`font-semibold ${
										task.completed
											? "text-gray-400 line-through"
											: "text-gray-900"
									}`}
								>
									{task.title}
								</h3>
								{task.description && (
									<p
										className={`mt-1 ${
											task.completed
												? "text-gray-400 line-through"
												: "text-gray-700"
										}`}
									>
										{task.description}
									</p>
								)}
								{task.dueDate && (
									<p
										className={`mt-1 text-sm ${
											task.completed
												? "text-gray-400 line-through"
												: "text-gray-500"
										}`}
									>
										Due: {task.dueDate}
									</p>
								)}
							</>
						)}
					</div>

					{/* Action buttons on the right */}
					<div className="ml-4 flex items-start gap-2">
						{editingTask !== task.id && (
							<>
								<button
									className="rounded-md bg-yellow-400 px-3 py-1 text-sm text-white shadow-sm transition hover:bg-yellow-500"
									onClick={() => startEdit(task)}
								>
									Edit
								</button>
								<button
									className="rounded-md bg-red-500 px-3 py-1 text-sm text-white shadow-sm transition hover:bg-red-600"
									onClick={() => deleteTask(task.id)}
								>
									Delete
								</button>
							</>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
