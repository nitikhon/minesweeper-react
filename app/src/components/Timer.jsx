import React, { useState, useEffect } from 'react';

export default function Stopwatch(props) {
    useEffect(() => {
        let interval = null;

        if (!props.gameOver){
            interval = setInterval(() => {
                props.setTime((prevTime) => prevTime + 10); // Increment by 10ms for more accuracy
            }, 10);
        }

        return () => clearInterval(interval);
    }, [props.gameOver]);

    return (
        <div>
            <h1>{props.formatTime(props.time)}</h1>
        </div>
    )
}