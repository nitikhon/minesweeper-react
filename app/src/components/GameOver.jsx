import { useState } from "react";

export default function GameOver(props){
    const [showModal, setShowModal] = useState(props.isShow);
    if (!showModal) return "";
    return (
        <div
            className="fixed inset-0 flex items-center justify-center
          bg-black bg-opacity-25 backdrop-blur-sm"
        >
          {
            props.isWinning ?
            <div className="flex flex-col justify-center items-center gap-4 p-4 bg-white">
                <p>Congratulations! You win the game!</p>
                <p>Time</p>
                <div className="flex flex-row gap-2">
                    <button
                        onClick={() => props.generateNewGame()}
                        className="border border-black border-1 p-2">
                        New game
                    </button>
                    <button
                        onClick={() => setShowModal(prevState => !prevState)}
                        className="border border-black border-1 p-2">
                        View result
                    </button>
                </div>
            </div> 
            :
            <div className="flex flex-col justify-center items-center gap-2 p-4 bg-white">
                <p>Game Over!</p>
                <p>Time</p>
                <div className="flex flex-row gap-2">
                    <button
                        onClick={() => props.generateNewGame()}
                        className="border border-black border-1 p-2">
                        New game
                    </button>
                    <button 
                        onClick={() => setShowModal(prevState => !prevState)}
                        className="border border-black border-1 p-2">
                        View result
                    </button>
                </div>
            </div>
          }
        </div>
    );
};