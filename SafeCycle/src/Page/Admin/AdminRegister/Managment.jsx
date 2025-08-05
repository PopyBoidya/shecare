import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import { useEffect, useState } from "react";

const Management = () => {

  const axios = useAxios();

     const [admins, setAdmins] = useState([]);
      const [loading, setLoading] = useState(false);

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
        <div>
            <div className=" overflow-x-auto bg-white rounded shadow mb-10">
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
        </div>
    );
};


export default Management;