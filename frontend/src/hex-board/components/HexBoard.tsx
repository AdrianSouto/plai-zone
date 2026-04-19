import { useState, useEffect } from "react";
import '../styles/HexBoard.css';

import useBoard from "../hooks/useBoard.ts";

const player_1 = {
    name: 'player_1',
    id: 1,
    color: '#ff375a',
}

const player_2 = {
    name: 'player_2',
    id: 2,
    color: '#ffb562',
}

interface HexBoardProps {
    setWiner: (value: (((prevState: (number | null)) => (number | null)) | number | null)) => void
    registerReset?: (fn: () => void) => void
    onTurnChange?: (turnId: number) => void
}

const HexBoard = ({setWiner, registerReset, onTurnChange}: HexBoardProps) => {

    const {
        board,
        setBoard,
        turn,
        setTurn,
        CheckBoard,
        Merge,
        disjoinSet,
        empty_color,
        reset,
    } = useBoard()

    const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

    useEffect(() => {
        const checkSize = () => {
            if (window.innerWidth <= 480) setScreenSize('mobile');
            else if (window.innerWidth <= 640) setScreenSize('tablet');
            else setScreenSize('desktop');
        };
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    useEffect(() => {
        if (typeof registerReset === 'function') {
            registerReset(() => reset());
        }
    }, [registerReset, reset]);

    // listen for global reset event (dispatched from App)
    useEffect(() => {
        const handler = () => reset();
        window.addEventListener('hex-reset', handler as EventListener);
        return () => window.removeEventListener('hex-reset', handler as EventListener);
    }, [reset]);

    const getOffset = (rowIndex: number) => {
        const offsets = { mobile: 23, tablet: 29, desktop: 40 };
        return rowIndex * offsets[screenSize];
    };

    const handleHexClick = (row: number, col: number) => {
        const hexblock_color = board[row][col].color
        if (hexblock_color !== empty_color) return

        const newBoard = [...board];
        const actual_player = turn.id === player_1.id ? player_1 : player_2

        newBoard[row][col].value = actual_player.id
        newBoard[row][col].color = actual_player.color;

        setBoard(newBoard)
        Merge(row, col, disjoinSet)
        const winner = CheckBoard(disjoinSet, row, col)
        if (winner !== null) {
            setWiner(winner);
            return
        }
        const nextTurn = turn.id === player_1.id ? player_2 : player_1;
        setTurn(nextTurn);
        onTurnChange?.(nextTurn.id);
    };

    return (
        <div className={`hex-board flex flex-col items-start justify-center mx-0 my-30  ${screenSize}`}>
            {board.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    className="hex-row"
                    style={{paddingLeft: rowIndex === 0 ? 0 : `${getOffset(rowIndex)}px`}}
                >
                    {row.map((hex, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className="hex"
                            style={{backgroundColor: hex.color}}
                            onClick={() => handleHexClick(rowIndex, colIndex)}
                        >
                            <div className="hex-content select-none">
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
