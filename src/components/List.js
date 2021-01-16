import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import ITEM_TYPES from "../../data/types";
import Card from "./Card";
import plus_sm from "../../images/plus-sm.svg";

const List = ({ list, handleCardDropped, setHoveredListIndex }) => {
  const [addingCard, setAddingCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  const handleAddCard = (event) => {
    event.preventDefault();
    //  do we need cardId?  Card will always be inside an array in list.
    const card = {
      cardId: list.cards.length + 1,
      desc: cardTitle,
      status: "incomplete",
      cardIndex: list.cards.length + 1,
    };
    //  this needs to add column to database.
    list.cards.push(card);
    setAddingCard(false);
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
      return item.type === ITEM_TYPES.CARD;
    },
    drop: (item, monitor) => {
      //  problem: hoveredCardIndex is LAST card hovered over
      //  what if we aren't currently hovering over a card?
      //  can we set this back to null somehow?
      handleCardDropped(item, list.listIndex, hoveredCardIndex);
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
    className += " isOver";
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
            />
          );
        })}
        {!addingCard && (
          <button
            className="add-card-button"
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
              onChange={(event) => setCardTitle(event.target.value)}
            ></textarea>
            <br />
            <input type="submit" value="Add Card" />
          </form>
        )}
      </div>
    </div>
  );
};

export default List;
