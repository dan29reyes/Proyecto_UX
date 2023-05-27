import React from "react";

function Board({ name_board, description_board, update_date }) {
  return (
    <div className="board">
      <div className="board-title">{name_board}</div>
      <div className="board-description">{description_board}</div>
      <div className="board-update-date">{update_date}</div>
    </div>
  );
}

export default Board;
