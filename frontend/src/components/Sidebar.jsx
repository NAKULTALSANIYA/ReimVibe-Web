import { LayoutDashboard, Briefcase, FileText, Layers, Settings, Users, MessageSquare } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menus = [
    { path: "dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { path: "jobs", icon: <Briefcase size={20} />, label: "Jobs" },
    { path: "applications", icon: <FileText size={20} />, label: "Applications" },
    { path: "messages", icon: <MessageSquare size={20} />, label: "Messages" },
    { path: "projects", icon: <Layers size={20} />, label: "Projects" },
    { path: "services", icon: <Users size={20} />, label: "Services" },
    // { path: "settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-gray-200 p-6 flex flex-col">
      <h1 className="text-xl font-bold mb-10 text-yellow-400">Admin Panel</h1>
      <ul className="space-y-4">
        {menus.map((m, i) => (
          <li key={i}>
            <NavLink
              to={m.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md transition ${
                  isActive ? "bg-yellow-400 text-black font-semibold" : "hover:bg-gray-800"
                }`
              }
            >
              {m.icon} {m.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
