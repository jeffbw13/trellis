import React from "react";
import x from "../../images/x.svg";

const ListMenu = ({
  list,
  setShowMenuPopup,
  setAddingCard,
  handleDeleteList,
}) => {
  return (
    <>
      <div className="list-menu">
        <div style={{ width: "100%", alignText: "center" }}>List Actions</div>
        <hr />
        <span
          onClick={() => {
            setShowMenuPopup(false);
            setAddingCard(true);
          }}
        >
          Add Card...
        </span>
        <br />
        Copy List...
        <br />
        Move List...
        <br />
        Watch
        <br />
        <hr />
        Sort by...
        <hr />
        Move All Cards in this List...
        <br />
        Archive All Cards in this List...
        <hr />
        <span
          onClick={() => {
            setShowMenuPopup(false);
            handleDeleteList(list);
          }}
        >
          Archive this List
        </span>
        <img
          style={{
            width: "15px",
            height: "15px",
            position: "absolute",
            top: "15px",
            right: "15px",
          }}
          src={x}
          onClick={() => setShowMenuPopup(false)}
        />
      </div>
    </>
  );
};

export default ListMenu;
