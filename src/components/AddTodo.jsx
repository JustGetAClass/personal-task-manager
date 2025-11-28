import { useState } from "react";
import { useTaskStore } from "../store/taskStore";

export default function AddTodo() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [priority, setPriority] = useState("medium");

	const addTask = useTaskStore((state) => state.addTask);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim()) return;

		addTask(title.trim(), description.trim(), dueDate || null, priority);

		setTitle("");
		setDescription("");
		setDueDate("");
		setPriority("medium");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-3 rounded-md bg-white p-4 shadow-sm"
		>
			<input
				type="text"
				placeholder="Enter task title..."
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className="rounded-md border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>

			<textarea
				placeholder="Enter task description (optional)..."
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				className="rounded-md border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>

			<div className="flex gap-2">
				<input
					type="date"
					value={dueDate}
					onChange={(e) => setDueDate(e.target.value)}
					className="flex-1 rounded-md border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>

				<select
					value={priority}
					onChange={(e) => setPriority(e.target.value)}
					className="rounded-md border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
					<option value="urgent">Urgent</option>
				</select>
			</div>

			<button
				type="submit"
				className="rounded-md bg-blue-500 p-2 text-white transition hover:bg-blue-600"
			>
				Add Task
			</button>
		</form>
	);
}
