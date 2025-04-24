import {useState} from "react";
import DisjointSet from "../classes/DisjointSet.ts";

export default function useBoard() {


    const size = 8;

    const empty_color = '#d8d8d8'

    const initialBoard = Array(size).fill(0).map(() =>
        Array(size).fill(0).map(() => (
            {
                color: empty_color,
                content: '</>',
                value : 0 ,
            }))
    );


    const [board, setBoard] = useState(initialBoard);
    const [turn, setTurn] = useState({id : 1});
    const [disjoinSet, setDisjoinSet] = useState(new DisjointSet(size));


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

    return{board , setBoard , turn , setTurn , Merge , CheckBoard , disjoinSet , empty_color};
}