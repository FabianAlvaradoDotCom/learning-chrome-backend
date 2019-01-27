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

// Senging the entire database

router.get('/all', (req, res) => {
  Question.find({}) // ,'-_id'
    .then(responsesArray => {
      res.status(200).json({ responsesArray });
    })
    .catch(err => {
      console.log(err);
    });
});

// Sending the request with a particuar subject to find
router.post('/random', (req, res) => {
  let subject = req.body.subject;
  let randomPicked = Math.random();

  Question.find({ subject }, '-_id')
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
});

// https://chrome-extension-app.herokuapp.com/

module.exports = router;
