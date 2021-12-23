const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   email: {
      type: String,
      require: true,
      unique: true
   },
   password: {
      type: String,
      require: true,
   },
   name: {
      type: String,
      required: true,
   },
   country: {
      type: String,
      required: false,
      default: "-",
   },
   questionsCreated: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Question',
      }
   ]
}, {
   timestamps: true,
});
const Admin = mongoose.model('admin_user', userSchema);

module.exports = Admin;