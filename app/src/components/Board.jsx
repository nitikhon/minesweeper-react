import { useEffect, useState } from "react"
import Cell from "./Cell";
import GameOver from "./GameOver";

export default function Board(){
    // ระดับความยาก
    const difficulty = {
        easy: '9*9',
        normal: '16*16',
        hard: '30*16',
    };
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
    const [gameMode, setGameMode] = useState('easy');

    // เช็คว่า game over รึยัง
    const [gameOver, setGameOver] = useState({
        currentState: false,
        isWinning: false
    });

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
                    isFlag: false,
                    row: i,
                    col: j,
                };
            };
        };

        // วางระเบิดสุ่มลงไปในกระดาน
        let minesPlaced = 0;
        while (minesPlaced < numMines) {
            const randomRow = Math.floor(Math.random() * dimension[0]);
            const randomCol = Math.floor(Math.random() * dimension[1]);

            if (!arr[randomRow][randomCol].hasMine) {
                arr[randomRow][randomCol].hasMine = true;
                minesPlaced++;
            };
        };
        return arr;
    }

    // กระดาน
    const [cells, setCells] = useState(generateAllCells());

    // ใช้ set flag
    const toggleFlag = (row, col) => {
        setCells(prevCells => 
            prevCells.map((cellRow, rIndex) =>
                cellRow.map((cell, cIndex) => {
                    return rIndex === row && cIndex === col ?
                    { ...cell, isFlag: !cell.isFlag } 
                    : cell;
                })
            )
        );
    };

    // ใช้เช็คว่ากดโดนระเบิดมั้ย
    const toggleLandMine = (row, col) => {
        // console.log("toggle landmine at", row, col)
        if (cells[row][col].hasMine){
            setGameOver({
                currentState: true,
                isWinning: false
            });
        }
    };
    
    const cellElements = cells.map(cellRow =>
        cellRow.map(cell => 
            <Cell
                toggleFlag={toggleFlag}
                toggleLandMine={toggleLandMine}
                hasMine={cell.hasMine} 
                isFlag={cell.isFlag} 
                row={cell.row} 
                col={cell.col}
            />)
        );
    
    useEffect(() => {

    }, [])

    return (
        <div className="flex flex-col justify-center items-center mt-2">
            {gameOver.currentState ? <GameOver isWinning={gameOver.isWinning} isShow={gameOver.currentState}/> : ''}
            <div className={`grid ${getGridColsClass()} gap-0.5 justify-items-center p-2 border-2 border-black border-solid`}>
                {cellElements}
            </div>
            {gameOver.currentState && 
            <button
                onClick={() => {
                    setCells(generateAllCells);
                    setGameOver({
                        currentState: false,
                        isWinning: false
                    })
                }}
                className="mt-6 border-2 border-black p-1">
                <i className="fa-solid fa-rotate-right"></i>
            </button>
            }
        </div>
        
    )
}