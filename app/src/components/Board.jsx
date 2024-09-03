import { useEffect, useState } from "react"
import Cell from "./Cell";

export default function Board(){
    const difficulty = {
        easy: '9*9',
        normal: '16*16',
        hard: '30*16',
    }

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

    const [gameMode, setGameMode] = useState('hard')

    const generateAllCells = () => {
        const arr = [];
        const dimension = difficulty[gameMode].split("*");
        for(let i = 0; i < parseInt(dimension[0]); i++){
            arr[i] = [];
            for(let j = 0; j < parseInt(dimension[1]); j++){
                arr[i][j] = <Cell />;
            }
        }
        return arr;
    }

    const [cells, setCells] = useState(generateAllCells())

    useEffect(() => {

    }, [])

    return (
        <div className={`grid ${getGridColsClass()} gap-0.5 justify-items-center p-2 border-2 border-black border-solid`}>
            {cells}
        </div>
    )
}