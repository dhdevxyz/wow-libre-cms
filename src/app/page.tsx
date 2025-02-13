import AdIframe from "@/components/adversing";
import NativeBanners from "@/components/adversing/native_banner";
import Advertising from "@/components/home/banner";
import Bidding from "@/components/home/bidding";
import Information from "@/components/home/information";
import InfoIntegrate from "@/components/home/integration";
import Navbar from "@/components/home/navbar-home/navbar";
import SliderHome from "@/components/home/slider";
import Subscription from "@/components/home/subscription";
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
      <InfoIntegrate />
      <Subscription />

      <NativeBanners />
    </>
  );
};
export default Home;
