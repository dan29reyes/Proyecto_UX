import React, { useEffect, useState } from "react";
import Card from "./Card";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../styles/List.css'; // Import the external style.css file
import addIcon from "../images/add-icon.png";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import cancelIcon from "../images/cancel-icon.png"

const CardList = () => {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState({});
  const [showCardInputs, setShowCardInputs] = useState(false); // Track whether the card inputs should be displayed

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

  const toggleCardInputs = () => {
    setShowCardInputs(!showCardInputs);
  };

  return (
    <div className="container">
      <div className="column-wrapper">
        {lists?.map((list) => (
          <div className="column col-sm-6 col-md-4 col-lg-3" key={list.id_list}>
            <div>
              <h3 className="column-name">
                {list.name_list}
                <button className="options-button">...</button>
              </h3>
            </div>
            <div className="column-cards">
              {cards[list.id_list]?.map((card) => (
                <Card
                  key={card.id_card}
                  name_card={card.name_card}
                  description_card={card.description_card}
                />
              ))}
              {showCardInputs ? (
                <div>
                  <input type="text" placeholder="Nombre de la tarjeta" className="input-tarjeta"/>
                  <input type="text" placeholder="Descripcion" className="input-tarjeta"/>
                  <Button color="primary" className="add-tarjeta-confirm">Añadir una tarjeta</Button>
                  <button 
                    className="add-tarjeta-cancel" 
                    onClick={toggleCardInputs}>
                    <img className="cancel-icon" src={cancelIcon}/>
                  </button>
                </div>
              ) : (
                <button className="add-list-button" onClick={toggleCardInputs}>
                  <img className="add-button-icon" src={addIcon}/>
                  Añadir una tarjeta
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="column-wrapper">
          <div className="column col-sm-6 col-md-4 col-lg-3">
            <button className="add-list-button">
              <img className="add-button-icon" src={addIcon}/>
              Añadir una lista
            </button>
          </div>
        </div>
      </div>
      <div>
        <Link to="/Tablero">
          <Button
            className="regresar-tableros"
            color="secondary"
          >
            Regresar a Tableros
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CardList;
