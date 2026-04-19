interface RulesProps {
  onBack: () => void;
}

const rules = [
  {
    step: "1",
    title: "Objetivo",
    description: "Conecta los dos lados opuestos de tu color antes que tu oponente. El jugador rojo debe conectar arriba-abajo, y el azul debe conectar izquierda-derecha.",
    icon: "🎯"
  },
  {
    step: "2",
    title: "Turnos",
    description: "Los jugadores alternan colocando una ficha en cualquier hexágono vacío. El jugador rojo comienza primero.",
    icon: "🔄"
  },
  {
    step: "3",
    title: "Conexión",
    description: "Tus fichas forman conexiones automáticamente cuando tocan lados adyacentes. Construye un camino continuo de lado a lado.",
    icon: "🔗"
  },
  {
    step: "4",
    title: "Ganador",
    description: "El primer jugador en completar una cadena continua de un lado al otro del tablero gana la partida.",
    icon: "🏆"
  }
];

export default function Rules({ onBack }: RulesProps) {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 w-full">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Cómo Jugar
            </span>
          </h1>
        </div>

        <div className="w-full max-w-lg">
          <div className="px-4 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rules.map((rule) => (
                <div 
                  key={rule.step}
                  className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-lg"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-xl shadow-lg">
                    {rule.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white mb-1">{rule.title}</h3>
                    <p className="text-purple-200/70 text-xs leading-relaxed">{rule.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-500/30 to-orange-500/30 border border-red-500/40 rounded-lg">
                  <span className="w-6 h-6 bg-gradient-to-br from-red-500 to-orange-500 rounded flex items-center justify-center text-white font-bold text-xs">R</span>
                  <span className="text-purple-200 text-xs">Conecta: arriba → abajo</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border border-blue-500/40 rounded-lg">
                  <span className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded flex items-center justify-center text-white font-bold text-xs">A</span>
                  <span className="text-purple-200 text-xs">Conecta: izq. → der.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onBack}
          className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-base font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Volver
        </button>
      </div>
    </div>
  );
}