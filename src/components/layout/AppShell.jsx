import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppShell({ children }) {
	return (
		<div className="flex h-screen w-full bg-gray-50">
			<Sidebar className="bg-gray-900 text-white" />

			<div className="flex flex-1 flex-col">
				<Navbar className="border-b bg-white shadow-sm" />

				<main className="overflow-auto p-6">{children}</main>
			</div>
		</div>
	);
}
