import '../styles/HexBoard.css';

import useBoard from "../hooks/useBoard.ts";

const player_1 = {
    name: 'player_1',
    id : 1 ,
    color: '#ff0000',
}

const player_2 = {
    name: 'player_2',
    id : 2 ,
    color: '#ffe744',
}

const HexBoard = () => {

    const{

        board,
        setBoard,
        turn,
        setTurn,
        CheckBoard,
        Merge,
        disjoinSet,
        empty_color,

    }   = useBoard()

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