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

    if (showRules) {
        return <Rules onBack={() => setShowRules(false)} />;
    }

    if (!showGame) {
        return <Landing onStartGame={() => setShowGame(true)} onShowRules={() => setShowRules(true)} />;
    }

    return (
        <>
            <WinnerScreen onClose={() => setWinner(null)} isVisible ={!!winner } winnerName={winner?.toString() }></WinnerScreen>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
                    <div className="flex items-center gap-4 mb-8">
                        <button
                            onClick={() => setShowGame(false)}
                            className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </button>
                        <h1 className="text-4xl font-bold text-white">
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                HEX
                            </span>
                        </h1>
                    </div>
                    <div className="hex-board w-3/4 flex flex-col items-center justify-center">
                        <HexBoard setWiner = {setWinner} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App