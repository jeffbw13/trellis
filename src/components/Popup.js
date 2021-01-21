//  Popup box.  Will contain another Component
//  Main function is to pop up in a particular location on the screen
import React from "react";

const Popup = ({ children }) => {
  return <div className="popup">{children}</div>;
};

export default Popup;
