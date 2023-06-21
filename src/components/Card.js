import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Card({name_card, description_card}) {
  return (
    <div className="country col-sm-6 col-md-4 col-lg-3">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{name_card}</h5>
          <p>{description_card}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
