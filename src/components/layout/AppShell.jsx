import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppShell({ children }) {
	return (
		<div className="flex h-screen w-full">
			<Sidebar />

			<div className="flex flex-1 flex-col">
				<Navbar />

				<main className="h-full overflow-auto bg-gray-50 p-6">
					{children}
				</main>
			</div>
		</div>
	);
}
