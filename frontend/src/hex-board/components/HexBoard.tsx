import '../styles/HexBoard.css';
import {useState} from "react";
import DisjointSet from "../classes/DisjointSet.ts";

const HexBoard = () => {
    // Board configuration - diamond shape with letters on top, numbers on left
    const size = 8;

    const empty_color = '#d8d8d8'

    const player_1 = {
        name: 'player_1',
        color: '#ff0000'
    }

    const player_2 = {
        name: 'player_2',
        color: '#ffe744'
    }


    // Initialize board state with empty colors
    const initialBoard = Array(size).fill(null).map(() =>
        Array(size).fill(null).map(() => ({
            color: empty_color,
            content: 'sponsor'
        }))
    );


    const [board, setBoard] = useState(initialBoard);
    const [turn, setTurn] = useState('player_1');
    const [disjoinSet, setDisjoinSet] = useState(new DisjointSet(size));

    console.log(disjoinSet)


    const Merge = (row: number, col: number, dj: DisjointSet) => {

        const new_disjointSet = dj

        for (const [dx, dy] of new_disjointSet.adjacents) {
            const newRow = row + dx;
            const newCol = col + dy;


            if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {

                if(board[row][col].color === board[newRow][newCol].color) {
                    new_disjointSet.union(row, col, newRow, newCol);

                }


            }


        }
        setDisjoinSet(new_disjointSet);

    }

    const handleHexClick = (row: number, col: number) => {

        const hexblock_color = board[row][col].color


        if (hexblock_color !== empty_color) return

        const newBoard = [...board];

        newBoard[row][col].color = turn === player_1.name ? player_1.color : player_2.color;
        setBoard(newBoard)
        Merge(row, col, disjoinSet)
        setTurn(prevState => prevState === 'player_1' ? 'player_2' : 'player_1');

    };

    return (
        <div className="hex-board w-3/4 flex flex-col items-center justify-center">
            {board.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    className="hex-row"
                    style={{marginLeft: `${rowIndex * 65}px`}}
                >
                    {row.map((hex, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={'hex'}
                            style={{backgroundColor: hex.color}}
                            onClick={() => handleHexClick(rowIndex, colIndex)}
                        >
                            <div className="hex-content select-none ">
                                {rowIndex} {colIndex}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default HexBoard;