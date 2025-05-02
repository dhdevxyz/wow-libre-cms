import Advertising from "@/components/home/banner";
import Bidding from "@/components/home/bidding";
import ContributionsHome from "@/components/home/contribution";
import Information from "@/components/home/information";
import ServerFeatures from "@/components/home/integration";
import Navbar from "@/components/home/navbar-home/navbar";
import SliderHome from "@/components/home/slider";
import Subscription from "@/components/home/subscription";
import ServerExperience from "@/components/home/us";

const Home = () => {
  return (
    <>
      <Navbar />
      <Advertising />

      <Information />
      <ServerExperience />
      <SliderHome />

      <ServerFeatures />

      <Bidding />
      <ContributionsHome />

      <Subscription />
    </>
  );
};
export default Home;
