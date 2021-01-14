import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
//import Window from './Window';
import ITEM_TYPE from "../../data/types";

const Card = ({ card, setHoveredItem }) => {
  const _id = 4;
  //  this HAS to be called "ref"!!
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ITEM_TYPE,
      card: card,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  //  this is only used to detect hover
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,

    hover(item, monitor) {
      setHoveredItem(card.cardIndex);
    },
    /*
      alert("hovering");
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      //moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;

    },
    */
  });

  let className = "card";
  if (isDragging) {
    className += " isDragging";
  }

  //  not happening
  if (isOver) {
    className += " isOver";
    alert("isOver");
  }

  return (
    <div ref={drop}>
      <div className={className} ref={drag}>
        <h3>{card.desc}</h3>
        <h4>{card.status}</h4>
        This is Card {card.cardId}
      </div>
    </div>
  );
};

export default Card;
