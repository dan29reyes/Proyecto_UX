import React, { useEffect, useState } from "react";
import Card from "./Card";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../styles/List.css'; // Import the external style.css file

const CardList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getCards();
  }, []);

  const getCards = () => {
    const options = {
      method: 'POST',
      url: 'http://localhost:8000/cards/view',
    };

    axios.request(options).then(function (response) {
      setCards(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  const getColumnData = () => {
    const columnData = {};

    cards.forEach((card) => {
      if (!columnData[card.id_list]) {
        columnData[card.id_list] = [];
      }

      columnData[card.id_list].push(card);
    });

    return columnData;
  };

  const columnData = getColumnData();

  return (
    <div className="container">
      <div className="row">
        {Object.values(columnData).map((column, index) => (
          <div className="column col-sm-6 col-md-4 col-lg-3" key={index}>
            <h3 className="column-name">hola</h3>
            <div className="column-cards">
              {column.map((card) => (
                <Card
                  key={card.id_card}
                  name_card={card.name_card}
                  description_card={card.description_card}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardList;
