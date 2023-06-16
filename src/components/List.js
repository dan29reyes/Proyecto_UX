import React, { useEffect, useState } from "react";
import Card from "./Card";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../styles/List.css'; // Import the external style.css file
import addIcon from "../images/add-icon.png";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import cancelIcon from "../images/cancel-icon.png"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
          const sortedCards = response.data.sort((a, b) => a.position_card - b.position_card);
          return { listId: list.id_list, cards: sortedCards };
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

  const getCardsById = async (_idList) => {
    const options = {
      method: 'POST',
      url: 'http://localhost:8000/cards/viewCards',
      data: { id_list: _idList}
    };
    return await axios.request(options)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.error(error);
          return [] ;
        });
  }

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

  const onDragEnd = async (result, lists) => {
    if (!result.destination) return;
      const { source, destination } = result;
      const sourceCards = await getCardsById(source.droppableId);
      const destCards = await getCardsById(destination.droppableId);
      const removed = sourceCards[source.index];
      sourceCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, removed);
      //Actualizar la lista de origen
      try{
        const options = {
          method: 'POST',
          url: 'http://localhost:8000/cards/updateCard',
          data: {
            id_card: removed.id_card,
            name_card: removed.name_card,
            description_card: removed.description_card,
            id_list: parseInt(destination.droppableId),
            position_card: destination.index
          }
        };
        console.log(options.data)
        await axios.request(options);
      }catch(error){
        console.error(error);
      }
      const newCards = await getCardsById(destination.droppableId);
      //Actualizar todas las posiciones de origin
      if (source.droppableId !== destination.droppableId) {
        for (let i = 0; i < sourceCards.length; i++) {
          const options = {
            method: 'POST',
            url: 'http://localhost:8000/cards/updateCard',
            data: { 
              id_card: sourceCards[i].id_card,
              name_card: sourceCards[i].name_card,
              description_card: sourceCards[i].description_card,
              id_list: parseInt(sourceCards[i].id_list),
              position_card: i+1
            }
          };
          await axios.request(options);
        }
      }
      //Actualizar todas las posiciones de destino
      for (let i = 0; i < newCards.length; i++) {
        let __position_card = 0;
        let pos = newCards[i].position_card
        if (pos === destination.index){
          for (let j = pos; j < newCards.length; j++) {
            console.log(j)
            newCards[j].position_card = j+1;
          }
        }
        __position_card = pos+1;
        
        const options = {
          method: 'POST',
          url: 'http://localhost:8000/cards/updateCard',
          data: { 
            id_card: newCards[i].id_card,
            name_card: newCards[i].name_card,
            description_card: newCards[i].description_card,
            id_list: parseInt(newCards[i].id_list),
            position_card: __position_card
          }
        };
        await axios.request(options);
      }
      getCards();
  };
  
  return (
    <DragDropContext onDragEnd={result => onDragEnd(result, lists)}>
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
                <Droppable droppableId={list.id_list.toString()}>{
                  (provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {cards[list.id_list]?.map((card, index) => (
                        <Draggable key={card.id_card} draggableId={card.id_card.toString()} index={index}>
                          {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card
                              key={card.id_card}
                              name_card={card.name_card}
                              description_card={card.description_card}
                              index={index}
                            />
                          </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
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
    </DragDropContext>
  );
};

export default CardList;
