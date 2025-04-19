import '../styles/HexBoard.css';
import {useState} from "react";

const HexBoard = () => {
    // Board configuration - diamond shape with letters on top, numbers on left
    const size = 8 ;

    const empty_color = '#ffffff'

    const player_1 = {
        name: 'player_1',
        color : '#ff0000'
    }

    const player_2 = {
        name: 'player_2',
        color : '#ffe744'
    }


    // Initialize board state with empty colors
    const initialBoard = Array(size).fill(1).map(() =>
        Array(size).fill(null).map(() => ({
            color: empty_color,
            content: 'Bar EFE'
        }))
    );



    const [board, setBoard] = useState(initialBoard);
    const [turn, setTurn] = useState('player_1');

    const handleHexClick = (row : number, col : number) => {

        const hexblock_color  = board[row][col].color

        if ( hexblock_color !== empty_color) return

        const newBoard = [...board];

        if (turn === player_1.name)
        {
            newBoard[row][col].color = player_1.color;
            setTurn(player_2.name)
        }

        else
        {
            newBoard[row][col].color = player_2.color;
            setTurn(player_1.name)
        }

        setBoard(newBoard);
    };

    return (
            <div className="hex-board w-3/4 flex flex-col items-center justify-center">
                {board.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="hex-row"
                        style={{ marginLeft: `${rowIndex * 65}px`}}
                    >
                        {row.map((hex, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={'hex'}
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