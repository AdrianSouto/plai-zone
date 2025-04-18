import './App.css'
import HexBoard from "./hex-board/components/HexBoard.tsx";

function App() {


    return (
        <>
            <div className=" h-svh gap-4 flex   flex-col items-center bg-gray-900 justify-center">
                <h1 className={'text-xl text-white font-medium my-5 '}>Hex Board Game</h1>
                <div>
                    <HexBoard />
                </div>

            </div>
        </>
    )
}

export default App
