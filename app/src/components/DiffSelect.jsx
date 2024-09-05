import React from 'react';
import { useState } from 'react';

export default function DiffSelect(props) {

    const [drop, setDrop] = useState(false);

    const toggleDropdown = () => { setDrop(!drop); }

    return (
      <>
        <button onClick={toggleDropdown}>
          <p>{props.diff}</p>
          {drop &&
            <ul>
              <li>Easy</li>
              <li>Normal</li>
              <li>Hard</li>
            </ul>}
        </button>
      </>
    )
}