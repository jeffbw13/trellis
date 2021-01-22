//  Popup box.  Will contain another Component
//  Main function is to pop up in a particular location on the screen
import React from "react";

const Popup = ({ style, children }) => {
  if (!style) {
    style = {};
  }
  return (
    <div className="popup" style={style}>
      {children}
    </div>
  );
};

export default Popup;
