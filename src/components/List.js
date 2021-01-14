import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPE from "../../data/types";
import Card from "./Card";
import plus_sm from "../../images/plus-sm.svg";

const List = ({ list, handleCardDropped }) => {
  const [addingCard, setAddingCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);

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

  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    canDrop: (item, monitor) => {
      //  we will eventually use candrop to prevent dropping a column into
      //    another column, or a card outside a colum
      return true;
    },
    drop: (item, monitor) => {
      //  drop is called when the item is dropped over this component.
      //  react-dnd does not actually drop the object into the div viz html5.
      //  What "drop" needs to do is move the item into the data array for this column
      //    and delete it from the array it used to be in
      //console.log("item: ", item);
      //console.log("monitor: ", monitor);
      //alert("dropped!");
      handleCardDropped(item, list.listIndex, hoveredItem);
      //  onDrop would be passed in to To from the calling component which
      //    has access to all the data
      //  in Ryan's example, onDrop changes the status on the moved (dropped) item and
      //    resets the state in HomePage
      //onDrop(item, monitor, status);
    },
    collect: (monitor) => ({
      // why the parends?  BC returning an object literal.
      isOver: monitor.isOver(), // isOver() is a function found in the DropTargetMonitor
    }),
  });

  let className = "list";
  if (isOver) {
    className += " isOver";
  }

  return (
    <div className={className} ref={drop}>
      <h2>{list.header}</h2>
      {list.cards.map((card, index) => {
        card.listIndex = list.listIndex;
        card.cardIndex = index;
        return <Card card={card} key={index} setHoveredItem={setHoveredItem} />;
      })}
      {!addingCard && (
        <button className="add-card-button" onClick={() => setAddingCard(true)}>
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
          <input type="submit" value="Add Card" />
        </form>
      )}
    </div>
  );
};

export default List;
