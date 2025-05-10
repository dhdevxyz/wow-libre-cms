import React, { useState, useEffect } from "react";
import LineChart from "../linechart";
import { FaUser } from "react-icons/fa";
import Cookies from "js-cookie";
import {
  enableLoans,
  getCreditLoansData,
  getCreditLoansServer,
} from "@/api/dashboard/bank";
import { BankPlans, CreditLoansUser } from "@/model/model";
import { getPlans } from "@/api/bank";
import { useUserContext } from "@/context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

interface BankDasboardProps {
  token: string;
  serverId: number;
}

const BankDashboard: React.FC<BankDasboardProps> = ({ token, serverId }) => {
  const [users, setUsers] = useState<CreditLoansUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [loanApproval, setLoanApproval] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [remainingLoans, setRemainingLoans] = useState<number>(0);
  const { user } = useUserContext();
  const [bankPlans, setBankPlans] = useState<BankPlans[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const router = useRouter();

  const [filteredData, setFilteredData] = useState<any>(null);

  useEffect(() => {
    setUsers([]);
    setPage(0);
    loadMoreUsers();
  }, []);

  const loadMoreUsers = async () => {
    if (isLoading || !serverId || !token) return;
    setIsLoading(true);

    try {
      const [usersResponse, plansResponse, creditLoansData] = await Promise.all(
        [
          getCreditLoansServer(
            10,
            page,
            serverId,
            filter,
            sortOrder === "asc" ? true : false,
            token
          ),
          getPlans(user.language),
          getCreditLoansData(serverId, token),
        ]
      );
      setBankPlans(plansResponse);
      setFilteredData(creditLoansData);

      if (usersResponse && usersResponse.users) {
        setUsers((prevUsers) => [...prevUsers, ...usersResponse.users]);
        setRemainingLoans(
          usersResponse.loans === null ? 0 : usersResponse.loans
        );
        if (usersResponse.users.length > 10) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Ha ocurrido un error innesperado",
        text: `${error.message}`,
        color: "white",
        background: "#0B1218",
        willClose: () => {
          router.push("/realms");
        },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/realms");
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateLoansEnable = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await enableLoans(Number(loanApproval), "BANK", serverId, token || "");

      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("id", serverId.toString());
      searchParams.set("activeOption", "bank");
      router.push(`${window.location.pathname}?${searchParams.toString()}`);
      setRemainingLoans(Number(loanApproval));

      Swal.fire({
        icon: "success",
        title: "¡Créditos Actualizados!",
        html: `
          <p style="font-size: 16px; margin-bottom: 10px;">
            La cantidad de créditos ha sido aprobada y actualizada con éxito.
          </p>
        `,
        confirmButtonColor: "#2563eb",
        confirmButtonText: "Entendido",
        timer: 4500,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Opss!",
        text: `${error.message}`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      loadMoreUsers();
    }
  };

  useEffect(() => {
    setUsers([]);
    setPage(0);
    loadMoreUsers();
  }, [filter, sortOrder]);

  return (
    <div className="bg-black text-white p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-emerald-400">
        Dashboard de Préstamos y Pagos
      </h1>
      <p className="mb-6 text-1xl text-gray-300">
        Este dashboard muestra la relación entre los préstamos aprobados y los
        pagos realizados en los últimos meses, junto con un listado de usuarios.
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Formulario de aprobación */}
        <div className="lg:w-1/3 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-emerald-400">
            Aprobar Préstamos
          </h2>
          <p className="mb-2 text-gray-300">
            <strong>Préstamos Restantes:</strong> {remainingLoans}
          </p>
          <div>
            <strong className="text-gray-200">Planes Disponibles:</strong>
            <div className="space-y-3 mt-2">
              {bankPlans.map((plan, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-700 p-3 rounded-lg shadow-md"
                >
                  <FaUser className="text-emerald-400 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-200">{plan.name}</p>
                    <p className="text-sm text-gray-400">{plan.description}</p>
                    <p className="text-sm text-emerald-300">
                      {plan.price} - {plan.frecuency}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={(e) => updateLoansEnable(e)} className="mt-4">
            <label htmlFor="loanApproval" className="block mb-2 text-gray-300">
              Cantidad de préstamos a disponibilizar:
            </label>
            <input
              id="loanApproval"
              type="number"
              value={loanApproval}
              onChange={(e) => setLoanApproval(e.target.value)}
              className="w-full px-3 py-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              min="0"
              max="200"
            />
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-white py-2 rounded-lg"
            >
              Aprobar
            </button>
          </form>
        </div>

        {/* Gráfica */}
        <div className="lg:w-1/3">
          <LineChart filteredData={filteredData} />
        </div>

        {/* Lista de usuarios */}
        <div className="lg:w-1/3 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-emerald-400">
            Usuarios
          </h2>

          {/* Filtros */}
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg ${
                filter === "all" ? "bg-emerald-500" : "bg-gray-700"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter("DEBTOR")}
              className={`px-4 py-2 rounded-lg ${
                filter === "DEBTOR" ? "bg-rose-500" : "bg-gray-700"
              }`}
            >
              Deudores
            </button>
            <button
              onClick={() => setFilter("NON_DEBTOR")}
              className={`px-4 py-2 rounded-lg ${
                filter === "NON_DEBTOR" ? "bg-cyan-500" : "bg-gray-700"
              }`}
            >
              No Deudores
            </button>
          </div>

          {/* Ordenar por fecha */}
          <div className="mb-4">
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="desc">Más Reciente</option>
              <option value="asc">Más Viejo</option>
            </select>
          </div>

          {/* Lista de usuarios */}
          <div
            className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700"
            onScroll={handleScroll}
          >
            {users.map((user, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-700 p-4 mb-4 rounded-lg shadow-md"
              >
                <FaUser className="text-emerald-400 mr-4" />
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold text-lg text-gray-200">
                      {user.id} - {user.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      Solicitud: {user.application_date}
                    </p>
                  </div>

                  {/* Monto Prestado */}
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-300">Monto Prestado:</p>
                    <p className="text-sm text-emerald-400">${user.amount}</p>
                  </div>

                  {/* Deuda */}
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-300">Estado de pago:</p>
                    <p
                      className={`text-sm ${
                        user.debtor ? "text-rose-500" : "text-emerald-400"
                      }`}
                    >
                      {user.debtor ? "Debe" : "No debe"}
                    </p>
                  </div>

                  {/* Fecha de pago */}
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-300">Fecha de pago:</p>
                    <p className="text-sm text-gray-400">{user.payment_date}</p>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="text-center text-gray-400 mt-4">Cargando...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDashboard;
