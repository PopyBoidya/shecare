import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import useAuthContext from "../../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const VolunteerDashboard = () => {
  const { user, LogOutUser } = useAuthContext();
  const [tasks, setTasks] = useState([]);
  const [volunteerInfo, setVolunteerInfo] = useState(null);
  const axios = useAxios();
    const navigate = useNavigate();


  useEffect(() => {
    // Fetch volunteer profile info from /volunteers
    axios.get("/volunteers")
      .then((res) => {
        const found = res.data.find((v) => v.email === user?.email);
        setVolunteerInfo(found);
      })
      .catch((err) => console.error("Volunteer fetch error:", err));

    // Fetch all pad-requests
    axios.get("/pad-request")
      .then((res) => {
        const myTasks = res.data.filter(
          (task) => task?.assignedVolunteer?.email === user?.email
        );
        setTasks(myTasks);
      })
      .catch((err) => console.error("Task fetch error:", err));
  }, [user]);

  const handleComplete = async (taskId) => {
    try {
      const response = await axios.put(`/pad-request/${taskId}`, {
        status: "completed",
        completedAt: new Date().toISOString()
      });

      if (response.data.modifiedCount > 0) {
        Swal.fire("Success", "Task marked as completed!", "success");
        setTasks((prev) =>
          prev.map((task) =>
            task._id === taskId
              ? { ...task, status: "completed", completedAt: new Date().toISOString() }
              : task
          )
        );
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire("Error", "Could not complete task", "error");
    }
  };

  return (
    <div className=" p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="container mx-auto flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={volunteerInfo?.imageUrl}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{volunteerInfo?.fullName}</h2>
            <p className="text-sm text-gray-500">{volunteerInfo?.email}</p>
          </div>
        </div>
          <button
      onClick={() => {
        LogOutUser();
        navigate("/login"); // ✅ navigate function call
      }}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      Logout
    </button>
      </div>

      {/* Task Table */}
      <div className="container mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Urgency</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Assigned At</th>
              <th className="px-4 py-3 text-left">Completed At</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{task.building}, Floor {task.floor}</td>
                  <td className="px-4 py-3">{task.urgencyLevel}</td>
                  <td className="px-4 py-3 capitalize">{task.status}</td>
                  <td className="px-4 py-3">{new Date(task.assignedAt).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {task.completedAt ? new Date(task.completedAt).toLocaleString() : "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {task.status === "pending" ? (
                      <button
                        onClick={() => handleComplete(task._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Mark as Completed
                      </button>
                    ) : (
                      <span className="text-green-600 font-medium">Completed</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No tasks assigned yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
