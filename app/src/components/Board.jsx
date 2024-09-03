import { useEffect, useState } from "react"
import Cell from "./Cell";

export default function Board(){
    // ระดับความยาก
    const difficulty = {
        easy: '9*9',
        normal: '16*16',
        hard: '30*16',
    }
    // จำนวนระเบิดตามความยาก
    const minesCount = {
        easy: 10,
        normal: 40,
        hard: 99,
    };

    // ใช้แปลงขนาดกระดานตามความยาก
    const getGridColsClass = () => {
        const cols = difficulty[gameMode].split("*")[1];
        switch (cols) {
            case '9':
                return 'grid-cols-9';
            case '16':
                return 'grid-cols-16';
            case '30':
                return 'grid-cols-30';
            default:
                return 'grid-cols-9';
        }
    };

    // เก็บ mode game
    const [gameMode, setGameMode] = useState('easy')

    // generate กระดาน
    const generateAllCells = () => {
        const arr = [];
        const dimension = difficulty[gameMode].split("*");
        const numMines = minesCount[gameMode];

        //  สร้างกระดานเปล่า ๆ ขึ้นมารอ
        for(let i = 0; i < parseInt(dimension[0]); i++){
            arr[i] = [];
            for(let j = 0; j < parseInt(dimension[1]); j++){
                arr[i][j] = {
                    hasMine: false, 
                    row: i,
                    col: j,
                };
            }
        }

        // วางระเบิดสุ่มลงไปในกระดาน
        let minesPlaced = 0;
        while (minesPlaced < numMines) {
            const randomRow = Math.floor(Math.random() * dimension[0]);
            const randomCol = Math.floor(Math.random() * dimension[1]);

            if (!arr[randomRow][randomCol].hasMine) {
                arr[randomRow][randomCol].hasMine = true;
                minesPlaced++;
            }
        }
        console.log(arr)
        return arr;
    }

    // กระดาน
    const [cells, setCells] = useState(generateAllCells())

    const cellElements = cells.map(cellRow =>
        cellRow.map(cell => <Cell hasMine={cell.hasMine} row={cell.row} col={cell.col}/>)
        ) 

    useEffect(() => {

    }, [])

    return (
        <div className={`grid ${getGridColsClass()} gap-0.5 justify-items-center p-2 border-2 border-black border-solid`}>
            {cellElements}
        </div>
    )
}