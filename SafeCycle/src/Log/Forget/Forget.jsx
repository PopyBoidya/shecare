import Swal from "sweetalert2";
import useAuthContext from "../../Hooks/useAuthContext";
import { Link } from "react-router-dom";

const Forget = () => {

  const {forgotPassword}= useAuthContext();

  const forgetPass=(e) => {
    e.preventDefault();

    const email = e.target.email.value;
    forgotPassword(email)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Password reset email sent successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        e.target.reset();
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4"
            style={{ background: "linear-gradient(135deg, #ff7144 0%, #ff5722 100%)" }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-600">Enter your email below</p>
        </div>

        {/* Reset Password Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={forgetPass} className="space-y-6">
            {/* email Field */}
            <div>
              <label htmlFor="new-password" className="block text-sm font-semibold text-gray-700 mb-2">
                email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition duration-200"
                  placeholder="Enter email"
                  onFocus={(e) => {
                    e.target.style.borderColor = "#ff7144"
                    e.target.style.boxShadow = "0 0 0 3px rgba(255, 113, 68, 0.1)"
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb"
                    e.target.style.boxShadow = "none"
                  }}
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white py-3 px-6 rounded-xl font-semibold text-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ff7144 0%, #ff5722 100%)",
                focusRingColor: "#ff7144",
              }}
            >
              Reset Password
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Remember your password?{" "}
            <Link to='/login' className="font-semibold hover:underline" style={{ color: "#ff7144" }}>
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Forget;
