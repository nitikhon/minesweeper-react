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
          className='border-2 border-black p-1.5 rounded-md'
        >
          <p>{props.diff[0].toUpperCase() + props.diff.slice(1)}</p>
        </button>
        {drop &&
          <ul className="diff-list border-2 border-black mt-1 p-1">
            <li className="" onClick={() => toggleDiff('easy')}>Easy</li>
            <li className="" onClick={() => toggleDiff('normal')}>Normal</li>
            <li className="" onClick={() => toggleDiff('hard')}>Hard</li>
          </ul>}
      </div>
    )
}