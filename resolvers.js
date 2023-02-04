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

    //Add user
    addUser: async (parent, args) => {
        console.log(args)
        const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        const isValidEmail =  emailExpression.test(String(args.email).toLowerCase())
        
        if(!isValidEmail){
            throw new Error("email not in proper format")
        }

            let newUser = new User({
                username: args.username,
                email: args.email,
                password:args.password
            });
        const res = await newUser.save();

        const token = generateToken(res);

        return{
            ...res._doc,
            id:res._id,
            token
        };


        }

    }
  }