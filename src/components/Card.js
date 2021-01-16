import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
//import Window from './Window';
import ITEM_TYPES from "../../data/types";

const Card = ({ card, hoveredCardIndex, setHoveredCardIndex }) => {
  const _id = 4;
  //  this HAS to be called "ref"!!
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ITEM_TYPES.CARD,
      card: card,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  //  this is only used to detect hover
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPES.CARD,

    // hover: (item, monitor) => {
    //   setHoveredCardIndex(card.cardIndex);
    // },
    collect: (monitor) => ({
      isOver: monitor.isOver(), // isOver() is a function found in the DropTargetMonitor
    }),
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

  useEffect(() => {
    if (isOver) {
      setHoveredCardIndex(card.cardIndex);
    } else {
      if (hoveredCardIndex === card.cardIndex) {
        //  this seemed to be reversing the above
        //setHoveredCardIndex(null);
      }
    }
  }, [isOver]);

  let className = "card";
  if (isDragging) {
    // className += " isDragging";
  }

  //  not happening
  if (isOver) {
    className += " isOver";
    //setHoveredCardIndex(card.cardIndex);

    //alert("isOver");
  }

  return (
    <div ref={drop}>
      <div className={className} ref={drag}>
        <h3>{card.header}</h3>
        <h4>{card.status}</h4>
        This is BubbaCard {card.cardId}
      </div>
    </div>
  );
};

export default Card;
