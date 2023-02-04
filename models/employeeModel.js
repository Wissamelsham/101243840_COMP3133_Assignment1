const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({

  firstname: {
    type: String,
    required: [true, 'Enter the First Name']
  },

  lastname: {
    type: String,
    required: [true, 'Enter the Last Name']
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
  gender: {
    type: String,
    required: [true,'Enter the Gender']
  },
  salary: {
    type: Number,
    required: [true,'Enter the Salary']
  }

  
});

module.exports = mongoose.model('Employee', EmployeeSchema);


