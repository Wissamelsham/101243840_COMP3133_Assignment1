const User = require('./models/userModel');
const jwt =require('jsonwebtoken');
const {validateLoginInput} = require('./validation');
const { UserInputError } = require('apollo-server-express');
const checkAuth = require('./checkauth');
require('dotenv').config();



function generateToken(user){
    return jwt.sign({
        id: user.id,
        email:user.email,
        username:user.username,
        type:user.type
    },process.env.SECRET_KEY,{expiresIn: '1h'});
}



exports.resolvers = {
    Query: {

        //View Users
        getUser: async (parent, args) => {
            return await User.find({});
        },

       

    },
    
   
    Mutation: {


    }
  }