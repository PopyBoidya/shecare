import { ShieldCheck, MapPin, BookOpenCheck } from "lucide-react";

const OutMission = () => {

    const iconMap = {
        ShieldCheck: <ShieldCheck className="w-12 h-12 text-pink-600" />,
        MapPin: <MapPin className="w-12 h-12 text-pink-600" />,
        BookOpenCheck: <BookOpenCheck className="w-12 h-12 text-pink-600" />,
    };

    const features = [
        {
            title: "Anonymous & Safe",
            description: "Request sanitary pads without revealing your identity. Your privacy and dignity are our top priorities.",
            icon: "ShieldCheck",
        },
        {
            title: "Campus-Wide Access",
            description: "Available across all campus buildings and restrooms. Check real-time availability and request delivery.",
            icon: "MapPin",
        },
        {
            title: "Education & Support",
            description: "Access comprehensive menstrual health education, tips, and support resources in your preferred language.",
            icon: "BookOpenCheck",
        }
    ];
    return (
        <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#111827] mb-8 font-inter">
                Our Mission
            </h2>
            <p className="text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto mb-4 font-inter">
                Breaking the stigma around menstruation and ensuring every female student has access to essential menstrual hygiene products without barriers.
            </p>
            <div className="grid md:grid-cols-3 gap-6 py-10">
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col p-6 border items-center text-center rounded-xl bg-white shadow hover:shadow-md transition gap-5">
                        <h2 >{iconMap[feature.icon]}</h2>
                        <h3 className="text-2xl md:text-xl lg:text-2xl font-semibold leading-none tracking-tight text-[#020817]">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default OutMission;