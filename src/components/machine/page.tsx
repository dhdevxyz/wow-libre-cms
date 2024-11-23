"use client";
import React, { useState } from "react";

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
const spinCost = 10; // Costo por giro
const winReward = 50; // Recompensa al ganar
const winProbability = 0.2; // Probabilidad de ganar (20%)

const SlotMachine: React.FC = () => {
  const [slots, setSlots] = useState<SlotItem[]>(["⚔️", "⚔️", "⚔️"]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(100); // Saldo inicial
  const [showModal, setShowModal] = useState(false);

  // Función para obtener un símbolo aleatorio de los rodillos
  const getRandomSlot = () =>
    slotOptions[Math.floor(Math.random() * slotOptions.length)];

  // Función para manejar el giro de la tragamonedas
  const spin = () => {
    if (isSpinning || balance < spinCost) return;

    setIsSpinning(true);
    setResult(null);
    setBalance((prev) => prev - spinCost); // Reducir saldo por giro

    const spinDuration = 3000; // Duración del giro
    const interval = 100;

    let spins = 0;
    const spinInterval = setInterval(() => {
      setSlots([getRandomSlot(), getRandomSlot(), getRandomSlot()]);
      spins += interval;
      if (spins >= spinDuration) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        calculateResult();
      }
    }, interval);
  };

  // Calcular el resultado del giro
  const calculateResult = () => {
    const isWinner = Math.random() < winProbability;
    if (isWinner) {
      const winningSymbol =
        winningSymbols[Math.floor(Math.random() * winningSymbols.length)];
      setSlots([winningSymbol, winningSymbol, winningSymbol]); // Mostrar tres símbolos iguales
      setResult("🎉 ¡Has ganado! 🎉");
      setBalance((prev) => prev + winReward); // Incrementar saldo
      setShowModal(true); // Mostrar modal de ganador
    } else {
      setSlots([getRandomSlot(), getRandomSlot(), getRandomSlot()]); // Generar símbolos al azar
      setResult("😢 ¡Mejor suerte la próxima vez!");
    }
  };

  // Cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full h-full p-6 bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg shadow-2xl text-white flex flex-col justify-center items-center">
      <p className="text-xl font-semibold mb-4">Saldo: ${balance}</p>

      <div className="grid grid-cols-3 gap-4 mb-6 text-7xl w-full max-w-sm">
        {slots.map((slot, index) => (
          <div
            key={index}
            className="w-24 h-24 flex items-center justify-center bg-gray-700 rounded-lg shadow-lg"
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
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center relative">
            <h2 className="text-3xl font-bold text-yellow-500 mb-4">
              ¡Felicidades, Campeón de Azeroth!
            </h2>
            <p className="text-lg text-gray-200 mb-6">🎉 ¡Ganaste $50! 🎉</p>
            <img
              src="https://i.pinimg.com/originals/8f/46/73/8f4673b07c0146707291423127fa65af.jpg"
              alt="Ganaste"
              className="w-40 h-40 mx-auto mb-4 rounded-lg"
            />
            <button
              onClick={closeModal}
              className="px-4 py-2 text-lg font-bold bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white rounded-lg"
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
