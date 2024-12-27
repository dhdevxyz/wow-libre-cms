"use client";
import BankDashboard from "@/components/dashboard/bank";
import Card from "@/components/dashboard/card";
import Header from "@/components/dashboard/header";
import HomeDashboard from "@/components/dashboard/home";
import Sidebar from "@/components/dashboard/sidebard";
import UsersDashboard from "@/components/dashboard/user";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChartBar, FaCog, FaSpinner, FaUser } from "react-icons/fa";

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
    <div className="flex">
      {/* Header */}
      <Header />

      {/* Sidebar */}
      <div className="fixed top-16 left-0 w-72 h-full z-10">
        <Sidebar onOptionChange={handleOptionChange} />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 bg-gradient-to-b from-gray-800 to-gray-900 ml-72 mt-16 p-10 pt-20">
        {activeOption === "dashboard" && token && serverId && (
          <HomeDashboard token={token} serverId={serverId} />
        )}
        {activeOption === "settings" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card title="Usuarios Activos" value="120" icon={<FaUser />} />
              <Card
                title="Ventas Mensuales"
                value="$4,500"
                icon={<FaChartBar />}
              />
              <Card title="Ajustes" value="12" icon={<FaCog />} />
            </div>
          </>
        )}
        {activeOption === "userList" && token && serverId && (
          <UsersDashboard token={token} serverId={serverId} />
        )}
        {activeOption === "support" && (
          <div>
            <h2 className="text-white">Soporte</h2>
            {/* Agregar contenido de soporte aquí */}
          </div>
        )}
        {activeOption === "bank" && <BankDashboard />}
      </div>
    </div>
  );
};

export default AdministratorServer;
