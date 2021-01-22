import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import ITEM_TYPES from "../../data/types";
import Card from "./Card";
import Popup from "./Popup";
import ListMenu from "./ListMenu";
import plus_sm from "../../images/plus-sm.svg";
import x from "../../images/x.svg";
import dots_horizontal from "../../images/dots-horizontal.svg";

const List = ({
  list,
  handleCardDropped,
  setHoveredListIndex,
  handleDeleteList,
  setSaveBoardFlag,
}) => {
  const [listHeader, setListHeader] = useState(list.header);
  const [addingCard, setAddingCard] = useState(false);
  const [cardHeader, setCardHeader] = useState("");
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [showMenuPopup, setShowMenuPopup] = useState(false);

  const handleAddCard = (event) => {
    event.preventDefault();
    if (!cardHeader) return;
    const card = {
      header: cardHeader,
      status: "incomplete",
      cardIndex: list.cards.length + 1,
    };
    //  this needs to add column to database.
    list.cards.push(card);
    setAddingCard(false);
    setSaveBoardFlag(true);
  };

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ITEM_TYPES.LIST,
      list: list,
    },

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleDeleteCard = (card) => {
    list.cards.splice(card.cardIndex, 1);
    setSaveBoardFlag(true);
  };

  const [{ isOver }, drop] = useDrop({
    accept: [ITEM_TYPES.CARD, ITEM_TYPES.LIST],
    canDrop: (item, monitor) => {
      //  allow drop of list but don't handle it.  To find out if list was
      //    hovering over another list.
      return true;
    },
    drop: (item, monitor) => {
      const droppedOverCard = monitor.didDrop();
      if (item.type === ITEM_TYPES.CARD) {
        handleCardDropped(
          item,
          list.listIndex,
          hoveredCardIndex,
          droppedOverCard
        );
      }
    },
    hover(item, monitor) {
      setHoveredListIndex(list.listIndex);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(), // isOver() is a function found in the DropTargetMonitor
    }),
  });

  useEffect(() => {
    // was causing column headers to get jumbled on drag/drop
    // needs to be done some other way.
    //list.header = listHeader;
    //setSaveBoardFlag(true);
  }, [listHeader]);

  let className = "list";
  if (isOver) {
    className += " isOverList";
  }

  return (
    <div className={className} ref={drop}>
      <div ref={drag}>
        <div className="list-header">
          {/*
          <input
            type="text"
            style={{
              border: "none",
              width: "80%",
              fontSize: "1em",
              fontWeight: "700",
              backgroundColor: "#ebecf0",
            }}
            value={listHeader}
            onChange={(event) => setListHeader(event.target.value)}
          />
          */}
          {list.header}
          <img
            style={{ width: "15px", height: "15px" }}
            src={dots_horizontal}
            onClick={() => setShowMenuPopup(!showMenuPopup)}
          />
        </div>

        {list.cards.map((card, index) => {
          card.listIndex = list.listIndex;
          card.cardIndex = index;
          return (
            <Card
              card={card}
              key={index}
              hoveredCardIndex={hoveredCardIndex}
              setHoveredCardIndex={setHoveredCardIndex}
              handleDeleteCard={handleDeleteCard}
              setSaveBoardFlag={setSaveBoardFlag}
            />
          );
        })}
        {!addingCard && (
          <button
            className="add-card-list-button"
            onClick={() => setAddingCard(true)}
          >
            <img src={plus_sm} />
            Add another card
          </button>
        )}
        {addingCard && (
          <form className="add-card-form" onSubmit={handleAddCard}>
            <textarea
              placeholder="Enter a title for this card..."
              onChange={(event) => setCardHeader(event.target.value)}
            ></textarea>
            <div className="add-card-form-button-close">
              <input
                type="submit"
                className="green-add-button"
                value="Add Card"
              />
              <img
                style={{
                  width: "25px",
                  height: "25px",
                }}
                src={x}
                onClick={() => setAddingCard(false)}
              />
            </div>
          </form>
        )}
      </div>
      {showMenuPopup && (
        <Popup>
          <ListMenu
            list={list}
            setShowMenuPopup={setShowMenuPopup}
            setAddingCard={setAddingCard}
            handleDeleteList={handleDeleteList}
          />
        </Popup>
      )}
    </div>
  );
};

export default List;
