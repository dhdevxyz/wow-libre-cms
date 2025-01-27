import Advertising from "@/components/home/banner";
import Bidding from "@/components/home/bidding";
import SliderHome from "@/components/home/slider";
import Subscription from "@/components/home/subscription";
import Navbar from "@/components/home/navbar-home/navbar";
import Information from "@/components/home/information";
import AdIframe from "@/components/adversing";
import ServerExperience from "@/components/home/us";

const Home = () => {
  return (
    <>
      <Navbar />
      <Advertising />
      <AdIframe />

      <Information />
      <ServerExperience />
      <SliderHome />

      <Bidding />

      <Subscription />
    </>
  );
};
export default Home;
