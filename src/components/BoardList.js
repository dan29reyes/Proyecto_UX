import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Board from "./Board";
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../styles/Boards.css';

const BoardList = () => {
  const [form, setForm] = useState({
    name_board: '',
    description_board: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const addNewBoard = async (e) => {
    try {
      const options = {
        method: 'POST',
        url: 'http://localhost:8000/boards/createBoard',
        data: { 
          name_board: form.name_board, 
          id_user: parseInt(localStorage.getItem("id_user")), 
          description_board: form.description_board
        }
      };
      const response = await axios.request(options);
      getBoards();
      abrirModal();
    } catch (error) {
      console.error(error);
    }
  }

  const modalStyles = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  }
  
  const [modal, setModal] = useState(false);

  const abrirModal = () => {
    setModal(!modal);
  }

  const [hoveredBoard, setHoveredBoard] = useState(null);

  const handleMouseEnter = (boardId) => {
    setHoveredBoard(boardId);
  }

  const handleMouseLeave = () => {
    setHoveredBoard(null);
  }

  const [boards, setBoards] = useState([]);

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

  const deleteBoard = async (id_board) => {
    try {
      const options = {
        method: 'POST',
        url: 'http://localhost:8000/boards/deleteBoard',
        data: { id_board: id_board }
      };
      await axios.request(options);
      getBoards();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Tableros</h1>
      <div className="row">
        {boards.length > 0 ? (
          <div className="column-container">
            {boards.map((board) => (
              <div
                key={board.id_board}
                className="board-button"
                onMouseEnter={() => handleMouseEnter(board.id_board)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to="/Proyecto"
                  onClick={() => handleBoardClick(board.id_board)}
                >
                  <Board
                    name_board={board.name_board}
                    description_board={board.description_board}
                    update_date={formatUpdateDate(board.update_date)}
                    style={"board"}
                  />
                </Link>
                {hoveredBoard === board.id_board && (
                  <Button
                    className="deleteBoard"
                    color="danger"
                    onClick={() => deleteBoard(board.id_board)}
                  >
                    Eliminar Tablero
                  </Button>
                )}
              </div>
            ))}
            <button className="board-button" onClick={abrirModal}>
              <Board
                name_board={"Crear Tablero"}
                style={"newBoard"}
              />
            </button>
          </div>
        ) : (
          <button className="board-button" onClick={abrirModal}>
            <Board
              name_board={"Crear Tablero"}
              style={"newBoard"}
            />
          </button>
        )}
      </div>
      <div>
        <Link to="/inicioSesion">
          <button
            variant="warning"
            className="board-cerrar-sesion"
            onClick={cerrarSesion}
          >
            Cerrar Sesion
          </button>
        </Link>
      </div>
      <Modal isOpen={modal} style={modalStyles}>
        <ModalHeader>Nuevo Tablero</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Nombre Tablero</Label>
            <Input
              type="text"
              id="name_board"
              name="name_board"
              onChange={handleChange}
            />
            <Label>Descripcion</Label>
            <Input
              type="text"
              id="description_board"
              name="description_board"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addNewBoard}>
            Crear
          </Button>
          <Button color="secondary" onClick={abrirModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default BoardList;
