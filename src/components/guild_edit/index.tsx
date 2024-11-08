import React, { useState } from "react";

interface EditGuildModalProps {
  isPublic: boolean;
  isMultifactorEnabled: boolean;
  discordLink: string;
  onSave: (newSettings: {
    isPublic: boolean;
    isMultifactorEnabled: boolean;
    discordLink: string;
  }) => void;
}

const EditGuildModal: React.FC<EditGuildModalProps> = ({
  isPublic,
  isMultifactorEnabled,
  discordLink,
  onSave,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [publicAccess, setPublicAccess] = useState(isPublic);
  const [multifactor, setMultifactor] = useState(isMultifactorEnabled);
  const [discordURL, setDiscordURL] = useState(discordLink);

  const handleSave = () => {
    onSave({
      isPublic: publicAccess,
      isMultifactorEnabled: multifactor,
      discordLink: discordURL,
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <button
        className="px-6 py-3 bg-blue-400 hover:bg-blue-600 rounded-lg text-white font-semibold mb-4 mr-2"
        onClick={() => setIsOpen(true)}
      >
        Editar
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg w-11/12 max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              Editar Configuración de la Guild
            </h2>

            {/* Selector Público o Privado */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Visibilidad</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-400">
                  Privado
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={publicAccess}
                    onChange={() => setPublicAccess(!publicAccess)}
                    className="sr-only"
                  />
                  <div
                    className={`w-14 h-7 rounded-full transition-colors ${
                      publicAccess ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>
                  <span
                    className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform transform ${
                      publicAccess ? "translate-x-7" : ""
                    }`}
                  ></span>
                </label>
                <span className="text-sm font-semibold text-gray-400">
                  Público
                </span>
              </div>
            </div>

            {/* Selector de Multifactor */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">
                Habilitar multifaccion
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={multifactor}
                  onChange={() => setMultifactor(!multifactor)}
                  className="sr-only"
                />
                <div
                  className={`w-14 h-7 rounded-full transition-colors ${
                    multifactor ? "bg-blue-600" : "bg-gray-300"
                  }`}
                ></div>
                <span
                  className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform transform ${
                    multifactor ? "translate-x-7" : ""
                  }`}
                ></span>
              </label>
            </div>

            {/* Campo de texto para Discord */}
            <div className="mb-4">
              <label className="text-lg font-semibold mb-2 block">
                Enlace de Discord
              </label>
              <input
                type="text"
                value={discordURL}
                onChange={(e) => setDiscordURL(e.target.value)}
                placeholder="https://discord.gg/tu-enlace"
                className="w-full p-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg mr-2"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
                onClick={handleSave}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditGuildModal;
