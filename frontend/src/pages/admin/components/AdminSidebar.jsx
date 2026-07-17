import {
  LayoutDashboard,
  Package,
  Tags,
  Truck,
  Boxes,
  ShoppingCart,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      name: "Products",
      icon: Package,
      path: "/admin/products",
    },
    {
      name: "Categories",
      icon: Tags,
      path: "/admin/categories",
    },
    {
      name: "Vendors",
      icon: Truck,
      path: "/admin/vendors",
    },
    {
      name: "Inventory",
      icon: Boxes,
      path: "/admin/inventory",
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      path: "/admin/orders",
    },
    {
      name: "Customers",
      icon: Users,
      path: "/admin/customers",
    },
    {
      name: "Analytics",
      icon: BarChart3,
      path: "/admin/analytics",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-green-700 text-white flex flex-col shadow-xl z-50">
      {/* Logo */}

      <div className="h-20 flex items-center justify-center border-b border-green-600">
        <h1 className="text-2xl font-bold">
          FreshKart Admin
        </h1>
      </div>

      {/* Menu */}

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-white text-green-700 font-semibold"
                    : "hover:bg-green-600"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}

      <div className="p-4 border-t border-green-600">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}