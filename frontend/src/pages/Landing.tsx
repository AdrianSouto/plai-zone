import { useState } from "react";

interface LandingProps {
  onStartGame: () => void;
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
    description: "Los jugadores alternan placing una ficha en cualquier hexágono vacío. El jugador rojo comienza primero.",
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

export default function Landing({ onStartGame }: LandingProps) {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-2xl shadow-purple-500/30">
            <svg className="w-14 h-14 text-white" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 4L56 20V44L32 60L8 44V20L32 4Z" stroke="currentColor" strokeWidth="3" fill="none"/>
              <path d="M32 4V60" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
              <path d="M8 20L56 44" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
              <path d="M56 20L8 44" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
            </svg>
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              HEX
            </span>
          </h1>
          <p className="text-xl text-purple-200/80 max-w-md mx-auto">
            Un juego de estrategia clássico de conexión. ¡Dos jugadores, un tablero, infinitas posibilidades!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button
            onClick={onStartGame}
            className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 flex items-center gap-3"
          >
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Comenzar Juego
          </button>
          
          <button
            onClick={() => setShowRules(!showRules)}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-lg font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Cómo Jugar
            <svg 
              className={`w-5 h-5 transition-transform duration-300 ${showRules ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div 
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            showRules ? 'max-w-4xl opacity-100' : 'max-w-0 opacity-0'
          }`}
        >
          <div className="px-8 py-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Cómo Jugar
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {rules.map((rule, index) => (
                <div 
                  key={rule.step}
                  className="group p-6 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                      {rule.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{rule.title}</h3>
                      <p className="text-purple-200/70 text-sm leading-relaxed">{rule.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">R</span>
                </div>
                <div className="text-purple-200">
                  <p className="font-semibold text-white">Jugador Rojo</p>
                  <p className="text-sm">Conecta de arriba hacia abajo</p>
                </div>
                <div className="mx-4 w-px h-12 bg-white/20"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <div className="text-purple-200">
                  <p className="font-semibold text-white">Jugador Azul</p>
                  <p className="text-sm">Conecta de izquierda a derecha</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="absolute bottom-6 text-center text-purple-300/50 text-sm">
          <p>HEX - Un juego de conexión estratégica</p>
        </footer>
      </div>
    </div>
  );
}
