import cat from "../../assets/cat.jpeg"

export default function Navbar() {
	return (
		<header className="flex h-16 w-full items-center justify-between border-b bg-white px-6 dark:border-gray-700 dark:bg-gray-800">
			<h2 className="text-xl font-semibold dark:text-gray-100">
				My Tasks
			</h2>

			<div className="flex items-center gap-4">
				<span className="text-sm text-gray-500">Logged in</span>
				<img src={cat} className="h-10 w-10 rounded-full bg-gray-300" />
			</div>
		</header>
	);
}
