interface LandingProps {
  onStartGame: () => void;
  onShowRules: () => void;
}

export default function Landing({ onStartGame, onShowRules }: LandingProps) {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 w-full">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-2xl shadow-purple-500/30">
            <svg className="w-10 h-10 text-white" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 4L56 20V44L32 60L8 44V20L32 4Z" stroke="currentColor" strokeWidth="3" fill="none"/>
              <path d="M32 4V60" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
              <path d="M8 20L56 44" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
              <path d="M56 20L8 44" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              HEX
            </span>
          </h1>
          <p className="text-base text-purple-200/80">
            Un juego de estrategia clássico de conexión
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onStartGame}
            className="group px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-base font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Comenzar Juego
          </button>
          
          <button
            onClick={onShowRules}
            className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-base font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Cómo Jugar
          </button>
        </div>
      </div>
    </div>
  );
}