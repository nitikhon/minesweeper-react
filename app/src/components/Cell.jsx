import './Game.css';
import './Adjacent.css';

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
                  if (!props.isFlag) {
                    props.toggleLandMine(props.row, props.col);
                    props.revealEmptyCells(props.row, props.col);
                  }
                }}
                className="unrevealed"
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
                className={`revealed ${props.hasMine && 'mined'}
                    ${!props.hasMine && props.adjMine > 0 && `adjacent-${props.adjMine}`}
                `}
            >
                {props.hasMine ? <i className="fa-solid fa-bomb"></i> : (props.adjMine !== 0 && props.adjMine)}
            </div>
        ) 
    } 
}