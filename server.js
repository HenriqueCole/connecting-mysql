const express = require('express');
const server = express();
const cors = require('cors');

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('connection', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}
).catch(err => {
  console.log("Deu erro: ", err);
});

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.json('Hello World');
});



server.listen(3000, () => {
  console.log('Server is running on port 3000');
});