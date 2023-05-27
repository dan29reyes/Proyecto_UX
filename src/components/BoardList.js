import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Board from "./Board";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../styles/Boards.css';

const BoardList = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = () => {
    const options = {
      method: 'POST',
      url: 'http://localhost:8000/boards/viewBoard',
      data: { id_user: 8}
    };
    return axios.request(options)
      .then(function (response) {
        console.log(response)
        setBoards(response.data);
      })
      .catch(function (error) {
        throw error;
    });
  }

  const formatUpdateDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format the date as per the user's local time zone
  }

  return (
    <div className="container">
      <h1>Tableros</h1>
      <div className="row">
        {boards.length > 0 ? (
          boards.map((board) => (
            <div key={board.id_board}>
              <Link className="board-button" to="/Proyecto">
                <button className="board-button">
                  <Board
                    name_board={board.name_board}
                    description_board={board.description_board}
                    update_date={formatUpdateDate(board.update_date)}
                  />
                </button>
              </Link>
            </div>
          ))
        ) : (
          <div>No boards found.</div>
        )}
      </div>
    </div>
  );
};

export default BoardList;
