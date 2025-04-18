import './App.css'
import HexBoard from "./hex-board/components/HexBoard.tsx";

function App() {


    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <HexBoard /> {/* Tablero 9x9 */}
            </div>
        </>
    )
}

export default App
