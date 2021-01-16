import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPES from "../../data/types";
import boardJSON from "../../data/board.json";
import getBoard from "../library/getSaveBoard";
import List from "./List";
import plus_sm from "../../images/plus-sm.svg";

const Board = function () {
  const [board, setBoard] = useState({ lists: [] });
  const [addingList, setAddingList] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [hoveredListIndex, setHoveredListIndex] = useState(null);

  useEffect(() => {
    getBoard().then((data) => setBoard(data[0]));
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
    const boardx = { ...board };

    boardx.lists.push(list);
    setBoard(boardx);
    setAddingList(false);
  };

  const handleCardDropped = (item, newListIndex, hoveredCardIndex) => {
    //  board is where we have access to both lists
    const boardx = { ...board };
    //  item.listIndex and item.cardIndex should resolve themselves

    //  working except can't move to bottom of list after hovering over anything
    //  need some way to know that we aren'g currently hovering over a card
    //  current component would need to query 'hovered' component irt
    //  either that or detect that current item is physically below
    //    last element
    if (hoveredCardIndex === null) {
      boardx.lists[newListIndex].cards.push(item.card);
    } else {
      boardx.lists[newListIndex].cards.splice(hoveredCardIndex, 0, item.card);
    }
    //  if move changed indexes...
    if (
      item.card.listIndex === newListIndex &&
      item.card.cardIndex > hoveredCardIndex
    ) {
      boardx.lists[item.card.listIndex].cards.splice(
        item.card.cardIndex + 1,
        1
      );
    } else {
      boardx.lists[item.card.listIndex].cards.splice(item.card.cardIndex, 1);
    }
    setBoard(boardx);
  };

  const handleListDropped = () => {
    alert("list dropped! " + hoveredListIndex);
  };

  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPES.LIST,
    canDrop: (item, monitor) => {
      //  we will eventually use candrop to prevent dropping a column into
      //    another column, or a card outside a colum
      return true;
    },
    drop: (item, monitor) => {
      //  problem: hoveredCardIndex is LAST card hovered over
      //  what if we aren't currently hovering over a card?
      //  can we set this back to null somehow?
      handleListDropped(item, hoveredListIndex);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(), // isOver() is a function found in the DropTargetMonitor
    }),
  });

  return (
    <div>
      <div className="board" ref={drop}>
        {board.lists.map((list, index) => {
          list.listIndex = index;
          return (
            <List
              list={list}
              handleCardDropped={handleCardDropped}
              setHoveredListIndex={setHoveredListIndex}
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
            <br />
            <input type="submit" value="Add List" />
          </form>
        )}
      </div>
    </div>
  );
};

export default Board;
