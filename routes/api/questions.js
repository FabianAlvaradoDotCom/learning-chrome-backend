const express = require('express');
const router = express.Router();

const Question = require('../../models/Question.js');

router.get('/', (req, res) => {
  res.status(200).send({ message: 'Connected to the port' });
});

router.get(`/details/:id`, async (req, res) => {
  try {
    var question = await Question.findById(req.params.id, `-password -__id`);
    res.send(question);
  } catch (error) {
    console.log(error);
    res.sendStatus(200);
  }
});

//https://learning-system-fabian.herokuapp.com
// /question-details/5a6efc56ce10e66a971b5f08

module.exports = router;
