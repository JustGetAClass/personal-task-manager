import { useTaskStore } from "../store/taskStore";

export default function TodoList() {
	const tasks = useTaskStore((state) => state.tasks);
	const toggleComplete = useTaskStore((state) => state.toggleComplete);
	const deleteTask = useTaskStore((state) => state.deleteTask);

	if (!tasks || tasks.length === 0) {
		return <p className="mt-2 text-gray-500">No tasks added yet!</p>;
	}

	return (
		<ul className="mt-4 flex flex-col gap-3">
			{tasks.map((task) => (
				<li
					key={task.id}
					className="flex flex-col items-start rounded-md bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between"
				>
					<div className="flex flex-col">
						{/* Title */}
						<span
							className={`font-semibold ${
								task.completed
									? "text-gray-400 line-through"
									: ""
							}`}
						>
							{task.title}
						</span>

						{task.description && (
							<span className="mt-1 text-sm text-gray-600">
								{task.description}
							</span>
						)}

						<div className="mt-1 flex gap-3 text-sm text-gray-500">
							{task.dueDate && (
								<span>
									Due:{" "}
									{new Date(
										task.dueDate,
									).toLocaleDateString()}
								</span>
							)}
							<span>Priority: {task.priority}</span>
						</div>
					</div>

					<div className="mt-2 flex gap-2 sm:mt-0">
						<button
							onClick={() => toggleComplete(task.id)}
							className="rounded-md bg-green-500 px-3 py-1 text-white hover:bg-green-600"
						>
							{task.completed ? "Undo" : "Complete"}
						</button>
						<button
							onClick={() => deleteTask(task.id)}
							className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600"
						>
							Delete
						</button>
					</div>
				</li>
			))}
		</ul>
	);
}
