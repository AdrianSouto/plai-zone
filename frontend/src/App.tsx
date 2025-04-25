import './App.css'
import HexBoard from "./hex-board/components/HexBoard.tsx";
import {useState} from "react";
import WinnerScreen from "./hex-board/components/WinnerScreen.tsx";

function App() {
    const [winner  , setWinner] = useState<number | null>(null)

    return (
        <>
            <WinnerScreen onClose={() => setWinner(null)} isVisible ={!!winner } winnerName={winner?.toString() }></WinnerScreen>
            <div className=" h-svh gap-4 flex flex-col items-center bg-indigo-500 justify-center">
                <h1 className={'text-xl text-white font-medium my-5 '}>Hex Board Game</h1>
                <div>
                    <HexBoard setWiner = {setWinner} />
                </div>

            </div>
        </>
    )
}

export default App
