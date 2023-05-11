const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 30306;


const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'FranklinRodriguezTinoco06',
  database: 'trello'
});

// Endpoint para agregar una tarea
app.post('tareas', (req, res) => {
  const { description } = req.body;
  const query = `INSERT INTO tareas (description) VALUES ('${description}')`;

  connection.query(query, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

// Endpoint para obtener todas las tareas
app.get('/tareas', (req, res) => {
  const query = 'SELECT * FROM tareas';

  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
