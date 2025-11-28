import { useMemo } from "react";
import { useTaskStore } from "../store/taskStore";

export default function Dashboard() {
	const tasks = useTaskStore((state) => state.tasks);

	const tasksToday = useMemo(() => {
		const today = new Date().toISOString().slice(0, 10);
		return tasks.filter(
			(t) =>
				!t.completed &&
				(!t.dueDate || t.dueDate.slice(0, 10) === today),
		);
	}, [tasks]);

	const tasksWeek = useMemo(() => {
		const now = new Date();
		const weekFromNow = new Date();
		weekFromNow.setDate(now.getDate() + 7);

		return tasks.filter((t) => {
			if (t.completed) return false;
			if (!t.dueDate) return true;
			const due = new Date(t.dueDate);
			return due >= now && due <= weekFromNow;
		});
	}, [tasks]);

	const urgentTasks = useMemo(
		() => tasks.filter((t) => t.priority === "urgent" && !t.completed),
		[tasks],
	);

	const renderTaskList = (tasks) => {
		if (!tasks || tasks.length === 0) {
			return <p className="mt-2 text-gray-500">No tasks here!</p>;
		}

		return (
			<ul className="mt-2 flex flex-col gap-3">
				{tasks.map((task) => (
					<li
						key={task.id}
						className="flex flex-col items-start rounded-md bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between"
					>
						<div className="flex flex-col">
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
					</li>
				))}
			</ul>
		);
	};

	return (
		<div className="mx-auto max-w-3xl space-y-6">
			<h1 className="text-2xl font-bold">Dashboard</h1>

			<section>
				<h2 className="text-xl font-semibold">Today</h2>
				{renderTaskList(tasksToday)}
			</section>

			<section>
				<h2 className="mt-4 text-xl font-semibold">This Week</h2>
				{renderTaskList(tasksWeek)}
			</section>

			<section>
				<h2 className="mt-4 text-xl font-semibold text-red-600">
					Urgent
				</h2>
				{renderTaskList(urgentTasks)}
			</section>
		</div>
	);
}
