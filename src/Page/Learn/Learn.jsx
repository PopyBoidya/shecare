import React, { useState } from 'react';

const LearnPage = () => {
  const [activeTab, setActiveTab] = useState('Basics');

  const tabs = ['Basics', 'Hygiene', "Do's & Don'ts", 'Myths', 'Support'];

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">
          Menstrual Health Education
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Comprehensive information about menstrual health, hygiene, and wellness
        </p>

        {/* Tab Navigation */}
        <nav className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-gray-600 font-medium px-3 py-1 rounded transition-colors ${
                activeTab === tab ? 'bg-[#db2777] text-white' : 'bg-gray-100 hover:text-[#db2777]'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div>
          {/* Basics Tab */}
          {activeTab === 'Basics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* What is Menstruation */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-[#db2777] mb-4 flex items-center">
                  <i className="fas fa-info-circle text-[#db2777] mr-2"></i> What is Menstruation?
                </h2>
                <p className="text-gray-600 mb-4">
                  Menstruation is a natural biological process where the lining of the uterus (endometrium) sheds monthly in women of reproductive age. This typically occurs every 21-35 days and lasts 3-7 days.
                </p>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Normal Cycle Length:</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Average cycle: 28 days</li>
                  <li>Normal range: 21-35 days</li>
                  <li>Period duration: 3-7 days</li>
                  <li>Blood loss: 30-40ml (normal)</li>
                </ul>
              </div>

              {/* Tracking Your Cycle */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-[#db2777] mb-4 flex items-center">
                  <i className="fas fa-calendar-alt text-[#db2777] mr-2"></i> Tracking Your Cycle
                </h2>
                <p className="text-gray-600 mb-4">
                  Tracking your menstrual cycle helps you understand your body better and predict when your next period will start.
                </p>
                <h3 className="text-lg font-medium text-gray-700 mb-2">What to Track:</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Start and end dates of periods</li>
                  <li>Flow intensity (light, medium, heavy)</li>
                  <li>Symptoms (cramps, mood changes)</li>
                  <li>Any irregularities or concerns</li>
                </ul>
              </div>

              {/* Common Symptoms */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-[#db2777] mb-4">Common Symptoms</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Physical:</h3>
                    <ul className="list-disc pl-5 text-gray-600">
                      <li>Abdominal cramps</li>
                      <li>Back pain</li>
                      <li>Breast tenderness</li>
                      <li>Headaches</li>
                      <li>Fatigue</li>
                    </ul>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Emotional:</h3>
                    <ul className="list-disc pl-5 text-gray-600">
                      <li>Mood swings</li>
                      <li>Irritability</li>
                      <li>Anxiety</li>
                      <li>Food cravings</li>
                      <li>Sleep changes</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Menstrual Products */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-[#db2777] mb-4">Menstrual Products</h2>
                <ul className="list-disc pl-5 text-gray-600">
                  <li><strong>Sanitary Pads:</strong> External protection, easy to use, various absorbency levels</li>
                  <li><strong>Tampons:</strong> Internal protection, good for active lifestyle</li>
                  <li><strong>Menstrual Cups:</strong> Reusable, eco-friendly, long-lasting protection</li>
                  <li><strong>Period Underwear:</strong> Built-in protection, comfortable for light days</li>
                </ul>
              </div>
            </div>
          )}

          {/* Hygiene Tab */}
          {activeTab === 'Hygiene' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Hygiene */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-[#db2777] mb-4 flex items-center">
                  <i className="fas fa-heart text-[#db2777] mr-2"></i> Personal Hygiene
                </h2>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Daily Care:</h3>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>Change pads every 4-6 hours</li>
                  <li>Wash hands before and after changing products</li>
                  <li>Clean genital area with warm water</li>
                  <li>Use mild, unscented soap if needed</li>
                  <li>Wipe from front to back</li>
                </ul>
                <h3 className="text-lg font-medium text-gray-700 mb-2">What to Avoid:</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Douching or vaginal washes</li>
                  <li>Scented products near genital area</li>
                  <li>Wearing the same pad for too long</li>
                  <li>Using dirty or unwashed hands</li>
                </ul>
              </div>

              {/* Proper Disposal */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-[#db2777] mb-4">Proper Disposal</h2>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Sanitary Pads:</h3>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>Wrap used pad in its wrapper or toilet paper</li>
                  <li>Dispose in designated bins</li>
                  <li>Never flush pads down the toilet</li>
                  <li>Use biodegradable bags when possible</li>
                </ul>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Environmental Impact:</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Consider reusable options like menstrual cups</li>
                  <li>Choose biodegradable products when available</li>
                  <li>Proper disposal prevents environmental harm</li>
                </ul>
              </div>

              {/* Nutrition During Periods */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-[#db2777] mb-4">Nutrition During Periods</h2>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Foods to Include:</h3>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>Iron-rich foods (spinach, lentils, meat)</li>
                  <li>Calcium sources (dairy, leafy greens)</li>
                  <li>Magnesium (nuts, seeds, dark chocolate)</li>
                  <li>Plenty of water for hydration</li>
                  <li>Complex carbohydrates for energy</li>
                </ul>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Foods to Limit:</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Excessive caffeine</li>
                  <li>High sodium foods</li>
                  <li>Processed sugary snacks</li>
                  <li>Alcohol</li>
                </ul>
              </div>

              {/* Exercise and Activity */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-[#db2777] mb-4">Exercise and Activity</h2>
                <p className="text-gray-600 mb-4">
                  Regular exercise can help reduce menstrual symptoms and improve overall well-being.
                </p>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Beneficial Activities:</h3>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>Light cardio (walking, swimming)</li>
                  <li>Yoga and stretching</li>
                  <li>Strength training (if comfortable)</li>
                  <li>Dancing or other enjoyable activities</li>
                </ul>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Listen to Your Body:</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Rest when you need to</li>
                  <li>Modify intensity based on how you feel</li>
                  <li>Stay hydrated during exercise</li>
                  <li>Use appropriate menstrual products for activity</li>
                </ul>
              </div>
            </div>
          )}

          {/* Do's & Don'ts Tab */}
          {activeTab === "Do's & Don'ts" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Do's */}
              <div className="bg-[#d4edda] shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-[#db2777] mb-4 flex items-center">
                  <i className="fas fa-check-circle text-green-600 mr-2"></i> Do's – What You Should Do
                </h2>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Change your pad every 4-6 hours, even if it’s not completely soaked</li>
                  <li>Wash your hands thoroughly before and after changing menstrual products</li>
                  <li>Take warm baths or use heating pads to relieve cramps</li>
                  <li>Maintain a balanced diet rich in iron and calcium</li>
                  <li>Stay hydrated by drinking plenty of water</li>
                  <li>Get adequate sleep and rest when your body needs it</li>
                  <li>Exercise regularly, even light activities like walking</li>
                  <li>Track your menstrual cycle to understand your pattern</li>
                  <li>Seek medical advice if you experience severe pain or irregularities</li>
                  <li>Talk openly about periods to reduce stigma and get support</li>
                </ul>
              </div>

              {/* Don'ts */}
              <div className="bg-[#f8d7da] shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-[#db2777] mb-4 flex items-center">
                  <i className="fas fa-times-circle text-red-600 mr-2"></i> Don'ts – What You Should Avoid
                </h2>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Don’t use the same pad for more than 6-8 hours</li>
                  <li>Don’t flush sanitary pads or tampons down the toilet</li>
                  <li>Don’t use scented products or douches in the genital area</li>
                  <li>Don’t ignore severe pain or unusual symptoms</li>
                  <li>Don’t let period shame prevent you from seeking help</li>
                  <li>Don’t use dirty cloth or unsafe materials as pads</li>
                  <li>Don’t skip meals or avoid nutritious foods</li>
                  <li>Don’t completely avoid physical activity unless advised</li>
                  <li>Don’t share personal hygiene products with others</li>
                  <li>Don’t believe myths that periods make you ‘impure’ or ‘dirty’</li>
                </ul>
              </div>
            </div>
          )}

          {/* Myths Tab */}
          {activeTab === 'Myths' && (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#db2777] mb-4">Myth Busting</h2>
              <p className="text-gray-600 mb-4">Common misconceptions about menstruation</p>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-red-600 mb-2 flex items-center">
                    <i className="fas fa-times text-red-600 mr-2"></i> Myths
                  </h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>You can’t exercise during periods</li>
                    <li>Periods sync up when women live together</li>
                    <li>You can’t get pregnant during your period</li>
                    <li>PMS is just “in your head”</li>
                    <li>You shouldn’t wash your hair during periods</li>
                  </ul>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-green-600 mb-2 flex items-center">
                    <i className="fas fa-check text-green-600 mr-2"></i> Facts
                  </h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Light exercise can actually help with cramps</li>
                    <li>Period syncing is not scientifically proven</li>
                    <li>Pregnancy is possible, though less likely</li>
                    <li>PMS symptoms are real and treatable</li>
                    <li>Personal hygiene is important during periods</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === 'Support' && (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Emergency Contacts */}
                <div className="lg:w-1/2">
                  <h2 className="text-xl font-semibold text-[#db2777] mb-4 flex items-center">
                    <i className="fas fa-phone-alt text-[#db2777] mr-2"></i> Emergency Contacts
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-[#f8d7da] border-l-4 border-[#dc3545] p-4 rounded">
                      <p className="font-medium text-gray-800">Medical Emergency</p>
                      <p className="text-gray-600">Call: 999 (National Emergency)</p>
                    </div>
                    <div className="bg-[#d4edda] border-l-4 border-[#28a745] p-4 rounded">
                      <p className="font-medium text-gray-800">Campus Health Center</p>
                      <p className="text-gray-600">Call: +880-XXX-XXXX</p>
                      <p className="text-gray-600">Available: 24/7</p>
                    </div>
                    <div className="bg-[#cce5ff] border-l-4 border-[#007bff] p-4 rounded">
                      <p className="font-medium text-gray-800">Counseling Services</p>
                      <p className="text-gray-600">Call: +880-XXX-XXXX</p>
                      <p className="text-gray-600">Available: Mon-Fri, 9 AM - 5 PM</p>
                    </div>
                    <div className="bg-[#f1d7f8] border-l-4 border-[#db2777] p-4 rounded">
                      <p className="font-medium text-gray-800">Women's Support Helpline</p>
                      <p className="text-gray-600">Call: 10921 (Free)</p>
                      <p className="text-gray-600">Available: 24/7</p>
                    </div>
                  </div>
                </div>

                {/* Frequently Asked Questions */}
                <div className="lg:w-1/2">
                  <h2 className="text-xl font-semibold text-[#db2777] mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-gray-800">Q: Is it normal to have irregular periods?</p>
                      <p className="text-gray-600">
                        A: Some irregularity is normal, especially in the first few years after menarche. However, if you experience significant changes or miss periods for several months, consult a healthcare provider.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Q: How much pain is normal during periods?</p>
                      <p className="text-gray-600">
                        A: Mild to moderate cramping is normal. However, severe pain that interferes with daily activities may indicate an underlying condition and should be evaluated by a doctor.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Q: Can I swim or exercise during my period?</p>
                      <p className="text-gray-600">
                        A: Yes! Physical activity can actually help reduce menstrual symptoms. Use appropriate menstrual products and listen to your body.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Q: When should I see a doctor about my periods?</p>
                      <p className="text-gray-600">
                        A: Consult a healthcare provider if you experience severe pain, heavy bleeding, periods lasting longer than 7 days, or if you miss periods for more than 3 months.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* When to Seek Medical Help */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">When to Seek Medical Help</h2>
                <p className="text-gray-600 mb-4">
                  Don’t hesitate to contact a healthcare provider if you experience any of these symptoms
                </p>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-red-600 mb-2 flex items-center">
                      <i className="fas fa-exclamation-triangle text-red-600 mr-2"></i> Immediate Medical Attention
                    </h3>
                    <ul className="list-disc pl-5 text-gray-600">
                      <li>Heavy abdominal pain that doesn’t improve with pain medication</li>
                      <li>Heavy bleeding (soaking through a pad every hour for several hours)</li>
                      <li>Fever above 101°F (38.3°C) with menstrual symptoms</li>
                      <li>Sudden onset of severe symptoms</li>
                    </ul>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-orange-600 mb-2 flex items-center">
                      <i className="fas fa-exclamation-circle text-orange-600 mr-2"></i> Schedule an Appointment
                    </h3>
                    <ul className="list-disc pl-5 text-gray-600">
                      <li>Periods lasting longer than 7 days</li>
                      <li>Cycles shorter than 21 days or longer than 35 days</li>
                      <li>Missing periods for 3+ months (if not pregnant)</li>
                      <li>Unusual discharge or strong odor</li>
                      <li>Significant changes in your normal pattern</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnPage;