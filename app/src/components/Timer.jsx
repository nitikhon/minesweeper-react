import React, { useState, useEffect } from 'react';

export default function Stopwatch(props) {
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (props.gameOver){
            setIsActive(prevState => !prevState);
        }

        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                props.setTime((prevTime) => prevTime + 10); // Increment by 10ms for more accuracy
            }, 10);
        } else if (!isActive && props.time !== 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, props.gameOver]);

    return (
        <div>
            <h1>{props.formatTime(props.time)}</h1>
        </div>
    )
}