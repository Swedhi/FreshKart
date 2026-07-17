import { Bell, Search, UserCircle } from "lucide-react";

export default function AdminTopbar() {
  return (
    <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">

      {/* Search */}
      <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 w-[400px]">

        <Search size={18} className="text-gray-500" />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-3 w-full"
        />

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        <button className="relative">

          <Bell size={22} />

          <span
            className="
              absolute
              -top-2
              -right-2
              bg-red-500
              text-white
              text-xs
              w-5
              h-5
              rounded-full
              flex
              items-center
              justify-center
            "
          >
            3
          </span>

        </button>

        <div className="flex items-center gap-3">

          <UserCircle size={40} className="text-green-700" />

          <div>

            <p className="font-semibold">
              Admin
            </p>

            <p className="text-sm text-gray-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}