import '../styles/HexBoard.css';
import {useState} from "react";

const HexBoard = () => {
    // Board configuration - diamond shape with letters on top, numbers on left
    const rows = 8;
    const cols = 8;

    // Initialize board state with empty colors
    const initialBoard = Array(rows).fill(1).map(() =>
        Array(cols).fill(1).map(() => ({
            color: '#d72f2f', // white by default
            hasLetter: false,
            hasNumber: false,
            content: ''
        }))
    );


    const [board, setBoard] = useState(initialBoard);

    // Colors to cycle through
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];

    const handleHexClick = (row : number, col : number) => {
        // Don't change color for label cells
        if (board[row][col].hasLetter || board[row][col].hasNumber) return;

        const newBoard = [...board];
        const currentColor = newBoard[row][col].color;
        const currentIndex = colors.indexOf(currentColor);

        // Cycle to next color or back to first if at end
        newBoard[row][col].color = colors[(currentIndex + 1) % colors.length];

        setBoard(newBoard);
    };

    return (
            <div className="hex-board w-3/4 flex flex-col items-center justify-center">
                {board.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="hex-row"
                        style={{ marginLeft: `${rowIndex * 65}px `  }}
                    >
                        {row.map((hex, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`hex ${hex.hasLetter ? 'letter' : ''} ${hex.hasNumber ? 'number' : ''}`}
                                style={{ backgroundColor: hex.color  }}
                                onClick={() => handleHexClick(rowIndex, colIndex)}

                            >
                                <div className="hex-content">
                                    {hex.content}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
    );
};

export default HexBoard;