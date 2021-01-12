import React, { useState, useEffect } from "react";
import boardJSON from "../../data/board.json";
import List from "./List";
import plus_sm from "../../images/plus-sm.svg";

const Board = function () {
  const [board, setBoard] = useState([]);
  const [addingList, setAddingList] = useState(false);
  const [listTitle, setListTitle] = useState("");

  useEffect(() => {
    console.log(boardJSON);
    setBoard(boardJSON.board);
  }, []);

  const handleAddList = (event) => {
    event.preventDefault();
    //  do we need cardId?  Card will always be inside a column array.
    const list = {
      listId: board.length + 1,
      header: listTitle,
      cards: [],
    };
    //  this needs to add column to database.
    const boardx = [...board];

    boardx.push(list);
    setBoard(boardx);
    setAddingList(false);
  };

  let key = 0;

  return (
    <div>
      <div className="board">
        {board.map((list) => (
          <List key={key++} list={list} />
        ))}
        {!addingList && (
          <button
            className="add-list-button"
            onClick={() => setAddingList(true)}
          >
            <img src={plus_sm} />
            Add another list
          </button>
        )}
        {addingList && (
          <form className="add-list-form" onSubmit={handleAddList}>
            <textarea
              placeholder="Enter a title for this list..."
              onChange={(event) => setListTitle(event.target.value)}
            ></textarea>
            <input type="submit" value="Add List" />
          </form>
        )}
      </div>
    </div>
  );
};

export default Board;
