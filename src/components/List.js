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
  const [showListInput, setShowListInput] = useState({});
  const [showCardInputs, setShowCardInputs] = useState({});
  const [formList, setFormList] = useState({
    name_list: '',
    id_board: parseInt(localStorage.getItem("id_board")),
    position_list: 0
  });
  const [formCard, setFormCard] = useState({
    name_card: '',
    description_card: '',
    id_list: 0,
    position_card:0
  });

  const handleChangeList = (e) => {
    const { name, value } = e.target;
    setFormList((prevState) => ({
      ...prevState,
      [name]: value
    }));
    console.log(formList)
  }

  const handleChangeCard = (e) => {
    const { name, value } = e.target;
    setFormCard((prevState) => ({
      ...prevState,
      [name]: value
    }));
    console.log(formCard)
  }

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

  const toggleListInput = () => { 
    setShowListInput(!showListInput)
  }

  const toggleCardInputs = (listId) => {
    setShowCardInputs(prevState => ({
      ...prevState,
      [listId]: !prevState[listId]
    }));
  };

  const addNewCard = async (e) => {
    try {
      const options = {
        method: 'POST',
        url: 'http://localhost:8000/cards/createCard',
        data: { 
          name_card: formCard.name_card,
          description_card: formCard.description_card,
          id_list: formCard.id_list,
          position_card: formCard.position_card
        }
      };
      const response = await axios.request(options);
      toggleCardInputs(formCard.id_list);
      getCards();
    } catch (error) {
      console.error(error);
    }
  }

  const addNewList = async (e) => {
    try{
      const options = {
        method: 'POST',
        url: "http://localhost:8000/lists/createList",
        data: {
          name_list: formList.name_list,
          id_board: formList.id_board,
          position_list: formList.position_list
        }
      };
      const response = await axios.request(options);
      toggleListInput();
      getLists();
      getCards();
    }catch (error) {
      console.error(error);
    }
  }

  return (
      <div className="container">
        <div className="column-wrapper">
          {lists?.map((list) => (
            <div className="column col-sm-6 col-md-4 col-lg-3" key={list.id_list}>
              <div>
                <h3 className="column-name">
                  {list.name_list}
                  {/* <button className="options-button">...</button> */}
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
                {showCardInputs[list.id_list] ? (
                  formCard.id_list=list.id_list,
                  formCard.position_card=(cards[list.id_list].length+1),
                  <div>
                    <form>
                      <input 
                        type="text" 
                        placeholder="Introduza el titulo para esta tarjeta" 
                        className="input-tarjeta"
                        id="name_card"
                        name="name_card"
                        onChange={handleChangeCard}
                      />
                      <input 
                        type="text" 
                        placeholder="Introduza una descripcion" 
                        className="input-tarjeta"
                        id="description_card"
                        name="description_card"
                        onChange={handleChangeCard}
                      />
                    </form>
                    <Button 
                      color="primary" 
                      className="add-tarjeta-confirm"
                      onClick={addNewCard}
                      >Añadir una tarjeta
                    </Button>
                    <button 
                      className="add-tarjeta-cancel" 
                      onClick={() => toggleCardInputs(list.id_list)}>
                      <img className="cancel-icon" src={cancelIcon}/>
                    </button>
                  </div>
                ) : (
                  <button className="add-list-button" onClick={() => toggleCardInputs(list.id_list)}>
                    <img className="add-button-icon" src={addIcon}/>
                    Añadir una tarjeta
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="new-column col-sm-6 col-md-4 col-lg-3">
            {showListInput ? (
              <button className="add-list-button" onClick={() => toggleListInput()}>
                <img className="add-button-icon" src={addIcon}/>
                Añadir otra lista
              </button>
            ) : (
              formList.position_list=(lists.length+1),
              <div>
                <form>
                  <input 
                    type="text" 
                    placeholder="Introduza el titulo de la lista" 
                    className="input-tarjeta"
                    id="name_list"
                    name="name_list"
                    onChange={handleChangeList}
                  />
                </form>
                <Button 
                  color="primary" 
                  className="add-lista-confirm"
                  onClick={addNewList}
                  >Añadir lista
                </Button>
                <button 
                  className="add-lista-cancel" 
                  onClick={() => toggleListInput()}>
                  <img className="lista-cancel-icon" src={cancelIcon}/>
                </button>
              </div>
            )}
          </div>
        </div>
      <div>
        <Link to="/Tablero">
          <Button
            className="regresar-tableros"
            color="secondary">
            Regresar a Tableros
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CardList;
