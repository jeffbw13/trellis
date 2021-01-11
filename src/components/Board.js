import React, { useState, useEffect } from 'react';
import boardJSON from '../../data/board.json';
import Column from './Column';
import plus_sm from '../../images/plus-sm.svg';

const Board = function() {

  const [board, setBoard] = useState([]);

  useEffect(() => {
    console.log(boardJSON);
    setBoard(boardJSON.board);
  }, [])

  const addColumn = () => {
    console.log('addColumn');
    const boardx = [...board];
    let inx = boardx.length + 1;
    let col = {userId: 1, columnId: inx, header: 'Bob', cards: []};
    boardx.push(col);
    setBoard(boardx);
  };

  return (
    <div>
      <div className="board">
      {board.map((column) => (
        <Column key={column.columnId} column={column}/>
        ))}
      <button className="add-column-button" onClick={addColumn}>
        <span>
        <img src={plus_sm} />
        Add another list
        </span>
      </button>
      </div>
    </div>
  );
};

export default Board;