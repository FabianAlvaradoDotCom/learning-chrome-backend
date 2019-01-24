'use strict';

//Creating and starting the express server
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const questions = require('./routes/api/questions.js');

let server = app.listen(port, () => {
  console.log(`Server running on port: ${server.address().port}`);
});

//Connecting to the DB
const mongoose = require('mongoose');
const db = require('./config/keys.js').mongoDB;
mongoose
  .connect(
    db,
    { useMongoClient: true }
  )
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    `There was an error when tried to connect to the database: \n $ {err}`;
  });

app.use('/question', questions);
