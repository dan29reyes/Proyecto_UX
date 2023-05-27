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

  const getBoards = async () => {
    try {
      const response = await axios.post('http://localhost:8000/boards/viewBoard', { id_user: 8 });
      console.log(response.data);
      setBoards(response.data);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {boards.length > 0 ? (
          boards.map((board) => (
            <div key={board.id_board}>
              <Link to="/Proyecto">
                <button className="board-button">
                  <Board
                    name_board={board.name_board}
                    description_board={board.description_board}
                    update_date={board.update_date}
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
