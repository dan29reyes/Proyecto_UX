import React, { useEffect, useState } from "react";
import Card from "./Card";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../styles/List.css'; // Import the external style.css file

const CardList = () => {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState({});

  useEffect(() => {
    getLists();
  }, []);

  useEffect(() => {
    if (lists.length > 0) {
      getCards();
    }
  }, [lists]);

  const getLists = () => {
    const options = {
      method: 'POST',
      url: 'http://localhost:8000/lists/viewList',
      data: { id_board: localStorage.getItem("id_board")}
    };

    axios.request(options)
      .then(function (response) {
        setLists(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getCards = () => {
    const requests = lists.map((list) => {
      const options = {
        method: 'POST',
        url: 'http://localhost:8000/cards/viewCards',
        data: { id_list: list.id_list }
      };

      return axios.request(options)
        .then(function (response) {
          return { listId: list.id_list, cards: response.data };
        })
        .catch(function (error) {
          console.error(error);
          return { listId: list.id_list, cards: [] };
        });
    });

    Promise.all(requests)
      .then(function (results) {
        const columnData = {};

        results.forEach((result) => {
          columnData[result.listId] = result.cards;
        });

        setCards(columnData);
      });
  };

  return (
    <div className="container">
      <div className="row">
        {lists.map((list) => (
          <div className="column col-sm-6 col-md-4 col-lg-3" key={list.id_list}>
            <h3 className="column-name">{list.name_list}</h3>
              {cards[list.id_list]?.length > 0 ? (
              <div className="column-cards">
                {cards[list.id_list]?.map((card) => (
                  <Card
                    key={card.id_card}
                    name_card={card.name_card}
                    description_card={card.description_card}
                  />
                ))}
            </div>
            ) : (
            <div>
              <button>
                Create Tablero
              </button>
            </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
