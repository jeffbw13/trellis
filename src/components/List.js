import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import ITEM_TYPES from "../../data/types";
import Card from "./Card";
import plus_sm from "../../images/plus-sm.svg";
import x from "../../images/x.svg";

const List = ({
  list,
  handleCardDropped,
  setHoveredListIndex,
  setSaveBoard,
}) => {
  const [addingCard, setAddingCard] = useState(false);
  const [cardHeader, setCardHeader] = useState("");
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  const handleAddCard = (event) => {
    event.preventDefault();
    if (!cardHeader) return;
    //  do we need cardId?  Card will always be inside an array in list.
    const card = {
      header: cardHeader,
      status: "incomplete",
      cardIndex: list.cards.length + 1,
    };
    //  this needs to add column to database.
    list.cards.push(card);
    setAddingCard(false);
    setSaveBoard(true);
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

  const [{ isOver }, drop] = useDrop({
    accept: [ITEM_TYPES.CARD, ITEM_TYPES.LIST],
    canDrop: (item, monitor) => {
      //  we will eventually use candrop to prevent dropping a column into
      //    another column, or a card outside a colum
      //return item.type === ITEM_TYPES.CARD;
      //  allow drop of list but don't handle it
      return true;
    },
    drop: (item, monitor) => {
      const droppedOverCard = monitor.didDrop();
      alert("dropped over list!");
      //  problem: hoveredCardIndex is LAST card hovered over
      //  what if we aren't currently hovering over a card?
      //  can we set this back to null somehow?
      //alert("dropped over list! didDorp=" + didDrop);
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

  let className = "list";
  if (isOver) {
    className += " isOverList";
  }

  return (
    <div className={className} ref={drop}>
      <div ref={drag}>
        <h2>{list.header}</h2>
        {list.cards.map((card, index) => {
          card.listIndex = list.listIndex;
          card.cardIndex = index;
          return (
            <Card
              card={card}
              key={index}
              hoveredCardIndex={hoveredCardIndex}
              setHoveredCardIndex={setHoveredCardIndex}
              setSaveBoard={setSaveBoard}
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
    </div>
  );
};

export default List;
