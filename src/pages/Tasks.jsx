import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";

export default function Tasks() {
	return (
		<div className="mx-auto max-w-2xl">
			<h1 className="mb-4 text-2xl font-bold">Tasks</h1>

			<AddTodo />
			<TodoList />
		</div>
	);
}
