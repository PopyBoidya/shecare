import { useState } from 'react';
import Swal from 'sweetalert2';

const Form = () => {
    const buildingAndFloorData = {
        buildings: [
            {
                name: "Building A",
                floors: ["Ground Floor", "1st Floor", "2nd Floor"]
            },
            {
                name: "Building B",
                floors: ["Ground Floor", "1st Floor"]
            },
            {
                name: "Building C",
                floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor"]
            }
        ]
    };

    const [formData, setFormData] = useState({
        building: '',
        floor: '',
        specificLocation: '',
        urgencyLevel: '',
        additionalInfo: ''
    });

    const [floors, setFloors] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "building") {
            const selectedBuilding = buildingAndFloorData.buildings.find(b => b.name === value);
            setFloors(selectedBuilding ? selectedBuilding.floors : []);
            setFormData(prev => ({ ...prev, building: value, floor: '' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted with data:", formData);

        Swal.fire({
            title: "Request Sent!",
            text: "Your anonymous request has been submitted successfully.",
            icon: "success",
            confirmButtonColor: "#dc3e7b"
        });

        // Reset form if needed
        setFormData({
            building: '',
            floor: '',
            specificLocation: '',
            urgencyLevel: '',
            additionalInfo: ''
        });
        setFloors([]);
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Anonymous Pad Request</h2>
            <p className="text-gray-600 mb-6">
                Fill out the form below to request pads. No personal information required.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Building */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className="block font-medium">
                            Building <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="building"
                            value={formData.building}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded"
                        >
                            <option value="">Select building</option>
                            {buildingAndFloorData.buildings.map((building, idx) => (
                                <option key={idx} value={building.name}>
                                    {building.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Floor */}
                    <div>
                        <label className="block font-medium">
                            Floor <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="floor"
                            value={formData.floor}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded"
                            disabled={!formData.building}
                        >
                            <option value="">Select floor</option>
                            {floors.map((floor, idx) => (
                                <option key={idx} value={floor}>
                                    {floor}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Specific Location */}
                <div>
                    <label className="block font-medium">Specific Location</label>
                    <input
                        type="text"
                        name="specificLocation"
                        value={formData.specificLocation}
                        onChange={handleChange}
                        placeholder="e.g., Near washroom, Room 201, Main entrance"
                        className="w-full mt-1 p-2 border rounded"
                    />
                </div>

                {/* Urgency Level */}
                <div>
                    <label className="block font-medium">
                        Urgency Level <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="urgencyLevel"
                        value={formData.urgencyLevel}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 p-2 border rounded"
                    >
                        <option value="">How urgent is your request?</option>
                        <option value="🚨 Emergency (Immediate)">🚨 Emergency (Immediate)</option>
                        <option value="⚡ Urgent (Within 10 mins)">⚡ Urgent (Within 5 mins)</option>
                        <option value="📅 Normal (Within 20 mins)">📅 Normal (Within 15 mins)</option>
                    </select>
                </div>

                {/* Additional Info */}
                <div>
                    <label className="block font-medium">Additional Information</label>
                    <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Any additional details..."
                        className="w-full mt-1 p-2 border rounded"
                    />
                </div>

                {/* Privacy Notice */}
                <div className="text-sm text-gray-500">
                    <strong>Privacy Notice:</strong> This request is completely anonymous. We only collect
                    location information to help volunteers assist you effectively. No personal data is stored or shared.
                </div>

                <button
                    type="submit"
                    className="bg-[#dc3e7b] text-white px-4 py-2 rounded hover:bg-[#c5336a]"
                >
                    Send Request
                </button>
            </form>
        </div>
    );
};

export default Form;
