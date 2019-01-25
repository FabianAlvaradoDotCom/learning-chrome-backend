const express = require('express');
const router = express.Router();

const Question = require('../../models/Question.js');

router.get('/', (req, res) => {
  res.status(200).send({ message: "'question' location hit" });
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

router.get('/random', (req, res) => {
  let randomPicked = Math.random();

  Question.find({}, '-_id')
    .then(responsesArray => {
      res.status(200).json({
        numberofQuestions: responsesArray.length,
        random: randomPicked,
        randomQuestionPicked:
          Math.round(randomPicked * (responsesArray.length - 1)) + 1,
        positionInQuestionsArray: Math.round(
          randomPicked * (responsesArray.length - 1)
        ),
        selected:
          responsesArray[Math.round(randomPicked * (responsesArray.length - 1))]
      });
    })
    .catch(err => {
      console.log(err);
    });

  // res.status(200).json({ random: 'Random question sent' });
  // console.log('Random question sent');
});

//https://learning-system-fabian.herokuapp.com
// /question/details/5a6efc56ce10e66a971b5f08

module.exports = router;
