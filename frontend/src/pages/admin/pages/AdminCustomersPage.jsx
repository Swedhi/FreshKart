import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  getAllUsers,
  deleteUser,
} from "../../../api/userApi";

export default function AdminCustomersPage() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {

    try {

      const data = await getAllUsers();

      setUsers(data);

    } catch (error) {

      console.error(error);

      alert("Unable to load users");

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this customer?")) return;

    try {

      await deleteUser(id);

      loadUsers();

    } catch (error) {

      console.error(error);

      alert("Unable to delete customer");

    }

  };

  if (loading) {

    return (

      <AdminLayout>

        <h2 className="text-2xl">
          Loading Customers...
        </h2>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Customer Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all registered customers
          </p>

        </div>

        <div className="overflow-x-auto bg-white rounded-2xl shadow">

          <table className="w-full">

            <thead className="bg-green-600 text-white">

              <tr>

                <th className="p-4 text-left">ID</th>

                <th className="p-4 text-left">Customer</th>

                <th className="p-4 text-left">Email</th>

                <th className="p-4 text-left">Joined</th>

                <th className="p-4 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr
                  key={user.id}
                  className="border-b"
                >

                  <td className="p-4">
                    {user.id}
                  </td>

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">

                        {user.email
                          ? user.email.charAt(0).toUpperCase()
                          : "?"}

                      </div>

                      <span>
                        Customer #{user.id}
                      </span>

                    </div>

                  </td>

                  <td className="p-4">
                    {user.email || "No Email"}
                  </td>

                  <td className="p-4">
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() =>
                        handleDelete(user.id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}