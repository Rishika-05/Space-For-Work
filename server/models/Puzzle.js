const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   problem: {
      problemStatement: {
         type: String,
         required: true
      },
      inputFormat: {
         type: String,
         required: false,
      },
      outputFormat: {
         type: String,
         required: false,
      }
   },
   answer: {
      type: String,
      required: true
   },
   // difficulty: {
   //    type: String,
   //    required: true
   // },
   // tag: {
   //    type: String,
   //    required: true
   // }

}, {
   timestamps: true,
});
const Puzzle = mongoose.model('puzzle', questionSchema);

module.exports = Puzzle;