import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPES from "../../data/types";
import boardJSON from "../../data/board.json";
import { getBoard, saveBoard } from "../library/getSaveBoard";
import List from "./List";
import plus_sm from "../../images/plus-sm.svg";
import x from "../../images/x.svg";

const Board = function () {
  const [board, setBoard] = useState({ lists: [] });
  const [addingList, setAddingList] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [hoveredListIndex, setHoveredListIndex] = useState(null);
  const [saveBoardFlag, setSaveBoardFlag] = useState(false);

  useEffect(() => {
    getBoard().then((data) => setBoard(data[0]));
  }, []);

  useEffect(() => {
    if (!saveBoardFlag) return;
    saveBoard(board)
      .then((resp) => console.log("hey"))
      .catch((err) => console.log("error: ", err));
    //alert("saving board in effect! saveBoardFlag=" + saveBoardFlag);
    setSaveBoardFlag(false);
  }, [saveBoardFlag]);

  const handleAddList = (event) => {
    event.preventDefault();
    if (!listTitle) return;
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
    setSaveBoardFlag(true);
    setAddingList(false);
  };

  const handleCardDropped = (
    item,
    newListIndex,
    hoveredCardIndex,
    droppedOverCard
  ) => {
    //  board is where we have access to both lists
    const boardx = { ...board };
    //  item.listIndex and item.cardIndex should resolve themselves
    if (hoveredCardIndex === null || !droppedOverCard) {
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
    setSaveBoardFlag(true);
  };

  const handleListDropped = (item, droppedOverList) => {
    //  board is where we have access to all lists
    const boardx = { ...board };
    //  item.listIndex and item.cardIndex should resolve themselves
    if (hoveredListIndex === null || !droppedOverList) {
      boardx.lists.push(item.list);
    } else {
      boardx.lists.splice(hoveredListIndex, 0, item.list);
    }
    //  if move changed indexes...
    if (droppedOverList && item.list.listIndex > hoveredListIndex) {
      boardx.lists.splice(item.list.listIndex + 1, 1);
    } else {
      boardx.lists.splice(item.list.listIndex, 1);
    }
    setBoard(boardx);
    setSaveBoardFlag(true);
  };

  const handleDeleteList = (list) => {
    const boardx = { ...board };
    boardx.lists.splice(list.listIndex, 1);
    setBoard(boardx);
    setSaveBoardFlag(true);
  };

  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPES.LIST,
    canDrop: (item, monitor) => {
      return true;
    },
    drop: (item, monitor) => {
      const droppedOverList = monitor.didDrop();
      handleListDropped(item, droppedOverList);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      //  ...but everything is over the board!
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
              handleDeleteList={handleDeleteList}
              setSaveBoardFlag={setSaveBoardFlag}
              key={index}
            />
          );
        })}
        {!addingList && (
          <button
            className="add-card-list-button"
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
            <div className="add-list-form-button-close">
              <input
                type="submit"
                className="green-add-button"
                value="Add List"
              />
              <img
                style={{
                  width: "25px",
                  height: "25px",
                }}
                src={x}
                onClick={() => setAddingList(false)}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Board;
