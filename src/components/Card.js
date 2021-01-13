import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
//import Window from './Window';
import ITEM_TYPE from "../../data/types";

const Card = ({ card }) => {
  const _id = 4;
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ITEM_TYPE,
      card: card,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  let className = "card";
  if (isDragging) {
    className += " isDragging";
  }

  return (
    <div className={className} ref={drag}>
      <h3>{card.desc}</h3>
      <h4>{card.status}</h4>
      This is Card {card.cardId}
    </div>
  );
};

export default Card;
