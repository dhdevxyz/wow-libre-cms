"use client";
import React, { useState, useEffect } from "react";
import { getCoints } from "@/api/machine";
import { claimMachine } from "@/api/machine";
import { MachineDto } from "@/model/model";

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
  const [balance, setBalance] = useState<number>(0); // Saldo inicial como 0
  const [showModal, setShowModal] = useState(false);
  const [audio] = useState(new Audio("/sound/slot.mp3")); // Ruta al archivo de sonido de giro
  const [winAudio] = useState(new Audio("/sound/slot_win.mp3")); // Ruta al archivo de sonido de victoria
  const [lossAudio] = useState(new Audio("/sound/slot_loss.mp3")); // Ruta al archivo de sonido de pérdida
  const [modalData, setModalData] = useState<MachineDto | null>(null);

  // Cargar el saldo inicial al montar el componente
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const coins = await getCoints(token, serverId);
        setBalance(coins.coins); // Asumiendo que la propiedad que contiene el saldo es `coins`
        console.log("Saldo inicial:", coins.coins);
      } catch (error) {
        console.error("Error al obtener el saldo:", error);
      }
    };

    fetchBalance();
  }, [token, serverId]); // Se ejecuta cuando `token` o `serverId` cambian

  // Función para obtener un símbolo aleatorio de los rodillos
  const getRandomSlot = () =>
    slotOptions[Math.floor(Math.random() * slotOptions.length)];

  // Función para manejar el giro de la tragamonedas
  const spin = async () => {
    if (isSpinning || balance < spinCost) return;

    setIsSpinning(true);
    setResult(null);
    setBalance((prev) => prev - spinCost); // Reducir saldo por giro

    audio.play(); // Reproducir el sonido de slots

    const spinDuration = 3000; // Duración del giro
    const interval = 100;

    let spins = 0;
    const spinInterval = setInterval(async () => {
      // Marca el `setInterval` como `async` para permitir el uso de `await`
      setSlots([getRandomSlot(), getRandomSlot(), getRandomSlot()]);
      spins += interval;
      if (spins >= spinDuration) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        await calculateResult(); // Llamada a `calculateResult` que es asíncrona
      }
    }, interval);
  };

  // Calcular el resultado del giro
  const calculateResult = async () => {
    try {
      // Llamada a la API para determinar si el jugador ha ganado
      const result: MachineDto = await claimMachine(
        serverId,
        accountId,
        characterId,
        token,
        language
      );

      if (result.winner) {
        // Si la respuesta indica que el jugador ha ganado, configura los slots y el modal
        const winningSymbol =
          winningSymbols[Math.floor(Math.random() * winningSymbols.length)];
        setSlots([winningSymbol, winningSymbol, winningSymbol]); // Mostrar tres símbolos iguales
        setResult("🎉 ¡Has ganado! 🎉");
        setModalData(result);
        setShowModal(true);
        winAudio.play(); // Reproducir sonido de victoria
      } else {
        // Si el jugador no ha ganado, muestra los símbolos al azar y el mensaje de pérdida
        setSlots([getRandomSlot(), getRandomSlot(), getRandomSlot()]);
        setResult("😢 ¡Mejor suerte la próxima vez!");
        setShowModal(false); // Cerrar modal si no se ganó
        lossAudio.play(); // Reproducir sonido de pérdida
      }
    } catch (error) {
      console.error("Error al calcular el resultado:", error);
      setResult(
        "⚠️ Hubo un error al determinar el resultado. Intenta de nuevo más tarde."
      );
    }
  };

  // Cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full h-full p-6 text-white flex flex-col justify-center items-center">
      <h2>
        Por favor antes de jugar en la ruleta por favor dentro del juego
        ejecuten el comando .save para guardar los niveles actuales de su
        personaje.
      </h2>
      <p className="text-3xl font-semibold mb-8">Saldo: ${balance}</p>

      <div className="grid grid-cols-3 gap-4 mb-6 text-8xl w-full max-w-sm">
        {slots.map((slot, index) => (
          <div
            key={index}
            className="w-32 h-32 flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-4 border-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            {slot}
          </div>
        ))}
      </div>

      <button
        onClick={spin}
        disabled={isSpinning || balance < spinCost}
        className={`px-6 py-3 text-2xl rounded-lg font-bold transition-all ${
          isSpinning || balance < spinCost
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800"
        }`}
      >
        {isSpinning ? "Girando..." : "¡Girar!"}
      </button>

      {result && <p className="mt-6 text-2xl font-semibold">{result}</p>}

      {/* Modal de Ganador */}
      {showModal && modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gradient-to-r from-purple-800 to-blue-900 p-10 rounded-2xl shadow-2xl text-center relative w-full max-w-lg">
            <h2 className="text-4xl font-bold text-yellow-400 mb-4 shadow-lg rounded-md bg-opacity-20 px-4 py-2 inline-block">
              ¡Felicidades, Campeón de Azeroth!
            </h2>
            <div className="flex flex-col items-center mb-6">
              <img
                src={modalData.logo}
                alt={`Logo de ${modalData.name}`}
                className="w-48 h-48 rounded-full border-4 border-yellow-400 mb-4 shadow-lg transform scale-105"
              />
              <p className="text-2xl font-semibold text-white mb-2">
                {modalData.name}
              </p>
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
        </div>
      )}
    </div>
  );
};

export default SlotMachine;
