"use client";
import React, { useState, useEffect } from "react";
import { getCoints } from "@/api/machine";
import { claimMachine } from "@/api/machine";
import { MachineDto } from "@/model/model";
import WowheadTooltip from "@/utils/wowhead";

// Tipos de símbolos
type SlotItem = string;

// Opciones temáticas de WoW
const slotOptions: SlotItem[] = [
  "⚔️", // Espada
  "🛡️", // Escudo
  "💎", // Gema
  "🧙", // Mago
  "🐉", // Dragón
  "🏹", // Arco
  "🔥", // Fuego
];

const winningSymbols = ["⚔️", "🛡️", "💎"]; // Símbolos posibles para ganar
const spinCost = 1; // Costo por giro
const winReward = 50; // Recompensa al ganar

interface MachineProps {
  serverId: number;
  characterId: number;
  token: string;
  accountId: number;
  t: (key: string, options?: any) => string;
  language: string;
}

const SlotMachine: React.FC<MachineProps> = ({
  serverId,
  characterId,
  accountId,
  token,
  t,
  language,
}) => {
  const [slots, setSlots] = useState<SlotItem[]>(["⚔️", "⚔️", "⚔️"]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [audio] = useState(new Audio("/sound/slot.mp3"));
  const [winAudio] = useState(new Audio("/sound/slot_win.mp3"));
  const [lossAudio] = useState(new Audio("/sound/slot_loss.mp3"));
  const [modalData, setModalData] = useState<MachineDto | null>(null);
  const [isToggled, setIsToggled] = useState(false); // Estado del toggle

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const coins = await getCoints(token, serverId);
        setBalance(coins.coins);
        console.log("Saldo inicial:", coins.coins);
      } catch (error) {
        console.error("Error al obtener el saldo:", error);
      }
    };

    fetchBalance();
  }, [token, serverId]);

  const getRandomSlot = () =>
    slotOptions[Math.floor(Math.random() * slotOptions.length)];

  const spin = async () => {
    if (isSpinning || balance < spinCost) return;

    setIsSpinning(true);
    setResult(null);
    setBalance((prev) => prev - spinCost);
    audio.play();

    const spinDuration = 3000;
    const interval = 100;

    let spins = 0;
    const spinInterval = setInterval(async () => {
      setSlots([getRandomSlot(), getRandomSlot(), getRandomSlot()]);
      spins += interval;
      if (spins >= spinDuration) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        await calculateResult();
      }
    }, interval);
  };

  const calculateResult = async () => {
    try {
      const result: MachineDto = await claimMachine(
        serverId,
        accountId,
        characterId,
        token,
        language
      );

      if (result.winner) {
        const winningSymbol =
          winningSymbols[Math.floor(Math.random() * winningSymbols.length)];

        setSlots([winningSymbol, winningSymbol, winningSymbol]);
        setResult("🎉 ¡Has ganado! 🎉");
        setModalData(result);
        setShowModal(true);
        winAudio.play();
      } else {
        let slot1 = getRandomSlot();
        let slot2 = getRandomSlot();
        let slot3 = getRandomSlot();

        while (slot1 === slot2 && slot2 === slot3) {
          slot3 = getRandomSlot();
        }

        setSlots([slot1, slot2, slot3]);
        setResult("😢 ¡Mejor suerte la próxima vez!");
        setShowModal(false);
        lossAudio.play();
      }
    } catch (error) {
      console.error("Error al calcular el resultado:", error);
      setResult(
        "⚠️ Hubo un error al determinar el resultado. Intenta de nuevo más tarde."
      );
    } finally {
      setIsToggled(false); // Restablece el toggle a 'false' después de cada ejecución
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleToggleChange = () => {
    if (!isSpinning && balance >= spinCost) {
      setIsToggled(!isToggled);
      if (!isToggled) {
        spin(); // Ejecuta el slot si se activa
      }
    }
  };

  return (
    <div className="w-full h-full p-4 text-white flex flex-col justify-center items-center">
      <div className="grid grid-rows-[auto,1fr] grid-cols-1 md:grid-cols-2 md:grid-rows-[auto] gap-6 w-full max-w-9xl">
        {/* Máquina tragamonedas: ocupa toda la fila superior */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 p-4 rounded-xl shadow-lg col-span-1 md:col-span-2">
          <p className="text-3xl font-semibold text-yellow-300 mb-8">
            Saldo: ${balance}
          </p>

          <div className="flex items-center justify-center w-full mb-6">
            <div className="grid grid-cols-3 gap-4 text-8xl w-full max-w-sm">
              {slots.map((slot, index) => (
                <div
                  key={index}
                  className="w-32 h-32 flex items-center justify-center bg-gradient-to-r from-teal-400 to-teal-600 border-4 border-yellow-300 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  {slot}
                </div>
              ))}
            </div>
            <div className="ml-6 flex justify-center items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onChange={handleToggleChange}
                  checked={isToggled} // Asegura que el toggle refleje el estado
                />
                <div className="relative w-12 h-24 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-y-full rtl:peer-checked:after:-translate-y-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-10 after:w-10 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {result && (
            <p className="mt-6 text-2xl font-semibold text-lime-400">
              {result}
            </p>
          )}
        </div>

        {/* Tarjetas de información o promociones */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-700 to-purple-800 p-8 rounded-xl shadow-2xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <h1 className="text-4xl font-extrabold text-yellow-300 mb-6 text-center">
            ¡Envía tu comprobante y recibe tus créditos!
          </h1>
          <p className="text-lg text-white mb-8 text-center">
            Envía el comprobante de tu pago y recibirás créditos adicionales
            para seguir disfrutando de la máquina tragamonedas. ¡No pierdas la
            oportunidad de obtener más recompensas y mejorar tu experiencia de
            juego!
          </p>

          {/* Información de costo */}
          <p className="text-xl text-white font-semibold mb-6 text-center">
            ¡Solo 10 dólares por 300 tiradas! Obtén más créditos y aumenta tus
            probabilidades de ganar.
          </p>

          <div className="flex flex-col items-center space-y-4 w-full max-w-md">
            <a
              target="_blank"
              href="https://checkout.bold.co/payment/LNK_9BQUUZNAYD"
              className="w-full"
            >
              <button className="w-full px-6 py-3 text-lg font-semibold bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                Comprar Créditos
              </button>
            </a>

            <a target="_blank" href="https://wa.link/8v1hol" className="w-full">
              <button className="w-full px-6 py-3 text-lg font-semibold bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                Enviar Comprobante
              </button>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-4">
            Probabilidades de Ganar
          </h1>
          <ul className="text-lg text-white mb-6 text-left w-full">
            <li className="flex justify-between py-2 border-b border-gray-300">
              <span className="font-semibold">Items:</span>
              <span className="font-bold">9%</span>
            </li>
            <li className="flex justify-between py-2 border-b border-gray-300">
              <span className="font-semibold">Niveles:</span>
              <span className="font-bold">1%</span>
            </li>
            <li className="flex justify-between py-2 border-b border-gray-300">
              <span className="font-semibold">Monturas:</span>
              <span className="font-bold">8%</span>
            </li>
            <li className="flex justify-between py-2">
              <span className="font-semibold">Oro:</span>
              <span className="font-bold">4%</span>
            </li>
          </ul>
          <a
            target="_blank"
            href="https://t.me/wowlibreservers"
            className="w-full"
          >
            <button className="w-full px-6 py-3 text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
              Mas información
            </button>
          </a>
        </div>
      </div>

      {showModal && modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gradient-to-r from-purple-700 to-blue-800 p-10 rounded-2xl shadow-2xl text-center relative w-full max-w-lg">
            <h2 className="text-4xl font-bold text-yellow-400 mb-4 shadow-lg rounded-md bg-opacity-20 px-4 py-2 inline-block">
              ¡Felicidades, Campeón de Azeroth!
            </h2>
            <div className="flex flex-col items-center mb-6">
              <img
                src={modalData.logo}
                alt={`Logo de ${modalData.name}`}
                className="w-48 h-48 rounded-full border-4 border-yellow-400 mb-4 shadow-lg transform scale-105"
              />
              <a
                className="text-2xl font-semibold text-white mb-2 q2"
                href={`https://www.wowhead.com/item=${modalData.name}`}
                data-game="wow"
                data-type="item"
                data-wh-icon-added="true"
              >
                Detalle del item
              </a>
              <p className="text-lg text-gray-300 mb-2">{modalData.type}</p>
              <p className="text-lg text-white italic mb-4">
                {modalData.message}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="px-6 py-3 text-lg font-bold bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
            >
              Cerrar
            </button>
          </div>
          <WowheadTooltip />
        </div>
      )}
    </div>
  );
};

export default SlotMachine;
