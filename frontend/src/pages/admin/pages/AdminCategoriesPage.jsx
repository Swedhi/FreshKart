import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../api/categoryApi";

import { Pencil, Trash2, Plus } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      if (editingId) {
        await updateCategory(editingId, {
          name,
        });
      } else {
        await createCategory({
          name,
        });
      }

      setName("");
      setEditingId(null);

      loadCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setName(category.name);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await deleteCategory(id);
      loadCategories();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <h1>Loading...</h1>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Categories
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 mb-8">

        <div className="flex gap-3">

          <input
            className="flex-1 border rounded-lg px-4 py-3"
            placeholder="Category name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} />

            {editingId
              ? "Update"
              : "Add"}
          </button>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow">

        <table className="w-full">

          <thead>

            <tr className="border-b bg-gray-50">
              <th className="text-left p-4">
                ID
              </th>

              <th className="text-left p-4">
                Name
              </th>

              <th className="text-center p-4">
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

            {categories.map((category) => (

              <tr
                key={category.id}
                className="border-b"
              >
                <td className="p-4">
                  {category.id}
                </td>

                <td className="p-4">
                  {category.name}
                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() =>
                        handleEdit(category)
                      }
                      className="text-blue-600"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(category.id)
                      }
                      className="text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}