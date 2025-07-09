import  { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";


const endpoints = {
  department: "/department",
  year: "/year",
  availability: "/availability",
  building: "/building",
  floor: "/floor",
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState("department");
  const axios = useAxios();

  // data holder for each category
  const [data, setData] = useState({
    department: [],
    year: [],
    availability: [],
    building: [],
    floor: [],
  });

  // new input holder for each category
  const [newEntry, setNewEntry] = useState({
    department: "",
    year: "",
    availability: "",
    building: "",
    floor: "",
  });

  // Fetch data for the active tab
  const fetchData = async (tab) => {
    try {
      const res = await axios.get(endpoints[tab]);
      setData((prev) => ({ ...prev, [tab]: res.data }));
    } catch (error) {
      Swal.fire("Error", "Failed to fetch " + tab, error);
    }
  };

  // Fetch initial data for all tabs once on mount (optional)
  useEffect(() => {
    Object.keys(endpoints).forEach((tab) => fetchData(tab));
  }, []);

  // Handle new input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Add new entry
  const handleAdd = async () => {
    const tab = activeTab;
    let payload = {};

    // Payload key depends on API
    if (tab === "year") {
      payload = { year: newEntry[tab] };
    } else if (tab === "availability") {
      payload = { availability: newEntry[tab] };
    } else {
      // For department, building, floor - key is name
      payload = { name: newEntry[tab] };
    }

    if (!newEntry[tab]) {
      Swal.fire("Error", "Please enter a value", "warning");
      return;
    }

    try {
      await axios.post(endpoints[tab], payload);
      Swal.fire("Success", "Added successfully!", "success");
      setNewEntry((prev) => ({ ...prev, [tab]: "" }));
      fetchData(tab);
    } catch (error) {
      Swal.fire("Error", "Failed to add " + tab, error);
    }
  };

  // Handle delete entry
  const handleDelete = async (id) => {
    const tab = activeTab;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the entry permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(endpoints[tab] + "/" + id);
      Swal.fire("Deleted!", "Entry has been deleted.", "success");
      fetchData(tab);
    } catch (error) {
      Swal.fire("Error", "Failed to delete " + tab, error);
    }
  };

  // Render the list of items for the current tab
  const renderList = () => {
    const tab = activeTab;
    const items = data[tab] || [];

    return items.length === 0 ? (
      <p className="p-4 text-center text-gray-500">No data found.</p>
    ) : (
      <ul className="divide-y divide-gray-200">
        {items.map((item) => {
          // display key depends on API
          let displayValue = "";
          if (tab === "year") displayValue = item.year;
          else if (tab === "availability") displayValue = item.availability;
          else displayValue = item.name;

          return (
            <li
              key={item._id}
              className="flex justify-between items-center px-4 py-2"
            >
              <span>{displayValue}</span>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className=" mx-auto p-6 bg-white shadow rounded mt-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Settings</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 justify-center">
        {Object.keys(endpoints).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Input and Add button */}
      <div className="flex mb-6 justify-center">
        <input
          type="text"
          name={activeTab}
          value={newEntry[activeTab]}
          onChange={handleInputChange}
          placeholder={`Enter new ${activeTab}`}
          className="border border-gray-300 rounded p-2 w-80"
        />
        <button
          onClick={handleAdd}
          className="ml-4 bg-green-600 text-white px-4 rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>

      {/* List of items */}
      <div className="border rounded max-h-96 overflow-auto">
        {renderList()}
      </div>
    </div>
  );
};

export default Settings;
