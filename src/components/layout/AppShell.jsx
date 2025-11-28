import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

export default function AppShell({ children }) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 overflow-auto bg-gray-50 h-full">
          {children}
        </main>
      </div>
    </div>
  );
}
