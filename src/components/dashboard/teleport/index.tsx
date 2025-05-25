import { create, deleteTeleport, getTeleports } from "@/api/teleports";
import LoadingSpinnerCentral from "@/components/utilities/loading-spinner-v2";
import { Teleport } from "@/model/teleport";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface TeleportDashboardProps {
  token: string;
  realmId: number;
}

const TeleportDashboard: React.FC<TeleportDashboardProps> = ({
  token,
  realmId,
}) => {
  const [loading, setLoading] = useState(true);
  const [teleports, setTeleports] = useState<Teleport[]>([]);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const data = await getTeleports(0, realmId, token);
      setTeleports(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los teleports.",
      });
    } finally {
      setLoading(false);
    }
  };
  const [form, setForm] = useState<Omit<Teleport, "id">>({
    name: "",
    position_x: 2,
    position_y: 2,
    position_z: 2,
    img_url: "",
    map: 0,
    orientation: 0,
    zone: 2,
    area: 2,
    faction: "neutral",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: [
        "position_x",
        "position_y",
        "position_z",
        "map",
        "orientation",
        "zone",
        "area",
      ].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await create(
        form.name,
        form.img_url,
        form.position_x,
        form.position_y,
        form.position_z,
        form.map,
        form.orientation,
        form.zone,
        realmId,
        form.area,
        form.faction,
        token
      );

      Swal.fire({
        icon: "success",
        title: "Teleport Creado",
        text: `Teleport  creado exitosamente.`,
      });

      fetchData();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${err.message}`,
      });
    }
  };
  const handleDelete = async (teleportId: number) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el teleport permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteTeleport(teleportId, realmId, token);
        Swal.fire("Eliminado", "El teleport ha sido eliminado.", "success");
        fetchData(); // Recarga los datos
      } catch (err) {
        Swal.fire("Error", "No se pudo eliminar el teleport.", "error");
      }
    }
  };

  if (loading) {
    return <LoadingSpinnerCentral />;
  }

  return (
    <div className="min-h-screen relative text-gray-200 p-8 bg-gray-900">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage:
            "url('https://images6.alphacoders.com/620/thumb-1920-620398.jpg')",
        }}
      />
      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black opacity-60" />

      {/* Contenido principal */}
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[800px] bg-gray-900 border border-transparent rounded-xl shadow-xl p-8"
            style={{
              borderImage: "linear-gradient(to right, #6366f1, #06b6d4)",
              borderImageSlice: 1,
            }}
          >
            <h2 className="text-3xl font-bold text-indigo-400 mb-6">
              Agregar Teleport
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Nombre", name: "name", type: "text" },
                { label: "Posición X", name: "position_x", type: "number" },
                { label: "Posición Y", name: "position_y", type: "number" },
                { label: "Posición Z", name: "position_z", type: "number" },
                { label: "URL de Imagen", name: "img_url", type: "text" },
                { label: "Mapa", name: "map", type: "number" },
                { label: "Orientación", name: "orientation", type: "number" },
                { label: "Zona", name: "zone", type: "number" },
                { label: "Área", name: "area", type: "number" },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex flex-col">
                  <label className="mb-1 font-semibold">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={form[name as keyof typeof form]}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-emerald-400 outline-none"
                    required
                  />
                </div>
              ))}

              <div className="col-span-2">
                <label className="block mb-1 font-semibold">Facción</label>
                <select
                  name="faction"
                  value={form.faction}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-emerald-400"
                >
                  <option value="ALL">Neutral</option>
                  <option value="HORDE">Horda</option>
                  <option value="ALLIANCE">Alianza</option>
                </select>
              </div>

              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-indigo-500 hover:bg-indigo-600 font-semibold py-3 rounded shadow-md focus:ring-2 focus:ring-indigo-400 transition"
                >
                  Agregar Teleport
                </button>
              </div>
            </div>
          </form>

          {/* Listado */}
          <div
            className="bg-gray-900 border border-transparent rounded-xl shadow-xl p-8 space-y-4 overflow-y-auto max-h-[80vh] scrollbar-hide"
            style={{
              borderImage: "linear-gradient(to right, #06b6d4, #6366f1)",
              borderImageSlice: 1,
            }}
          >
            <h2 className="text-2xl font-bold text-cyan-400">
              Listado de Teleports
            </h2>

            {teleports.length === 0 ? (
              <p className="text-gray-400">No hay teleporters añadidos.</p>
            ) : (
              teleports.map((tp) => (
                <div
                  key={tp.id}
                  className="bg-gray-800 rounded-md p-4 border border-gray-700 shadow-sm space-y-2 "
                >
                  <p>
                    <span className="font-semibold text-indigo-300">
                      Nombre:
                    </span>{" "}
                    {tp.name}
                  </p>
                  <p>
                    <span className="font-semibold text-indigo-300">
                      Coordenadas:
                    </span>{" "}
                    X: {tp.position_x}, Y: {tp.position_y}, Z: {tp.position_z}
                  </p>
                  <p>
                    <span className="font-semibold text-indigo-300">Mapa:</span>{" "}
                    {tp.map}
                  </p>
                  <p>
                    <span className="font-semibold text-indigo-300">
                      Orientación:
                    </span>{" "}
                    {tp.orientation}
                  </p>
                  <p>
                    <span className="font-semibold text-indigo-300">Zona:</span>{" "}
                    {tp.zone} | <span className="font-semibold">Área:</span>{" "}
                    {tp.area}
                  </p>
                  <p>
                    <span className="font-semibold text-indigo-300">
                      Facción:
                    </span>{" "}
                    {tp.faction}
                  </p>
                  {tp.img_url && (
                    <img
                      src={tp.img_url}
                      alt={`Imagen de ${tp.name}`}
                      className="mt-2 w-full max-h-52 object-cover rounded-md border border-gray-600"
                    />
                  )}
                  <button
                    onClick={() => handleDelete(tp.id)}
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded shadow-md transition"
                  >
                    Eliminar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeleportDashboard;
