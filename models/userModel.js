const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Enter your User Name'],
    trim: true,
    lowercase: true,

  },
  firstname: {
    type: String,
    required: [true, 'Enter your First Name']
  },

  lastname: {
    type: String,
    required: [true, 'Enter your Last Name']
  },
  password: {
    type: String,
    required: [true,'Enter your Password'],
    minlength:6,
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
  type: {
    type: String,
    required: [true]
  }

  
});

module.exports = mongoose.model('User', UserSchema);


