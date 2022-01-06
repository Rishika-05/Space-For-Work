const Question = require('../models/Question');
const Puzzle = require('../models/Puzzle');
const User = require('../models/adminuser');

module.exports.questionUpload = async (req, res) => {
   try {
      let questionData = req.body;
      let user = await User.findById(req.query.user);
      
      const question = new Question(questionData);
      // console.log(questionData);
      user.questionsCreated.push(question._id);
      question.save(err => {
         if (err) {
            res.send(err)
            console.log("Error in creating question");
         } else {
            console.log("Question created successfully");
            user.save();
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
      let user = await User.findById(req.query.user);
      user.puzzlesCreated.push(question._id);
      console.log(questionData);
      question.save(err => {
         if (err) {
            res.send(err)
            console.log("Error in creating question");
         } else {
            console.log("Question created successfully");
            user.save();
         }
      })
   } catch (err) {
      console.log(err.message);
      res.status(500).send("Interal Server Error");
   }
}