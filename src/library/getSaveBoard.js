const getBoard = () => {
  return fetch("http://localhost:3000/board/all").then((response) =>
    response.json()
  );
};

export default getBoard;
