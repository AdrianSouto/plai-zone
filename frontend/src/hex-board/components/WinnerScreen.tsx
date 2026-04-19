import React from "react";

interface WinnerScreenProps {
  isVisible: boolean;
  winnerName?: string;
  onClose: () => void;
}

const WinnerScreen: React.FC<WinnerScreenProps> = ({ isVisible, winnerName, onClose }) => {
  if (!isVisible) return null;

  const isPlayerRed = winnerName === "1";

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative mx-4 p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>

        <div className="mt-8 mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              ¡Ganador!
            </span>
          </h2>
          <div className="inline-flex items-center gap-3 mt-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isPlayerRed 
                ? 'bg-red-500 ' 
                : 'bg-blue-500'
            }`}>
              <span className="text-white font-bold text-xl">{winnerName}</span>
            </div>
            <p className="text-xl text-purple-200">
              Jugador {winnerName} ha ganado!
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
          >
            Jugar de nuevo
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerScreen;