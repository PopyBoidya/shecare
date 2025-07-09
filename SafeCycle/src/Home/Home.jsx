import Hero from "../Components/Home/HeroSection/Hero";
import HowWorks from "../Components/Home/HowWorks/HowWorks";
import JoinUs from "../Components/Home/JoinUs/JoinUs";
import OutMission from "../Components/Home/OurMission/OutMission";

const Home = () => {

    return (
        <div>
          <Hero/>
          <OutMission/>
          <HowWorks/>
          <JoinUs/>
        </div>
    );
};

export default Home;