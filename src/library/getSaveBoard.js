export const getBoard = () => {
  return fetch("http://localhost:3000/board/all").then((response) =>
    response.json()
  );
};

export const saveBoard = (board) => {
  console.log("saveBoard");
  return fetch("http://localhost:3000/board", {
    method: "POST",
    body: JSON.stringify(board),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  }).then((response) => response.json());
};

//export default getBoard;
