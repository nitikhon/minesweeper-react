export default function Cell (props){
    if (!props.isRevealed){
        return (
            <div
                onContextMenu={(e) => {
                    e.preventDefault();
                    props.toggleFlag(props.row, props.col);
                    props.setCurrentFlag(prevFlag => prevFlag + 1);
                }}
                onClick={() => {
                    props.toggleLandMine(props.row, props.col);
                    props.revealEmptyCells(props.row, props.col);
                }}
                className="w-5 h-5 bg-gray-300 border border-black 
                flex items-center justify-center {} sm:w-8 sm:h-8 rounded-sm"
                style={{ boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`, }}
            >
                
                {props.isFlag ? <i className="text-red-700 fa-solid fa-flag"></i> : (props.isRevealed ? props.adjMine : '')}
            </div>
        ) 
    } else {
       return (
            <div
                onClick={() => {
                    props.toggleLandMine(props.row, props.col);
                }}
                className="w-5 h-5 bg-gray-300 border border-black 
                flex items-center justify-center {} sm:w-8 sm:h-8 rounded-sm"
                style={{ boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`, }}
            >
                
                {props.isFlag ? <i className="text-red-700 fa-solid fa-flag"></i> : (props.hasMine ? 'X': props.adjMine)}
            </div>
        ) 
    } 
}