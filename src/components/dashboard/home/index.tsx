import {
  FaClipboardList,
  FaGamepad,
  FaGift,
  FaShieldAlt,
  FaSpinner,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import BarChart from "../barchart";
import Card from "../card";
import PieChart from "../pastel";
import PolarAreaChart from "../polarareachart";
import { useEffect, useState } from "react";
import { DashboardMetrics } from "@/model/model";
import { getMetricsServer } from "@/api/dashboard/home";

interface HomeDashboardProps {
  token: string;
  serverId: number;
}

const HomeDashboard: React.FC<HomeDashboardProps> = ({ token, serverId }) => {
  const [metrics, setMetrics] = useState<DashboardMetrics>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);

        const data = await getMetricsServer(serverId, token);
        setMetrics(data);
      } catch (err: any) {
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Card
          title="Total de Usuarios"
          value={metrics?.total_users.toString() || "0"}
          icon={<FaUsers />}
        />
        <Card
          title="Jugadores Conectados"
          value={metrics?.online_users.toString() || "0"}
          icon={<FaGamepad />}
        />
        <Card
          title="Número de Hermandades"
          value={metrics?.total_guilds.toString() || "0"}
          icon={<FaShieldAlt />}
        />
        <Card
          title="Promociones Redimidas"
          value={metrics?.external_registrations.toString() || "0"}
          icon={<FaGift />}
        />
        <Card
          title="Usuarios Registrados en WoWLibre"
          value={metrics?.external_registrations.toString() || "0"}
          icon={<FaClipboardList />}
        />
        <Card
          title="Total de Personajes"
          value={metrics?.character_count.toString() || "0"}
          icon={<FaUserFriends />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {/* Gráfica 1 */}
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <BarChart />
        </div>
        {/* Gráfica 2 */}
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <BarChart />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {/* Gráfica 1 */}
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <PieChart />
        </div>
        {/* Gráfica 2 */}
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <PolarAreaChart />
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
