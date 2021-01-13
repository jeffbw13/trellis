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

  const handleCardDropped = (item, newListIndex) => {
    //  board is where we have access to both lists
    alert("handleCardDropped");
    console.log("item: ", item);
    console.log("newListIndex: ", newListIndex);
    const boardx = [...board];
    //  item.listIndex and item.cardIndex should resolve themselves
    boardx[newListIndex].cards.push(item.card);
    boardx[item.card.listIndex].cards.splice(item.card.cardIndex, 1);
    setBoard(boardx);
    //  this needs to add to new list in the appropriate position, and remove
    //  from old list.  Ultimately it will need to save both lists (or the
    //  board) to the database.
    //  Can this be done in the card?  It IS called back from the card.  But
    //  card would need to have access to whole board, right?
  };

  return (
    <div>
      <div className="board">
        {board.map((list, index) => {
          list.listIndex = index;
          return (
            <List
              list={list}
              handleCardDropped={handleCardDropped}
              key={index}
            />
          );
        })}
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
