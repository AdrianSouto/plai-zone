import './App.css'
import HexBoard from "./hex-board/components/HexBoard.tsx";
import {useState} from "react";
import WinnerScreen from "./hex-board/components/WinnerScreen.tsx";
import Landing from "./pages/Landing.tsx";
import Rules from "./pages/Rules.tsx";

function App() {
    const [winner  , setWinner] = useState<number | null>(null)
    const [showGame, setShowGame] = useState(false)
    const [showRules, setShowRules] = useState(false)
    const [currentTurn, setCurrentTurn] = useState(1)

    if (showRules) {
        return <Rules onBack={() => setShowRules(false)} />;
    }

    if (!showGame) {
        return <Landing onStartGame={() => setShowGame(true)} onShowRules={() => setShowRules(true)} />;
    }

    return (
        <>
            <WinnerScreen onClose={() => setWinner(null)} isVisible ={!!winner } winnerName={winner?.toString() } onRestart={() => {
                // restart: reset board and reset turn
                setWinner(null);
                setCurrentTurn(1);
                // call reset function via DOM event to avoid prop plumbing
                window.dispatchEvent(new CustomEvent('hex-reset'));
            }}></WinnerScreen>
            <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-10 left-1/4 w-48 h-48 bg-purple-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-1/4 w-56 h-56 bg-blue-500 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-2 py-4 w-full">
                    <div className="flex items-center gap-3 mb-4">
                        <button
                            onClick={() => setShowGame(false)}
                            className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </button>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                HEX
                            </span>
                        </h1>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-purple-200">Turno de:</span>
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
                                currentTurn === 1 
                                    ? 'bg-red-500/20 border-red-500/50' 
                                    : 'bg-yellow-500/20 border-yellow-500/50'
                            }`}>
                                <div className={`w-3 h-3 rounded-full ${
                                    currentTurn === 1 ? 'bg-red-500' : 'bg-yellow-500'
                                }`}></div>
                                <span className="text-sm font-medium text-white">
                                    {currentTurn === 1 ? 'Rojo' : 'Amarillo'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex-1 flex items-start justify-center overflow-auto">
                        <HexBoard setWiner = {setWinner} onTurnChange={setCurrentTurn} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
