import { House, ListTodo, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-full w-64 bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-xl font-bold mb-8">Task Manager</h1>

      <nav className="flex flex-col gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          <House size={20} /> Dashboard
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          <ListTodo size={20} /> Task
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          <Settings size={20} /> Settings
        </NavLink>
      </nav>
    </div>
  );
}
