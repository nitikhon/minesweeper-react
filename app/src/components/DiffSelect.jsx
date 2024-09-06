import React from 'react';
import { useState } from 'react';
import './Game.css';

export default function DiffSelect(props) {

    const [drop, setDrop] = useState(false);

    const toggleDropdown = () => { setDrop(!drop); }

    const toggleDiff = (val) => {
      props.onDiffChange(val);
      setDrop(false);
    }

    return (
      <div>
        <button 
          onClick={toggleDropdown} 
          className={`_${props.diff}-button`}
        >
          <p>{props.diff[0].toUpperCase() + props.diff.slice(1)}</p>
        </button>
        {drop &&
          <ul className="diff-list border-2 border-black mt-1 p-1">
            <li className="_easy" onClick={() => toggleDiff('easy')}>Easy</li>
            <li className="_normal" onClick={() => toggleDiff('normal')}>Normal</li>
            <li className="_hard" onClick={() => toggleDiff('hard')}>Hard</li>
          </ul>}
      </div>
    )
}