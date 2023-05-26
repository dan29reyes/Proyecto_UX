import React from "react";

function Board({name_board, description_board, update_date}) {
  return (
    <div className="country col-sm-6 col-md-4 col-lg-3">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{name_board}</h5>
          <p className="card-text">{description_board}</p>
        </div>
      </div>
    </div>
  );
}

export default Board;
