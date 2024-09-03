export default function Cell (props){
    return (
        <div
            onContextMenu={(e) => {
                e.preventDefault()
                props.toggleFlag(props.row, props.col)
            }}
            onClick={() => props.toggleLandMine(props.row, props.col)}
            className="w-5 h-5 bg-gray-300 border border-black flex items-center justify-center sm:w-8 sm:h-8">
            {props.isFlag ? <i className="text-red-700 fa-solid fa-flag"></i> : (props.hasMine ? 'X': 'O')}
        </div>
    )
}