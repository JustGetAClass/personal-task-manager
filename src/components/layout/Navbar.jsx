export default function Navbar() {
	return (
		<header className="flex h-16 w-full items-center justify-between border-b bg-white px-6 shadow-sm">
			<h2 className="text-xl font-semibold tracking-wide">My Tasks</h2>

			<div className="flex items-center gap-4">
				<span className="text-sm text-gray-500">Logged in</span>
				<div className="h-10 w-10 rounded-full bg-gray-300" />
			</div>
		</header>
	);
}
