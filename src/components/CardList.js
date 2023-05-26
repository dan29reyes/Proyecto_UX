import React, { useEffect, useState } from "react";
import Card from "./Card";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

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

  return (
    <div className="container">
      <div className="row">
        {cards.map((card) => (
          <Card
            key={card.id_card}
            name_card={card.name_card}
            description_card={card.description_card}
          />
        ))}
      </div>
    </div>
  );
}

export default CardList;
