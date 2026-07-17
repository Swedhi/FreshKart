import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { useNavigate } from "react-router-dom";

import {
  getVendors,
  createVendor,
  updateVendor,
  deleteVendor,
} from "../../../api/vendorApi";

export default function AdminVendorsPage() {
  const emptyVendor = {
    vendorName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    status: "Active",
  };

  const [vendors, setVendors] = useState([]);
  const [vendor, setVendor] = useState(emptyVendor);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
  try {
    const data = await getVendors();

    console.log("Vendor API Response:", data);

    // Backend returns array
    if (Array.isArray(data)) {
      setVendors(data);
    }

    // Backend returns Spring Page
    else if (data && Array.isArray(data.content)) {
      setVendors(data.content);
    }

    // Backend returns wrapped response
    else if (data && Array.isArray(data.data)) {
      setVendors(data.data);
    }

    // Unknown response
    else {
      console.error("Unexpected vendor response:", data);
      setVendors([]);
    }
  } catch (err) {
    console.error(err);
    setVendors([]);
  }
};

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateVendor(editingId, vendor);
      } else {
        await createVendor(vendor);
      }

      setVendor(emptyVendor);
      setEditingId(null);
      loadVendors();
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  const handleEdit = (v) => {
    setEditingId(v.id);
    setVendor(v);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vendor?")) return;

    try {
      await deleteVendor(id);
      loadVendors();
    } catch (err) {
      console.error(err);
    }
  };

 const filtered = useMemo(() => {
  return (vendors || []).filter((v) =>
    (v.vendorName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );
}, [vendors, search]);

  const active = (vendors || []).filter(
  (v) => v.status === "Active"
).length;
  const inactive = (vendors || []).filter(
  (v) => v.status === "Inactive"
).length;
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto w-full px-6 py-8">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Vendor Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all registered vendors
          </p>
        </div>

        {/* Dashboard Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">
              Total Vendors
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {vendors.length}
            </h2>
          </div>

          <div className="bg-green-50 rounded-2xl border border-green-200 shadow p-6">
            <p className="text-green-700">
              Active Vendors
            </p>

            <h2 className="text-4xl font-bold text-green-700 mt-3">
              {active}
            </h2>
          </div>

          <div className="bg-red-50 rounded-2xl border border-red-200 shadow p-6">
            <p className="text-red-700">
              Inactive Vendors
            </p>

            <h2 className="text-4xl font-bold text-red-700 mt-3">
              {inactive}
            </h2>
          </div>

        </div>

        {/* Form */}

        <div className="bg-white rounded-2xl shadow p-8 mb-8">

          <h2 className="text-2xl font-semibold mb-6">
            {editingId ? "Edit Vendor" : "Add New Vendor"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input
              className="border rounded-xl p-3"
              placeholder="Vendor Name"
              value={vendor.vendorName}
              onChange={(e) =>
                setVendor({
                  ...vendor,
                  vendorName: e.target.value,
                })
              }
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Owner Name"
              value={vendor.ownerName}
              onChange={(e) =>
                setVendor({
                  ...vendor,
                  ownerName: e.target.value,
                })
              }
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Email"
              value={vendor.email}
              onChange={(e) =>
                setVendor({
                  ...vendor,
                  email: e.target.value,
                })
              }
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Phone"
              value={vendor.phone}
              onChange={(e) =>
                setVendor({
                  ...vendor,
                  phone: e.target.value,
                })
              }
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Address"
              value={vendor.address}
              onChange={(e) =>
                setVendor({
                  ...vendor,
                  address: e.target.value,
                })
              }
            />

            <select
              className="border rounded-xl p-3"
              value={vendor.status}
              onChange={(e) =>
                setVendor({
                  ...vendor,
                  status: e.target.value,
                })
              }
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 bg-green-600 hover:bg-green-700 transition text-white px-8 py-3 rounded-xl font-medium"
          >
            {editingId ? "Update Vendor" : "Add Vendor"}
          </button>

        </div>

        {/* Search */}

        <div className="mb-6">

          <input
            className="w-full md:w-96 border rounded-xl px-4 py-3"
            placeholder="Search Vendor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* Table */}

        <div className="bg-white rounded-2xl shadow overflow-x-auto">

          <table className="min-w-[1200px] w-full">

            <thead className="bg-green-600 text-white sticky top-0">

              <tr>

                <th className="px-6 py-4 text-left">Vendor</th>
                <th className="px-6 py-4 text-left">Owner</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Products</th>
                <th className="px-6 py-4 text-center">Orders</th>
                <th className="px-6 py-4 text-center">Revenue</th>
                <th className="px-6 py-4 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {filtered.map((v) => (

                <tr
                  key={v.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 font-medium">
                    {v.vendorName}
                  </td>

                  <td className="px-6 py-4">
                    {v.ownerName}
                  </td>

                  <td className="px-6 py-4">
                    {v.email}
                  </td>

                  <td className="px-6 py-4">
                    {v.phone}
                  </td>

                  <td className="px-6 py-4 text-center">

                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                        v.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {v.status}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-center">
                    {v.totalProducts ?? 0}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {v.totalOrders ?? 0}
                  </td>

                  <td className="px-6 py-4 text-center font-semibold text-green-700">
                    ₹{v.totalRevenue ?? 0}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => handleEdit(v)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
  onClick={() => navigate(`/admin/vendors/${v.id}`)}
  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
>
  View
</button>

                      <button
                        onClick={() => handleDelete(v.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

              {filtered.length === 0 && (

                <tr>

                  <td
                    colSpan={9}
                    className="py-10 text-center text-gray-500"
                  >
                    No vendors found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>
    </AdminLayout>
  );
}