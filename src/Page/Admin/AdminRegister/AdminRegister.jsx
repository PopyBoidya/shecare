import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import useAuthContext from "../../../Hooks/useAuthContext";

const adminTypes = ["Super Admin", "Moderator"];

const AdminManagement = () => {
  const axios = useAxios();
  const { user, createUser } = useAuthContext();
  console.log("AdminManagement component loaded", user);

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: adminTypes[0],
    password: "",
    image: "",
  });

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/admin-register");
      setAdmins(res.data);
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Failed to fetch admins";
      Swal.fire("Error", msg, "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (file) => {
    const imageForm = new FormData();
    imageForm.append("image", file);

    try {
      const res = await fetch(
        "https://api.imgbb.com/1/upload?key=111d6e85c50d75e7e8fbc65f099c2f77",
        {
          method: "POST",
          body: imageForm,
        }
      );
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.data.url }));
        Swal.fire("Success", "Image uploaded successfully", "success");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      Swal.fire("Error", "Image upload failed", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createUser(formData.name, formData.email, formData.password);
      const { name, email, phone, designation, image } = formData;
      await axios.post("/admin-register", { name, email, phone, designation, image });

      Swal.fire("Success", "Admin registered successfully!", "success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        designation: adminTypes[0],
        password: "",
        image: "",
      });
      fetchAdmins();
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Registration failed";
      Swal.fire("Error", msg, "error");
    }
    setSubmitting(false);
  };

  const handleEdit = (admin) => {
    Swal.fire("Edit", `Edit functionality for ${admin.name} not implemented yet.`, "info");
  };

  const handleDelete = async (adminId) => {
    const result = await Swal.fire({
      title: "Confirm Delete",
      text: "Are you sure you want to delete this admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/admin-register/${adminId}`);
        Swal.fire("Deleted", "Admin has been deleted.", "success");
        fetchAdmins();
      } catch (error) {
        const msg = error.response?.data?.message || error.message || "Failed to delete admin.";
        Swal.fire("Error", msg, "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Management</h1>

      <div className="flex flex-wrap gap-10">
        <div className="w-3/5 overflow-x-auto bg-white rounded shadow mb-10">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Admin Type</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-6">Loading...</td>
                </tr>
              ) : admins.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6">No admins found.</td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{admin.name}</td>
                    <td className="border px-4 py-2">{admin.email}</td>
                    <td className="border px-4 py-2">{admin.phone}</td>
                    <td className="border px-4 py-2">{admin.designation}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button onClick={() => handleEdit(admin)} className="text-blue-600 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(admin._id)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 w-2/5 mx-auto flex-shrink-0 md:w-[30vw]">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register New Admin</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required placeholder="Shahriar Fardows" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required placeholder="admin@example.com" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} required placeholder="+8801XXXXXXXXX" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>

            <div className="mb-4">
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Admin Type</label>
              <select name="designation" id="designation" value={formData.designation} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                {adminTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0])} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required placeholder="********" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>

            <button type="submit" disabled={submitting} className={`w-full ${submitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white py-2 px-4 rounded-md font-medium transition`}>
              {submitting ? "Registering..." : "Register Admin"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
