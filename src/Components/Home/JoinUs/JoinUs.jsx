import { HandHeart } from "lucide-react";
import { Link } from "react-router-dom";

const JoinUs = () => {
    return (
        <section className="bg-[#db2777] py-20">
            <div>
                <h3 className="font-inter text-center text-4xl font-bold text-white">
                    Join Our Community
                </h3>
                <p className="font-inter text-center text-lg md:text-xl text-white mt-5 max-w-2xl mx-auto">
                    Help us create a supportive environment where every woman can manage her menstrual health with confidence and dignity.
                </p>

                <div className="flex justify-center mt-8 gap-4 items-center flex-col md:flex-row flex-wrap">
                    <Link to="/request-pad">
                        <button className="font-inter text-lg font-semibold text-white hover:text-[#db2777] bg-[#db2777] px-6 py-3 rounded-md border hover:border-[#db2777] hover:bg-white transition-all flex items-center gap-2">
                            <HandHeart size={20} />
                            Become a Volunteer
                        </button>
                    </Link>

                    <Link to="/pad-locations">
                        <button className="font-inter text-lg font-semibold text-[#db2777] hover:text-white bg-white border border-[#ffffff] px-6 py-3 rounded-md hover:bg-[#db2777] transition-all">
                            Learn More
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default JoinUs;
