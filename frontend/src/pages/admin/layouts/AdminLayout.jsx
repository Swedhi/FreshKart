import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="ml-64 min-h-screen flex flex-col">
        {/* Fixed Topbar */}
        <AdminTopbar />

        {/* Page */}
        <main className="flex-1 p-8">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}