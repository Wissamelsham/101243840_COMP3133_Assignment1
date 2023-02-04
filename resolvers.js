const User = require('./models/userModel');
const Employee = require('./models/employeeModel');
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
    },process.env.SECRET_KEY,{expiresIn: '1h'});
}



exports.resolvers = {
    Query: {

        //View Users
        getUser: async (parent, args) => {
            return await User.find({});
        },

        //Login
        async login(_,{username,password}){
            const {errors,valid} = validateLoginInput(username,password);
            const user = await User.findOne({username});
    
            if(!valid){
                throw new UserInputError('Errors',{errors});
            } 
    
    
            if(!user){
                errors.general ="User not found";
                throw new UserInputError('User not found',{errors});
            }
            
    
            if(password!=user.password){
                errors.general ="Wrong credentials";
                throw new UserInputError('Wrong credentials',{errors});
            }
    
            const token = generateToken(user);
    
            return{
                ...user._doc,
                id:user._id,
                token
            };
        },

        //View a Employee
        async getEmployee(_,{id}){
            try{
                const Employee1 = await Employee.findById(id)
                if(Employee1){
                    return Employee1;
                }else{
                    throw new Error('Employee not found');
                }
            }catch(err){
                throw new Error(err);
            }
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
        },

        addNewEmployee: async (parent, args,context) => {
            console.log(args)
            const employee = checkAuth(context);
            const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            const isValidEmail =  emailExpression.test(String(args.email).toLowerCase())
            
            if(!isValidEmail){
                throw new Error("email not in proper format")
            }
    
                let newEmployee = new Employee({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    email:args.email,
                    gender:args.gender,
                    salary:args.salary
                });

            return  await newEmployee.save();

            },

        updateEmployee: async (parent, args, context) => {
                console.log(args)
                const employee = checkAuth(context);
                const updates = {};
                if (args.firstname) updates.firstname = args.firstname;
                if (args.lastname) updates.lastname = args.lastname;
                if (args.email){
                    const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    const isValidEmail =  emailExpression.test(String(args.email).toLowerCase());
                  
                    if (!isValidEmail) {
                      throw new Error("email not in proper format");
                    }
                    updates.email = args.email;
                }
                if (args.gender) updates.gender = args.gender;
                if (args.salary) updates.salary = args.salary;
              
                const updatedEmployee = await Employee.findByIdAndUpdate(
                  args.id,
                  updates,
                  { new: true }
                );
              
                if (!updatedEmployee) {
                  throw new Error("Employee not found");
                }
              
                return updatedEmployee;
              }

    }
  }