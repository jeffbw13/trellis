import React from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./components/Board";
import Header from "./components/Header";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Header />
        <Board />
      </div>
    </DndProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

//  our data structure:
//  cards are held within the data structures that are saved to mongo
//  no unique index is really necessary - they are array elements.

//  Board.js - meta info & cols[] array to hold ids of all columns
//
