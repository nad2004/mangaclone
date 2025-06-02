// components/AdminLayout.tsx
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: "📊" },
  { name: "Manga", path: "/admin/manga", icon: "📚" },
  { name: "Chapters", path: "/admin/chapters", icon: "📄" },
  { name: "Users", path: "/admin/users", icon: "👤" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r shadow-sm">
        <div className="px-4 py-6 text-center text-xl font-bold border-b">
          Manga Admin
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 p-2 rounded-lg ${
                pathname === item.path
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-200"
              }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
