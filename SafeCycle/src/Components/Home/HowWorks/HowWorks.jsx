
const HowWorks = () => {
    const steps = [
  {
    title: "Submit Request",
    description: "Fill out an anonymous form with your building and location details",
    icon: 1,
  },
  {
    title: "Volunteer Notified",
    description: "Our volunteers receive your request and prepare for delivery",
    icon: 2,
  },
  {
    title: "Discreet Delivery",
    description: "Pads are delivered to your specified location discretely",
    icon: 3,
  },
  {
    title: "Continue Learning",
    description: "Access educational resources and support whenever needed",
    icon: 4,
  },
];
    return (
        <section className="bg-[#f9fafb] py-20">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-[#111827] mb-8 font-inter">
                How SheCare Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {steps.map((step, index) => (
              <div
                key={index}
                className=" p-6"
              >
                <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <h3 className="text-2xl font-bold text-pink-600">{step.icon}</h3>
                </div>
                <h3 className="text-lg font-semibold text-pink-700">
                  {step.title}
                </h3>
                <p className="text-gray-600 mt-2">{step.description}</p>
              </div>
          ))}
        </div>
            </div>
        </section>
    );
};

export default HowWorks;