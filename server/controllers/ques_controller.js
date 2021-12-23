const Question = require('../models/Question');
const Puzzle = require('../models/Puzzle');

module.exports.questionUpload = async (req, res) => {
   try {
      let questionData = req.body;
      const question = new Question(questionData);
      // console.log(questionData);
      question.save(err => {
         if (err) {
            res.send(err)
            console.log("Error in creating question");
         } else {
            console.log("Question created successfully");
         }
      })
   } catch (err) {
      console.log(err.message);
      res.status(500).send("Interal Server Error");
   }
}


module.exports.puzzleUpload = async (req, res) => {
   try {
      let questionData = req.body;
      const question = new Puzzle(questionData);
      // console.log(questionData);
      question.save(err => {
         if (err) {
            res.send(err)
            console.log("Error in creating question");
         } else {
            console.log("Question created successfully");
         }
      })
   } catch (err) {
      console.log(err.message);
      res.status(500).send("Interal Server Error");
   }
}