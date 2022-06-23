const express = require('express');
const server = express();
const cors = require('cors');

const { Sequelize, DataTypes } = require('sequelize');
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

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
  {
    createdAt: false,
    updatedAt: false
  }
);

server.post('/users', (req, res) => {
  const { firstName, lastName } = req.body;

  User.create({
    firstName,
    lastName
  }).then(user => {
    res.json(user);
  }
  ).catch(err => {
    res.json(err);
  }
  );
});


server.listen(3000, async () => {
  await sequelize.sync();
  console.log('Server is running on port 3000');
});

