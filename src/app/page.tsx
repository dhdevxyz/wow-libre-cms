import Advertising from "@/components/home/banner";
import Bidding from "@/components/home/bidding";
import DownloadGame from "@/components/home/contribution";
import ServerFeatures from "@/components/home/integration";
import Navbar from "@/components/home/navbar-home/navbar";
import RealmsHome from "@/components/home/realms";
import SliderHome from "@/components/home/slider";
import Subscription from "@/components/home/subscription";
import WelcomeHome from "@/components/home/welcome";

const Home = () => {
  return (
    <>
      <Navbar />
      <Advertising />

      <WelcomeHome />
      <RealmsHome />
      <SliderHome />
      <ServerFeatures />

      <Bidding />
      <DownloadGame />

      <Subscription />
    </>
  );
};
export default Home;
