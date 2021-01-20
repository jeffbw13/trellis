import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import CardModal from "react-modal";
import CardDetail from "./CardDetail";
//import Window from './Window';
import ITEM_TYPES from "../../data/types";
import eye from "../../images/eyeball.svg";
import text from "../../images/text.svg";

const Card = ({
  card,
  hoveredCardIndex,
  setHoveredCardIndex,
  setSaveBoard,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const _id = 4;
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

    hover: (item, monitor) => {
      setHoveredCardIndex(card.cardIndex);
    },

    drop: (item, monitor) => {
      //  we allow drop over the card but don't handle it,so that
      //    List knows there was a drop over card (didDrop())
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(), // isOver() is in DropTargetMonitor
    }),
  });

  let className = "card";
  if (isDragging) {
    className += " isDragging";
  }

  if (isOver) {
    className += " isOverCard";
  }

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "45rem",
      height: "90%",
      borderRadius: "1%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#F4F5F7",
    },
  };

  CardModal.setAppElement("#modal");

  return (
    <>
      <div ref={drop}>
        <div
          className={className}
          ref={drag}
          onClick={() => setModalOpen(!modalOpen)}
        >
          <h3>{card.header}</h3>
          <h4>{card.status}</h4>
          <img
            style={{ width: "17px", height: "15px", stroke: "lightGrey" }}
            src={eye}
          />
          {card.description && (
            <img style={{ width: "17px", height: "17px" }} src={text} />
          )}
        </div>
      </div>
      <CardModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={modalStyles}
      >
        <CardDetail
          card={card}
          setModalOpen={setModalOpen}
          setSaveBoard={setSaveBoard}
        />
      </CardModal>
    </>
  );
};

export default Card;
