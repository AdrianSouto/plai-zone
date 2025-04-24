import '../styles/HexBoard.css';
import {useState} from "react";
import DisjointSet from "../classes/DisjointSet.ts";


const HexBoard = () => {
    // Board configuration - diamond shape with letters on top, numbers on left
    const size = 8;

    const empty_color = '#d8d8d8'

    const player_1 = {
        name: 'player_1',
        id : 1 ,
        color: '#ff0000',
        wining_directions : ['up' , 'down']
    }

    const player_2 = {
        name: 'player_2',
        id : 2 ,
        color: '#ffe744',
        wining_directions : ['left' , 'right']
    }


    const initialBoard = Array(size).fill(0).map(() =>
        Array(size).fill(0).map(() => (
            {
            color: empty_color,
            content: '</>',
            value : 0 ,
        }))
    );

   

    const [board, setBoard] = useState(initialBoard);
    const [turn, setTurn] = useState(player_1);
    const [disjoinSet, setDisjoinSet] = useState(new DisjointSet(size));

    console.log(disjoinSet)

    const CheckBoard = (dj : DisjointSet ,row: number, col: number ): void => {

        const parent = dj.find(row , col )

        const parentRow = Math.floor(parent / dj.parent.length);
        const parentCol = parent % dj.parent.length;

        if (turn.id === 1 )
        {
            if (dj.directions[parentRow][parentCol].includes('up') && dj.directions[parentRow][parentCol].includes('down')) {
                alert('player 1 wins ')
            }

        }
        else
        if (dj.directions[parentRow][parentCol].includes('left') && dj.directions[parentRow][parentCol].includes('right')) {
            alert('player 2 wins ')
        }

    }

    const Merge = (row: number, col: number, dj: DisjointSet) => {

        const new_disjointSet = dj

        for (const [dx, dy] of new_disjointSet.adjacents) {
            const newRow = row + dx;
            const newCol = col + dy;


            if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {

                if(board[row][col].color === board[newRow][newCol].color) {
                    new_disjointSet.union(row, col, newRow, newCol, );

                }


            }


        }
        setDisjoinSet(new_disjointSet);

    }

    const handleHexClick = (row: number, col: number) => {

        const hexblock_color = board[row][col].color


        if (hexblock_color !== empty_color) return

        const newBoard = [...board];
        const actual_player = turn.id === player_1.id ? player_1: player_2

        newBoard[row][col].value = actual_player.id
        newBoard[row][col].color = actual_player.color;
        
        setBoard(newBoard)
        Merge(row, col, disjoinSet)
        CheckBoard(disjoinSet , row , col )
        setTurn(prevState => prevState.id === player_1.id ? player_2 : player_1);

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
                                {board[rowIndex][colIndex].content}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default HexBoard;