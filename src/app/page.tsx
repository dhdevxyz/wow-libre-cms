import Advertising from "@/components/home/banner";
import Bidding from "@/components/home/bidding";
import SliderHome from "@/components/home/slider";
import Subscription from "@/components/home/subscription";
import Us from "@/components/home/us";
import Navbar from "@/components/home/navbar-home/navbar";
import Information from "@/components/home/information";

const Home = () => {
  return (
    <>
      <Navbar />
      <Advertising />
      <Information />
      <SliderHome />

      <Bidding />
      <Us />
      <Subscription />
    </>
  );
};
export default Home;
