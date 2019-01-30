const express = require('express');
const router = express.Router();

const Question = require('../../models/Question.js');

router.get('/', (req, res) => {
  res.status(200).send({ message: "'question' location hit" });
});

router.get(`/details/:id`, async (req, res) => {
  try {
    var question = await Question.findById(req.params.id); // ,'-_id'
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

  let numberofQuestions;
  let randomQuestionPicked;
  let positionInQuestionsArray;
  let questionSelected;

  //Finding one random question, improving performance by capturing only IDs
  Question.find(
    { subject },
    '-id -subject -questionTopic -questionPart1 -questionPart2 -questionPart3 -questionPart4 -questionPart5 -questionPart6 -questionPart7 -questionPart8 -questionPart9 -questionPart10 -questionPart11 -questionPart12 -questionPart13 -questionPart14 -questionPart15 -questionPart16 -questionPart17 -questionPart18 -questionPart19 -questionPart20 -q2type -q3type -q4type -q5type -q6type -q7type -q8type -q9type -q10type -q11type -q12type -q13type -q14type -q15type -q16type -q17type -q18type -q19type -q20type -answer -rows -type -contentType -placeHolder  -errorMessage -imageUrl -referenceUrl -referenceTime  -__v'
  )
    .then(responsesArray => {
      numberofQuestions = responsesArray.length;
      randomQuestionPicked =
        Math.round(randomPicked * (responsesArray.length - 1)) + 1;
      positionInQuestionsArray = Math.round(
        randomPicked * (responsesArray.length - 1)
      );
      questionSelected =
        responsesArray[Math.round(randomPicked * (responsesArray.length - 1))];

      // With the above retrieved question we send the data
      Question.findOne({ _id: questionSelected }, '-_id -__v') // ,'-_id'
        .then(response => {
          res.status(200).json({
            numberofQuestions,
            random: randomPicked,
            randomQuestionPicked,
            questionResponse: response
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

// https://chrome-extension-app.herokuapp.com/

module.exports = router;
