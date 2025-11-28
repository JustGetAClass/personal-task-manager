export default function Navbar() {
  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold">My Tasks</h2>

      <div className="flex items-center gap-4">
        <span className="text-gray-500 text-sm">Logged in</span>
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
      </div>
    </header>
  );
}
