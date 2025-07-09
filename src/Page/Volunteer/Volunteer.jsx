import { Eye, EyeOff } from "lucide-react"; // Optional: Use any icon library
import { useEffect, useState } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";

const VolunteerForm = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const { user, createUser, LogOut } = useAuthContext();
  const axios = useAxios();
  console.log("user in volunteer form", user);

  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState([]);
  const [availability, setAvailability] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const [deptRes, yearRes, availRes] = await Promise.all([
        axios.get("/department"),
        axios.get("/year"),
        axios.get("/availability"),

      ]);

      setDepartments(deptRes.data);
      setYears(yearRes.data);
      setAvailability(availRes.data);

    };

    fetchData();
  }, [axios]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataRaw = new FormData(e.target);
    const fullName = formDataRaw.get('fullName');
    const email = formDataRaw.get('email');
    const password = formDataRaw.get('password');
    const phone = formDataRaw.get('phone');
    const studentId = formDataRaw.get('studentId');
    const department = formDataRaw.get('department');
    const academicYear = formDataRaw.get('academicYear');
    const availability = formDataRaw.getAll('availability');
    const prevExperience = formDataRaw.get('prevExperience');
    const motivation = formDataRaw.get('motivation');
    const termsAgreed = formDataRaw.get('termsAgreed');
    const userType = "volunteer";

    if (!imageFile) {
      Swal.fire("Please select an image");
      return;
    }

    const imageFormData = new FormData();
    imageFormData.append("image", imageFile);

    try {
      // Upload image to imgbb
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        imageFormData
      );
      const imageUrl = res.data.data.url;

      // Create Firebase user and update displayName
      await createUser(fullName, email, password);


      const data = {
        fullName,
        email,
        password,
        phone,
        studentId,
        department,
        academicYear,
        availability,
        prevExperience,
        motivation,
        termsAgreed,
        imageUrl,
        userType
      };
      console.log(data)

      // Send volunteer data to backend
      await axios.post("/volunteers", data);



      const domain = email.split('@')[1];
      let inboxLink = `https://${domain}`;
      if (domain.includes('gmail')) inboxLink = 'https://mail.google.com/';
      else if (domain.includes('yahoo')) inboxLink = 'https://mail.yahoo.com/';
      // etc...

      // Show success alert
      Swal.fire({
        title: 'Success!',
        html: `
    A verification email has been sent to <b>${email}</b>.<br/><br/>
    Please check your inbox and click the verification link to complete your registration.
  `,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Go to Inbox',
        reverseButtons: true,
        customClass: {
          cancelButton: 'swal2-inbox-button'
        }
      }).then((result) => {
        // Logout regardless of which button was clicked
        LogOut();

        if (result.dismiss === Swal.DismissReason.cancel) {
          // Redirect to inbox after logging out
          window.open(inboxLink, '_blank');
        }
      });

      // Reset form
      e.target.reset();
      setImageFile(null);

    } catch (err) {
      console.error("Error during form submission:", err);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };




  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-4xl font-bold mb-2 text-center">Volunteer With SheCare</h1>
      <p className="text-center mb-10 text-lg text-gray-600">Join our mission to support female students and break menstrual stigma</p>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <section>
            <h3 className="text-xl font-semibold mb-2">Why Volunteer?</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Make a Difference</li>
              <li>Help fellow students access hygiene products</li>
              <li>Build Community</li>
              <li>Connect with like-minded peers</li>
              <li>Gain Experience</li>
              <li>Develop leadership & impact skills</li>
              <li>Flexible Schedule</li>
              <li>Pick times that work with your classes</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Responsibilities</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Respond within 30 minutes to pad requests</li>
              <li>Deliver pads discreetly</li>
              <li>Maintain confidentiality</li>
              <li>Update stock levels</li>
              <li>Join awareness campaigns</li>
              <li>Attend monthly meetings</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Time Commitment</h3>
            <p>⏱️ 4 hours/week minimum</p>
            <p>📅 Flexible slots, semester-long commitment</p>
          </section>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white p-6 rounded-xl shadow space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Volunteer Application</h3>
            <p className="text-sm text-gray-500">Fill out the form below to join our team</p>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password *"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition pr-10"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
            <input
              type="text"
              name="studentId"
              placeholder="Student ID *"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Academic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="department"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Select department</option>
              {departments.map((dept) => (
                // Assuming your department documents have 'name' field
                <option key={dept._id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>

            <select
              name="academicYear"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Select year</option>
              {years.map((year) => (
                // Assuming your year documents have 'year' field
                <option key={year._id} value={year.year}>
                  {year.year} {year.year.toString().endsWith("1") ? "st" : year.year.toString().endsWith("2") ? "nd" : year.year.toString().endsWith("3") ? "rd" : "th"} Year
                </option>
              ))}
            </select>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gray-700 text-lg">
              Availability (Select all that apply) *
            </h4>

            {availability.length === 0 ? (
              <p className="text-sm text-red-500">No availability data found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-sm">
                {availability.map((availItem) => (
                  <label
                    key={availItem._id}
                    className="flex items-center gap-3 cursor-pointer hover:text-pink-600 transition-colors"
                  >
                    <input
                      type="checkbox"
                      name="availability"
                      value={availItem.availability}
                      className="accent-pink-600 w-5 h-5"
                    />
                    <span>{availItem.availability}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Experience */}
          <textarea
            name="prevExperience"
            placeholder="Describe any previous volunteer work or relevant experience..."
            className="w-full min-h-[100px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition resize-y"
          />

          {/* Motivation */}
          <textarea
            name="motivation"
            placeholder="Why do you want to volunteer with SheCare? *"
            required
            className="w-full min-h-[100px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition resize-y"
          />

          {/* Agreement */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="termsAgreed"
              required
              className="mt-1 accent-pink-600"
            />
            <label className="text-sm text-gray-700">
              I agree to the terms and conditions and commit to maintaining confidentiality *
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            Register as a Volunteer
          </button><br /><br />
          <Link to="/login" className="text-pink-500">Sign as a Volunteer </Link>
        </form>

      </div>
    </div>
  );
};

export default VolunteerForm;
