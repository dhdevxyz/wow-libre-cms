import { getMetricsServer } from "@/api/dashboard/home";
import { DashboardMetrics, RangeLevelDto } from "@/model/model";
import { useEffect, useState } from "react";
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

interface HomeDashboardProps {
  token: string;
  serverId: number;
}

const HomeDashboard: React.FC<HomeDashboardProps> = ({ token, serverId }) => {
  const [metrics, setMetrics] = useState<DashboardMetrics>();
  const [loading, setLoading] = useState(true);
  const [factions, setFactions] = useState<number[]>([]);
  const [charactersOnline, setCharactersOnline] = useState<number[]>([]);
  const [redeemedPromotions, setRedeemedPromotions] = useState<number[]>([]);
  const [levelChartData, setLevelChartData] = useState({
    labels: [] as string[],
    dataValues: [] as number[],
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await getMetricsServer(serverId, token);
        setMetrics(data);
        setFactions([data.hordas, data.alianzas]);
        setCharactersOnline([
          data.online_users,
          data.total_users - data.online_users,
        ]);
        setRedeemedPromotions([
          data.redeemed_promotions,
          data.total_users - data.redeemed_promotions,
        ]);
        const labels = data.range_level.map(
          (range: RangeLevelDto) => `Lvl ${range.level_range}`
        );
        const dataValues = data.range_level.map(
          (range: RangeLevelDto) => range.user_count
        );
        setLevelChartData({ labels, dataValues });
      } catch (err: any) {
        setFactions([0, 0]);
        setCharactersOnline([0, 0]);
        setRedeemedPromotions([0, 0]);
        setLevelChartData({ labels: [], dataValues: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [serverId, token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-white mx-auto mb-4" />
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-black">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
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
          value={metrics?.redeemed_promotions.toString() || "0"}
          icon={<FaGift />}
        />
        <Card
          title="Usuarios Registrados por WoWLibre"
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
        <div className="bg-gray-900 rounded-lg shadow m-6 p-6">
          <BarChart
            labels={["Horda", "Alianza"]}
            dataValues={factions}
            backgroundColors={["#FF4C4C", "#4C9AFF"]}
            legendPosition={"top"}
            title={"Distribución de Facciones"}
          />
        </div>
        <div className="bg-gray-900 rounded-lg shadow m-6 p-6">
          <BarChart
            labels={["Online", "Offline"]}
            dataValues={charactersOnline}
            backgroundColors={["#32CD32", "#a855f7"]}
            legendPosition={"top"}
            title={"Distribución de conexiones"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 pb-10">
        <div className="bg-gray-900 rounded-lg shadow m-6">
          <PieChart
            labels={["Promociones", "Pendientes"]}
            dataValues={redeemedPromotions}
            backgroundColors={["#FFD700", "#2563eb"]}
            legendPosition={"bottom"}
            title={"Distribucion de promociones"}
            legendColor={"#ffffff"}
          />
        </div>
        <div className="bg-gray-900 rounded-lg shadow m-6">
          <PolarAreaChart
            labels={levelChartData.labels}
            dataValues={levelChartData.dataValues}
            backgroundColors={[
              "#2563eb",
              "#f59e0b",
              "#22c55e",
              "#ef4444",
              "#a855f7",
              "#14b8a6",
              "#f87171",
              "#fbbf24",
            ]}
            legendPosition="bottom"
            title="Rango de  niveles"
            legendColor="#ffffff"
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
