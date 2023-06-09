import React from "react";

function Board({ name_board, description_board, update_date, style,deleteBoard }) {
  return (
    <div className={style}>
      <div className="board-title">{name_board}</div>
      <div className="board-description">{description_board}</div>
      <div className="board-update-date">{update_date}</div>
      <div className="board-delete">{deleteBoard}</div>

    </div>
  );
}

export default Board;
