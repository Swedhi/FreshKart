import client from "./client";

// Get all vendors
export const getVendors = async () => {
  const response = await client.get("/vendors");
  return response.data;
};

// Create vendor
export const createVendor = async (vendor) => {
  const response = await client.post("/vendors", vendor);
  return response.data;
};

// Update vendor
export const updateVendor = async (id, vendor) => {
  const response = await client.put(`/vendors/${id}`, vendor);
  return response.data;
};

// Delete vendor
export const deleteVendor = async (id) => {
  const response = await client.delete(`/vendors/${id}`);
  return response.data;
};

// Vendor Details
export const getVendorById = async (id) => {
  const response = await client.get(`/vendors/${id}`);
  return response.data;
};