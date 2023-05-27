import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Board from "./Board";
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../styles/Boards.css';

const BoardList = () => {
  const modalStyles = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  }
  
  const [boards, setBoards] = useState([]);
  const [modal, setModal] = useState(false);

  const abrirModal = () => {
    setModal(!modal);
  }

  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = () => {
    const options = {
      method: 'POST',
      url: 'http://localhost:8000/boards/viewBoard',
      data: { id_user: localStorage.getItem("id_user")}
    };
    return axios.request(options)
      .then(function (response) {
        setBoards(response.data);
      })
      .catch(function (error) {
        throw error;
    });
  }

  const formatUpdateDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  const cerrarSesion = () => {
    localStorage.clear();
  }

  const handleBoardClick = (id_board) => {
    localStorage.setItem("id_board", id_board);
  }

  // const addNewBoard = () => {
  //   const options = {
  //     method: 'POST',
  //     url: 'http://localhost:8000/boards/createBoard',
  //     data: { id_user: 8}
  //   };
  //   return axios.request(options)
  //     .then(function (response) {
  //       console.log(response)
  //       setBoards(response.data);
  //     })
  //     .catch(function (error) {
  //       throw error;
  //   });
  // }

  return (
    <div className="container">
      <h1>Tableros</h1>
      <div className="row">
        {boards.length > 0 ? (
          boards.map((board) => (
            <div key={board.id_board}>
              <Link className="board-button" to="/Proyecto" onClick={()=>handleBoardClick(board.id_board)}>
                <button className="board-button">
                  <Board
                    name_board={board.name_board}
                    description_board={board.description_board}
                    update_date={formatUpdateDate(board.update_date)}
                    style={"board"}
                  />
                </button>
              </Link>
            </div>
          ))
        ) : (
          <div>No boards found.</div>
        )}
      </div>
        <button className="board-button" onClick={abrirModal}>
          <Board
            name_board={"Crear Tablero"}
            style={"newBoard"}
          />
          <Modal isOpen={modal} style={modalStyles}>
            <ModalHeader>
              Nuevo Tablero
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label >Nombre Tablero</Label>
                <Input type="text"></Input>
              </FormGroup>
              <FormGroup>
                <Label >Descripcion</Label>
                <Input type="text"></Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Crear</Button>
              <Button color="secondary" onClick={abrirModal}>Cancelar</Button>
            </ModalFooter>
          </Modal>
        </button>
        <div>
          <Link to="/inicioSesion">
            <button variant="warning" className="board-cerrar-sesion" onClick={cerrarSesion}>
              Cerrar Sesion
            </button>
          </Link>
        </div>
    </div>
  );
};

export default BoardList;
