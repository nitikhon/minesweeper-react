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
        <button onClick={toggleDropdown}>
          <p>{props.diff}</p>
        </button>
        {drop &&
          <ul className="diff-list">
            <li onClick={() => toggleDiff('easy')}>Easy</li>
            <li onClick={() => toggleDiff('normal')}>Normal</li>
            <li onClick={() => toggleDiff('hard')}>Hard</li>
          </ul>}
      </div>
    )
}