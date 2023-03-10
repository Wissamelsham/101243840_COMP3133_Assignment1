const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Enter your User Name'],
    trim: true,
    lowercase: true,

  },
  email: {
    type: String,
    required: true,
    //index: true, //Optional if unique is defined
    unique: [true, "Duplicate Email Not allowed"],
    trim: true,
    validate: function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }
  },
  password: {
    type: String,
    required: [true,'Enter your Password'],
    minlength:6,
  },


  
});

module.exports = mongoose.model('User', UserSchema);


