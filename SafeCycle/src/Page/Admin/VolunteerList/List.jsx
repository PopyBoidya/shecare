import { useState, useEffect } from 'react';
import { Eye, X } from 'lucide-react';
import useAxios from '../../../Hooks/useAxios';

const List = () => {
  const axios = useAxios();
  const [volunteers, setVolunteers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [viewing, setViewing] = useState(null);

  useEffect(() => {
    axios.get('/volunteers')
      .then(res => {
        setVolunteers(res.data);
        setFiltered(res.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    const filteredData = volunteers.filter(v =>
      v.fullName.toLowerCase().includes(term) ||
      v.phone.includes(term) ||
      v.studentId.includes(term)
    );
    setFiltered(filteredData);
  }, [search, volunteers]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Volunteers List</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name, phone, or ID"
        className="mb-4 p-2 border rounded w-full max-w-md"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Volunteer Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-200 text-gray-700 text-left">
            <tr>
              <th className="p-3">Photo</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Student ID</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(v => (
              <tr key={v._id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={v.imageUrl || '/default-avatar.png'}
                    alt={v.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="p-3 font-medium">{v.fullName}</td>
                <td className="p-3">{v.phone}</td>
                <td className="p-3">{v.studentId}</td>
                <td className="p-3">
                  <button
                    onClick={() => setViewing(v)}
                    className="text-blue-600 hover:text-blue-800"
                    title="View Details"
                  >
                    <Eye />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No volunteers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {viewing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => setViewing(null)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              title="Close"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center gap-4">
              <img
                src={viewing.imageUrl || '/default-avatar.png'}
                alt={viewing.fullName}
                className="w-24 h-24 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold">{viewing.fullName}</h3>
            </div>
            <div className="mt-4 space-y-2 text-gray-700">
              <div><strong>Phone:</strong> {viewing.phone}</div>
              <div><strong>Student ID:</strong> {viewing.studentId}</div>
              <div><strong>Email:</strong> {viewing.email}</div>
              <div><strong>Department:</strong> {viewing.department}</div>
              <div><strong>Academic Year:</strong> {viewing.academicYear}</div>
              <div><strong>Experience:</strong> {viewing.prevExperience}</div>
              <div><strong>Motivation:</strong> {viewing.motivation}</div>
              <div><strong>Availability:</strong>
                <ul className="list-disc list-inside ml-2 text-sm">
                  {viewing.availability?.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
              <div><strong>Joined At:</strong> {new Date(viewing.createdAt).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
