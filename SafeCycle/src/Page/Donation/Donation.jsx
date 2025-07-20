
import { useState } from "react"

export default function DonationPage() {
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    method: "",
    mobile: "",
  })

  // UI states
  const [showPopup, setShowPopup] = useState(false)
  const [transactionId, setTransactionId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)

  // Status check states
  const [showStatusCheck, setShowStatusCheck] = useState(false)
  const [checkTransactionId, setCheckTransactionId] = useState("")
  const [statusResult, setStatusResult] = useState(null)
  const [isCheckingStatus, setIsCheckingStatus] = useState(false)

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle Pay button click
  const handlePayClick = () => {
    // Validate form
    if (!formData.name || !formData.amount || !formData.method || !formData.mobile) {
      alert("Please fill all fields")
      return
    }
    setShowPopup(true)
  }

  // Save donation data to API - Always as pending
  const saveDonationData = async () => {
    try {
      const payload = {
        name: formData.name,
        amount: formData.amount,
        method: formData.method,
        mobile: formData.mobile,
        transactionId: transactionId,
        VerificationStatus: "pending", // Always pending initially
      }

      console.log("Saving donation data:", payload)

      const response = await fetch("https://sheetdb.io/api/v1/r5rn8acsqrl9h", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      return response.ok
    } catch (error) {
      console.error("Error saving donation data:", error)
      return false
    }
  }

  // Handle donation completion
  const handleDonationDone = async () => {
    if (!transactionId.trim()) {
      alert("Please enter Transaction ID")
      return
    }

    setIsLoading(true)

    try {
      // Save data to API (always as pending)
      const saved = await saveDonationData()

      if (saved) {
        setShowPopup(false)
        setShowResult(true)
      } else {
        alert("Failed to save donation. Please try again.")
      }
    } catch (error) {
      console.error("Error processing donation:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Check donation status by transaction ID
  const handleStatusCheck = async () => {
    if (!checkTransactionId.trim()) {
      alert("Please enter Transaction ID")
      return
    }

    setIsCheckingStatus(true)
    setStatusResult(null)

    try {
      console.log("Checking status for transaction ID:", checkTransactionId.trim())

      // Get all donations from the database
      const response = await fetch("https://sheetdb.io/api/v1/r5rn8acsqrl9h")

      if (!response.ok) {
        throw new Error("Failed to fetch donations")
      }

      const allDonations = await response.json()
      console.log("All donations from API:", allDonations)

      // Find the donation with matching transaction ID (case-insensitive and trim whitespace)
      const foundDonation = allDonations.find(
        (donation) =>
          donation.transactionId &&
          donation.transactionId.trim().toLowerCase() === checkTransactionId.trim().toLowerCase(),
      )

      console.log("Found donation:", foundDonation)

      if (foundDonation) {
        setStatusResult(foundDonation)
      } else {
        setStatusResult({ notFound: true })
      }
    } catch (error) {
      console.error("Error checking status:", error)
      alert("Error checking status. Please try again.")
      setStatusResult({ error: true })
    } finally {
      setIsCheckingStatus(false)
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      amount: "",
      method: "",
      mobile: "",
    })
    setTransactionId("")
    setShowResult(false)
  }

  // Reset status check
  const resetStatusCheck = () => {
    setCheckTransactionId("")
    setStatusResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full mb-6 shadow-lg">
            <svg className="w-10 h-10 text-[#db2777]" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#db2777] to-purple-600 bg-clip-text text-transparent mb-3">
            Make a Donation
          </h1>
          <p className="text-gray-600 text-lg">Your contribution makes a difference</p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mb-8 p-1 bg-white rounded-xl shadow-sm">
          <button
            onClick={() => {
              setShowStatusCheck(false)
              setShowResult(false)
              resetStatusCheck()
            }}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              !showStatusCheck && !showResult
                ? "bg-[#db2777] text-white shadow-lg transform scale-105"
                : "text-[#db2777] hover:bg-pink-50"
            }`}
          >
            New Donation
          </button>
          <button
            onClick={() => {
              setShowStatusCheck(true)
              setShowResult(false)
              resetStatusCheck()
            }}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              showStatusCheck
                ? "bg-[#db2777] text-white shadow-lg transform scale-105"
                : "text-[#db2777] hover:bg-pink-50"
            }`}
          >
            Check Status
          </button>
        </div>

        {showStatusCheck ? (
          /* Status Check Section */
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#db2777] to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Check Donation Status</h2>
              <p className="text-gray-600 text-center">Enter your transaction ID to check donation status</p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="checkTxnId" className="block text-sm font-semibold text-gray-700 mb-2">
                  Transaction ID
                </label>
                <input
                  id="checkTxnId"
                  type="text"
                  placeholder="Enter your transaction ID (e.g., #TBK001)"
                  value={checkTransactionId}
                  onChange={(e) => setCheckTransactionId(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#db2777] focus:ring-4 focus:ring-pink-100 transition-all duration-300"
                />
              </div>

              <button
                onClick={handleStatusCheck}
                disabled={isCheckingStatus || !checkTransactionId.trim()}
                className="w-full bg-gradient-to-r from-[#db2777] to-purple-600 hover:from-[#be185d] hover:to-purple-700 disabled:from-pink-300 disabled:to-purple-300 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none disabled:cursor-not-allowed"
              >
                {isCheckingStatus ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Checking Status...
                  </div>
                ) : (
                  "Check Status"
                )}
              </button>

              {/* Refresh Button */}
              {statusResult && !statusResult.notFound && !statusResult.error && (
                <button
                  onClick={handleStatusCheck}
                  disabled={isCheckingStatus}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-xl transition-all duration-300"
                >
                  🔄 Refresh Status
                </button>
              )}
            </div>

            {/* Status Result */}
            {statusResult && (
              <div className="mt-8 p-6 rounded-xl border-2 border-gray-100 bg-gray-50">
                {statusResult.notFound ? (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                      <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-red-600 font-bold text-lg">Transaction ID not found</p>
                    <p className="text-gray-600 mt-2">Please check your transaction ID and try again</p>
                  </div>
                ) : statusResult.error ? (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                      <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-red-600 font-bold text-lg">Error occurred</p>
                    <p className="text-gray-600 mt-2">Please try again later</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-center mb-6">
                      {statusResult.VerificationStatus &&
                      statusResult.VerificationStatus.toLowerCase() === "confirmed" ? (
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                          <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                          <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}

                      <p
                        className={`font-bold text-xl ${
                          statusResult.VerificationStatus &&
                          statusResult.VerificationStatus.toLowerCase() === "confirmed"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {statusResult.VerificationStatus &&
                        statusResult.VerificationStatus.toLowerCase() === "confirmed"
                          ? "Donation Confirmed! ✅"
                          : "Pending Verification ⏳"}
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-5 space-y-3 shadow-sm">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-semibold text-gray-700">Name:</span>
                        <span className="text-gray-900">{statusResult.name || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-semibold text-gray-700">Amount:</span>
                        <span className="text-gray-900 font-bold">৳{statusResult.amount || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-semibold text-gray-700">Method:</span>
                        <span className="text-gray-900">{statusResult.method || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-semibold text-gray-700">Mobile:</span>
                        <span className="text-gray-900">{statusResult.mobile || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-semibold text-gray-700">Transaction ID:</span>
                        <span className="text-gray-900 font-mono">{statusResult.transactionId || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-semibold text-gray-700">Status:</span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
                            statusResult.VerificationStatus &&
                            statusResult.VerificationStatus.toLowerCase() === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {statusResult.VerificationStatus &&
                          statusResult.VerificationStatus.toLowerCase() === "confirmed"
                            ? "Confirmed"
                            : "Pending"}
                        </span>
                      </div>
                    </div>

                    {statusResult.VerificationStatus && statusResult.VerificationStatus.toLowerCase() === "pending" && (
                      <div className="text-center mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <p className="text-yellow-800 font-medium">
                          ⏳ Your donation is being verified. Please check back later or contact us for updates.
                        </p>
                      </div>
                    )}

                    {statusResult.VerificationStatus &&
                      statusResult.VerificationStatus.toLowerCase() === "confirmed" && (
                        <div className="text-center mt-4 bg-green-50 p-4 rounded-lg border border-green-200">
                          <p className="text-green-800 font-medium">
                            🎉 Thank you for your generous donation! Your contribution has been confirmed.
                          </p>
                        </div>
                      )}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : !showResult ? (
          /* Donation Form */
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#db2777] to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Donation Details</h2>
              <p className="text-gray-600 text-center">Please fill in your donation information</p>
            </div>

            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#db2777] focus:ring-4 focus:ring-pink-100 transition-all duration-300"
                />
              </div>

              {/* Amount Input */}
              <div>
                <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
                  Donation Amount (BDT)
                </label>
                <input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#db2777] focus:ring-4 focus:ring-pink-100 transition-all duration-300"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label htmlFor="method" className="block text-sm font-semibold text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  id="method"
                  value={formData.method}
                  onChange={(e) => handleInputChange("method", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#db2777] focus:ring-4 focus:ring-pink-100 transition-all duration-300"
                >
                  <option value="">Select payment method</option>
                  <option value="bKash">bKash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Rocket">Rocket</option>
                </select>
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#db2777] focus:ring-4 focus:ring-pink-100 transition-all duration-300"
                />
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayClick}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Pay Now
              </button>
            </div>
          </div>
        ) : (
          /* Result Card - Always shows pending */
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full">
                <svg className="w-10 h-10 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <div className="flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="text-yellow-800">
                    <p className="font-bold text-xl">Donation Submitted! ⏳</p>
                    <p className="mt-1">Your donation is being verified. We will update the status soon.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Name:</span>
                  <span className="text-gray-900">{formData.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Amount:</span>
                  <span className="text-gray-900 font-bold">৳{formData.amount}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Method:</span>
                  <span className="text-gray-900">{formData.method}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-gray-700">Transaction ID:</span>
                  <span className="text-gray-900 font-mono">{transactionId}</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-blue-800 text-sm">
                  💡 <strong>Save your Transaction ID:</strong> {transactionId}
                  <br />
                  You can use this ID to check your donation status anytime using the "Check Status" tab.
                </p>
              </div>

              <button
                onClick={resetForm}
                className="w-full bg-gradient-to-r from-[#db2777] to-purple-600 hover:from-[#be185d] hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Make Another Donation
              </button>
            </div>
          </div>
        )}

        {/* Transaction ID Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-pink-100">
              <div className="mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#db2777] to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Enter Transaction ID</h3>
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                  <p className="text-sm text-gray-700 text-center">
                    Please send money to: <span className="font-bold text-[#db2777]">019xxxxxxxx</span>
                    <br />
                    After sending, enter your Transaction ID below.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="txnId" className="block text-sm font-semibold text-gray-700 mb-2">
                    Transaction ID
                  </label>
                  <input
                    id="txnId"
                    type="text"
                    placeholder="Enter transaction ID (e.g., #TBK001)"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#db2777] focus:ring-4 focus:ring-pink-100 transition-all duration-300"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDonationDone}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-green-300 disabled:to-green-400 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      "Submit Donation"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
