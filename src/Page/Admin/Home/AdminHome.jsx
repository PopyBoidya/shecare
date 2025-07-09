import { useState, useEffect } from 'react';
import {
  FileText, Users, CheckCircle, Clock, Trash2, Search,
  Filter, TrendingUp, Eye,
} from 'lucide-react';
import useAxios from '../../../Hooks/useAxios';

const Dashboard = () => {
  const axios = useAxios();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [requests, setRequests] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [assigning, setAssigning] = useState(null); // pad request being assigned
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [viewingRequest, setViewingRequest] = useState(null); // for info modal

  // Fetch data and volunteers, auto-refresh every 5 seconds
  useEffect(() => {
    fetchData();
    axios.get('/volunteers').then(res => setVolunteers(res.data)).catch(console.error);

    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = () => {
    axios.get('/pad-request')
      .then(res => setRequests(res.data))
      .catch(console.error);
  };

  const deleteRequest = id => {
    if (!confirm('Confirm delete?')) return;
    axios.delete(`/pad-request/${id}`)
      .then(fetchData)
      .catch(console.error);
  };

  const updateRequest = (id, changes) => {
    axios.put(`/pad-request/${id}`, changes)
      .then(fetchData)
      .catch(console.error);
  };

  const assignVolunteer = () => {
    const volunteerData = volunteers.find(v => v._id === selectedVolunteer);
    if (!volunteerData) return;

    const assignedVolunteer = {
      id: volunteerData._id,
      name: volunteerData.fullName,
      email: volunteerData.email,
    };

    updateRequest(assigning._id, {
      assignedVolunteer,
      assignedAt: new Date(),
      status: 'pending',
    });
    closeAssignModal();
  };

  const closeAssignModal = () => {
    setAssigning(null);
    setSelectedVolunteer('');
  };

  const closeViewModal = () => {
    setViewingRequest(null);
  };

  const getStatusCount = status => requests.filter(r => r.status === status).length;

  const dashboardStats = [
    { title: 'Total Requests', value: requests.length },
    { title: 'Active Volunteers', value: new Set(requests.map(r => r.assignedVolunteer?.id)).size },
    { title: 'Completed Deliveries', value: getStatusCount('completed') },
    { title: 'Pending Requests', value: getStatusCount('pending') },
  ];

  const filteredRequests = requests.filter(r => (
    (r.building?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.specificLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r._id?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || r.status === statusFilter)
  ));

  // Sort to put 'pending' requests first
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    return 0;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen overflow-y-auto">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardStats.map((s, i) => {
          const Icon = [FileText, Users, CheckCircle, Clock][i];
          const Trend = TrendingUp;
          return (
            <div key={i} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between mb-4">
                <Icon size={24} className="text-blue-600" />
                <Trend size={16} className="text-green-600" />
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-gray-600">{s.title}</div>
            </div>
          );
        })}
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b"><h2 className="text-xl">Recent Requests</h2></div>
        <div className="flex p-4 gap-4 border-b">
          <div className="relative flex-1">
            <Search className="absolute top-2 left-3" />
            <input
              className="pl-10 border py-2 rounded"
              placeholder="Search location/id"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="border py-2 rounded"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                {['ID', 'Phone', 'Location', 'Urgency', 'Status', 'Assigned Volunteer', 'Request At', 'Actions'].map(head => (
                  <th key={head} className="px-6 py-3 text-left">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedRequests.map(r => (
                <tr key={r._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{r._id}</td>
                  <td className="px-6 py-4">{r.Number}</td>
                  <td className="px-6 py-4">{`${r.building} - ${r.specificLocation}`}</td>
                  <td className="px-6 py-4">{r.urgencyLevel}</td>

                  {/* Status with color */}
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-white text-sm ${
                      r.status === 'pending' ? 'bg-yellow-500' :
                      r.status === 'completed' ? 'bg-green-600' :
                      'bg-gray-400'
                    }`}>
                      {r.status}
                    </span>
                  </td>

                  {/* Assigned Volunteer Name & Email with Eye icon */}
                  <td className="px-6 py-4 flex items-center gap-2">
                    {/* Eye icon for detailed info */}
                    <button
                      onClick={() => setViewingRequest(r)}
                      className="text-blue-600 hover:text-blue-800"
                      title="View Details"
                      aria-label="View Details"
                    >
                      <Eye />
                    </button>

                    {r.assignedVolunteer
                      ? `${r.assignedVolunteer.name}`
                      : '-'}
                  </td>

                  {/* Assigned At */}
                  <td className="px-6 py-4">
                    {r.requestTime
                      ? new Date(r.requestTime).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })
                      : '-'}
                  </td>

                  <td className="px-6 py-4 flex gap-2 items-center">
                    {/* Assign Volunteer */}
                    <button
                      onClick={() => setAssigning(r)}
                      className="text-purple-600"
                      title="Assign Volunteer"
                    >
                      <Users />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteRequest(r._id)}
                      className="text-red-600"
                      title="Delete Request"
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Modal */}
      {assigning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="mb-4 font-semibold">Assign Volunteer</h3>
            <select
              className="w-full p-2 border rounded mb-4"
              value={selectedVolunteer}
              onChange={e => setSelectedVolunteer(e.target.value)}
            >
              <option value="">Pick volunteer</option>
              {volunteers.map(v => (
                <option key={v._id} value={v._id}>{v.fullName}</option>
              ))}
            </select>
            <div className="flex justify-end gap-4">
              <button onClick={closeAssignModal} className="px-4 py-2">Cancel</button>
              <button
                disabled={!selectedVolunteer}
                onClick={assignVolunteer}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewingRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="mb-4 font-semibold text-xl">Request Details</h3>

            <div className="space-y-2 text-sm">
              <div><strong>ID:</strong> {viewingRequest._id}</div>
              <div><strong>Phone:</strong> {viewingRequest.Number}</div>
              <div><strong>Location:</strong> {viewingRequest.building} - {viewingRequest.specificLocation}</div>
              <div><strong>Urgency Level:</strong> {viewingRequest.urgencyLevel}</div>
              <div><strong>Status:</strong> {viewingRequest.status}</div>
              <div><strong>Assigned Volunteer:</strong> {viewingRequest.assignedVolunteer
                ? `${viewingRequest.assignedVolunteer.name} (${viewingRequest.assignedVolunteer.email})`
                : '-'}</div>
              <div><strong>Assigned At:</strong> {viewingRequest.assignedAt ? new Date(viewingRequest.assignedAt).toLocaleString() : '-'}</div>
              <div><strong>Request Time:</strong> {viewingRequest.requestTime ? new Date(viewingRequest.requestTime).toLocaleString() : '-'}</div>

              {/* Add any other relevant info you want to show */}
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={closeViewModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
