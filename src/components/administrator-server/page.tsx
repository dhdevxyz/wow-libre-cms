"use client";
import BankDashboard from "@/components/dashboard/bank";
import Header from "@/components/dashboard/header";
import HomeDashboard from "@/components/dashboard/home";
import Sidebar from "@/components/dashboard/sidebard";
import UsersDashboard from "@/components/dashboard/user";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import GuildsDashboard from "../dashboard/guilds";
import PromotionsDashboard from "../dashboard/promotions";
import SettingsServer from "../settings";

const AdministratorServer = () => {
  const [activeOption, setActiveOption] = useState("dashboard");
  const searchParams = useSearchParams();
  const serverId = Number(searchParams.get("id"));
  const option = searchParams.get("activeOption");
  const router = useRouter();
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(true);

  const handleOptionChange = (option: string) => {
    setActiveOption(option);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("activeOption", option);
    searchParams.set("id", serverId.toString());
    router.push(`${window.location.pathname}?${searchParams.toString()}`);
  };

  useEffect(() => {
    if (option) {
      setActiveOption(option || "dashboard");
    }
  }, [option]);

  useEffect(() => {
    if (token && serverId) {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-white mx-auto mb-4" />
        </div>
      </div>
    );
  }

  return (
    <div className=" text-white min-h-screen bg-black">
      {/* Header fijo */}
      <Header />

      {/* Sidebar */}
      <Sidebar onOptionChange={handleOptionChange} />

      {/* Contenido principal */}
      <main className="ml-auto lg:w-[75%] xl:w-[80%] 2xl:w-[85%] bg-black">
        {/* HOME DASHBOARD */}
        {activeOption === "dashboard" && token && serverId && (
          <HomeDashboard token={token} serverId={serverId} />
        )}
        {activeOption === "users" && token && serverId && (
          <UsersDashboard token={token} serverId={serverId} />
        )}
        {activeOption === "promotions" && token && serverId && (
          <PromotionsDashboard />
        )}
        {activeOption === "settings" && token && serverId && (
          <SettingsServer token={token} serverId={serverId} />
        )}
        {activeOption === "bank" && token && serverId && (
          <BankDashboard token={token} serverId={serverId} />
        )}
        {activeOption === "guilds" && <GuildsDashboard />}
      </main>
    </div>
  );
};

export default AdministratorServer;
