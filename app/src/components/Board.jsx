import { useEffect, useState } from "react"
import Cell from "./Cell";
import GameOver from "./GameOver";

export default function Board(){
    console.log("board refresh")
    // ระดับความยาก
    const difficulty = {
        easy: [9, 9],
        normal: [16, 16],
        hard: [30, 16],
    };
    // จำนวนระเบิดตามความยาก
    const minesCount = {
        easy: 10,
        normal: 40,
        hard: 99,
    };

    // ใช้แปลงขนาดกระดานตามความยาก
    const getGridColsClass = () => {
        const cols = difficulty[gameMode][1];
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
    // เช็คว่าเป็น move แรกมั้ย
    const [firstMove, setFirstMove] = useState(true);

    // generate กระดาน
    const generateAllCells = () => {
        const arr = [];
        const dimension = difficulty[gameMode];

        //  สร้างกระดานเปล่า ๆ ขึ้นมารอ
        for(let i = 0; i < parseInt(dimension[0]); i++){
            arr[i] = [];
            for(let j = 0; j < parseInt(dimension[1]); j++){
                arr[i][j] = {
                    hasMine: false, 
                    isFlag: false,
                    isRevealed: false,
                    row: i,
                    col: j,
                    adjMine: 0,
                };
            };
        };
        return arr;
    }

    // กระดาน
    const [cells, setCells] = useState(generateAllCells());

    const revealEmptyCells = (row, col) => {
        if (gameOver.currentState) return;
        const rows = difficulty[gameMode][0];
        const cols = difficulty[gameMode][1];
    
        // Out of bounds or already revealed
        if (row < 0 || row >= rows || 
            col < 0 || col >= cols || 
            cells[row][col].isRevealed ||
            cells[row][col].hasMine) {
            return;
        }
    
        // Reveal current cell
        cells[row][col].isRevealed = true;
        setCells([...cells]);
    
        // If the cell is empty, reveal its neighbors
        if (cells[row][col].adjMine === 0) {
            revealEmptyCells(row - 1, col); // Up
            revealEmptyCells(row + 1, col); // Down
            revealEmptyCells(row, col - 1); // Left
            revealEmptyCells(row, col + 1); // Right
            revealEmptyCells(row - 1, col - 1); // Top-left
            revealEmptyCells(row - 1, col + 1); // Top-right
            revealEmptyCells(row + 1, col - 1); // Bottom-left
            revealEmptyCells(row + 1, col + 1); // Bottom-right
        }
    }

    // นับระเบิดรอบ ๆ cell
    const countMines = () => {
        const rows = difficulty[gameMode][0];
        const cols = difficulty[gameMode][1];
        const directions = [
            [-1, 0], [1, 0], [0, -1], [0, 1],
            [-1, -1], [-1, 1], [1, -1], [1, 1]
        ];
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                let count = 0;
                for (let [di, dj] of directions) {
                    const newRow = i + di;
                    const newCol = j + dj;    
                    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                        if (cells[newRow][newCol].hasMine) {
                            count++;
                        }
                    }
                }
                cells[i][j].adjMine = count;
            }
        }
        setCells([...cells]);
    }

    // วางระเบิดสุ่มลงไปในกระดาน
    const placeMine = (initRow, initCol) => {
        let minesPlaced = 0;
        const dimension = difficulty[gameMode];
        const numMines = minesCount[gameMode];

        while (minesPlaced < numMines) {
            const randomRow = Math.floor(Math.random() * dimension[0]);
            const randomCol = Math.floor(Math.random() * dimension[1]);

            let isAdjacent = false;

            // เช็คว่าจุดที่สุ่มมาใกล้กับจดเริ่มต้นมั้ย
            if (Math.abs(randomRow - initRow) <= 1 && Math.abs(randomCol - initCol) <= 1) {
                isAdjacent = true;
            }

            // วางระเบิดแค่จุดที่ห่างจากจุดเริ่มต้น และไม่ใช่จุดเริ่มต้น
            if ((randomRow !== initRow || randomCol !== initCol) && !isAdjacent) {
                if (!cells[randomRow][randomCol].hasMine) {
                    cells[randomRow][randomCol].hasMine = true;
                    minesPlaced++;
                }
            }
        }
    }

    // ใช้ set flag
    const toggleFlag = (row, col) => {
        if (!gameOver.currentState){
            setCells(prevCells => 
                prevCells.map((cellRow, rIndex) =>
                    cellRow.map((cell, cIndex) => {
                        return rIndex === row && cIndex === col ?
                        { ...cell, isFlag: !cell.isFlag } 
                        : cell;
                    })
                )
            );
        }
    };

    // ใช้เช็คว่ากดโดนระเบิดมั้ย
    const toggleLandMine = (row, col) => {
        // move แรกให้การันตีว่าจะกดไม่โดนระเบิด และกดไม่โดนจุดที่ใกล้กับระเบิด
        if (firstMove){
            placeMine(row, col);
            countMines();
            setFirstMove(false);
        } else {
            // แพ้ ถ้ากดโดนระเบิด
            if (cells[row][col].hasMine){
                setGameOver({
                    currentState: true,
                    isWinning: false
                });
            // แสดง cell รอบ ๆ ที่ไม่มีระเบิด
            } else {
                revealEmptyCells(row, col);
            }
        }
    };
    
    // map each cell to cell component
    const cellElements = cells.map(cellRow =>
        cellRow.map(cell => 
            <Cell
                toggleFlag={toggleFlag}
                toggleLandMine={toggleLandMine}
                revealEmptyCells={revealEmptyCells}
                isRevealed={cell.isRevealed}
                hasMine={cell.hasMine} 
                isFlag={cell.isFlag} 
                row={cell.row} 
                col={cell.col}
                adjMine={cell.adjMine}
            />)
        );
    
    useEffect(() => {
        console.log(gameOver.currentState)
        if (gameOver.currentState){
            const rows = difficulty[gameMode][0];
            const cols = difficulty[gameMode][1];
            for(let i = 0; i < rows; i++){
                for(let j = 0; j < cols; j++){
                    cells[i][j].isRevealed = true;
                }
            }
            setCells([...cells]);
            }
            
    // DO NOT EDIT THIS (it works for now...) 
    }, [gameOver.currentState])

    return (
        <div className="flex flex-col justify-center items-center mt-2">
            {gameOver.currentState ? <GameOver isWinning={gameOver.isWinning} isShow={gameOver.currentState}/> : ''}
            <div className={`grid ${getGridColsClass()} 
            gap-1 justify-items-center p-2 border-2 border-black 
            border-solid rounded-md`}>
                {cellElements}
            </div>
            {gameOver.currentState && 
            <button
                onClick={() => {
                    setCells(generateAllCells);
                    setGameOver({
                        currentState: false,
                        isWinning: false,
                    });
                    setFirstMove(true);
                }}
                className="mt-6 border-2 border-black p-1">
                <i className="fa-solid fa-rotate-right"></i>
            </button>
            }
        </div>
        
    )
}