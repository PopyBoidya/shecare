import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="bg-[#fbf5fe] h-[50vh] py-28 flex flex-col items-center justify-center">
           <h1 className="font-inter text-center text-4xl lg:text-6xl  font-bold text-[#111827]">Empowering Women, <span className="text-[#db2777] ">Every Cycle</span> </h1> 
           <p className="font-inter text-center text-lg md:text-xl text-gray-700 mt-5 max-w-2xl mx-auto">
            Safe Cycle provides anonymous access to sanitary pads for female students, ensuring dignity, comfort, and uninterrupted education during menstruation.
           </p>
           <div className="flex justify-center mt-8">
            <Link to="/request-pad">
            <button>
                <span className="font-inter text-lg font-semibold text-white hover:text-[#db2777] bg-[#db2777] px-6 py-3 rounded-md border hover:border-[#db2777] hover:bg-white transition-all mt-5">Request a Pad</span>
            </button>
            </Link>
            <Link to="/pad-locations">
            <button>
                <span className="font-inter text-lg font-semibold text-[#db2777] hover:text-white bg-white border border-[#db2777] px-6 py-3 rounded-md hover:bg-[#db2777] transition-all mt-5 ml-4">Check Availability</span>
            </button>
            </Link>
           </div>
        </section>
    );
};

export default Hero;