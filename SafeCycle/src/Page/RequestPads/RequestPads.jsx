import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';

const RequestPads = () => {
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState('');
  console.log("RequestPads component loaded" , selectedBuilding);
  const axios = useAxios();

  // 🚀 Fetch building list
  useEffect(() => {
    axios.get('/building')
      .then(res => setBuildings(res.data))
      .catch(err => console.error('Failed to load buildings', err));
  }, [axios]);

  // 🚀 Fetch floor list when building changes
  const handleBuildingChange = (e) => {
    const selected = e.target.value;
    setSelectedBuilding(selected);
    axios.get(`/floor?building=${encodeURIComponent(selected)}`)
      .then(res => setFloors(res.data))
      .catch(err => console.error('Failed to load floors', err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const requestData = {
      building: formData.get('building'),
      floor: formData.get('floor'),
      specificLocation: formData.get('specificLocation'),
      urgencyLevel: formData.get('urgencyLevel'),
      additionalInfo: formData.get('additionalInfo'),
      Number: formData.get('yourNumber'),
      requestTime: new Date().toISOString(),
      status: "pending"
    };

    axios.post('/pad-request', requestData)
      .then(() => {
        Swal.fire({
          title: "Request Sent!",
          text: "Your anonymous request has been submitted successfully.",
          icon: "success",
          confirmButtonColor: "#dc3e7b"
        });
        event.target.reset();
        setFloors([]);
      })
      .catch(err => {
        Swal.fire({
          title: "Error",
          text: "Failed to submit request",
          icon: "error"
        });
        console.error(err);
      });
  };

  return (
    <section className="bg-[#f9fafb] min-h-screen py-20 px-4 flex flex-col items-center justify-center">
      <h1 className="text-center text-3xl md:text-4xl font-bold text-[#111827] font-inter">
        Request Sanitary Pads
      </h1>
      <p className="text-center text-base md:text-xl text-gray-700 mt-4 max-w-xl mx-auto font-inter">
        Submit an anonymous request and receive discreet delivery within 30 minutes
      </p>

      <div className="w-full flex justify-center mt-12 max-w-6xl mx-auto">
        <div className="w-full max-w-xl">
          <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Anonymous Pad Request</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Building & Floor */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className="block font-medium">Building <span className="text-red-500">*</span></label>
                  <select
                    name="building"
                    required
                    onChange={handleBuildingChange}
                    defaultValue=""
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="" disabled>Select building</option>
                    {buildings.map((b) => (
                      <option key={b._id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium">Floor <span className="text-red-500">*</span></label>
                  <select
                    name="floor"
                    required
                    disabled={floors.length === 0}
                    className="w-full mt-1 p-2 border rounded"
                    defaultValue=""
                  >
                    <option value="" disabled>Select floor</option>
                    {floors.map((f) => (
                      <option key={f._id} value={f.name}>{f.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Other Fields */}
              <div>
                <label className="block font-medium">Specific Location</label>
                <input
                  type="text"
                  name="specificLocation"
                  placeholder="e.g., Near washroom, Room 201"
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-medium">Your Number</label>
                <input
                  type="tel"
                  name="yourNumber"
                  required
                  placeholder="01XXXXXXXXX"
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-medium">Urgency Level <span className="text-red-500">*</span></label>
                <select name="urgencyLevel" required className="w-full mt-1 p-2 border rounded" defaultValue="">
                  <option value="" disabled>Select urgency</option>
                  <option value="🚨 Emergency (Immediate)">🚨 Emergency (Immediate)</option>
                  <option value="⚡ Urgent (Within 5 mins)">⚡ Urgent (Within 5 mins)</option>
                  <option value="📅 Normal (Within 15 mins)">📅 Normal (Within 15 mins)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Additional Information</label>
                <textarea
                  name="additionalInfo"
                  rows="3"
                  placeholder="Any additional details..."
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>

              <button
                type="submit"
                className="bg-[#dc3e7b] text-white px-4 py-2 rounded hover:bg-[#c5336a]"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestPads;
