const { gql } = require('apollo-server-express');
const { typeDefs } = require('graphql');
 
exports.typeDefs = gql `

    type User {
      id: ID!
      username: String!
      password:String!
      email:String!
      token: String!
    }

    type Employee {
      id: ID!
      firstname: String!
      lastname:String!
      email:String!
      gender:String!
      salary:Float!
    }

    
    type Query {
     
      getUser:[User]
      login(username:String!,password:String!):User
      getEmployee(id: ID!):Employee
    }

    type Mutation {
      addUser(
        username: String!
        email:String! 
        password:String!
      ):User

      addNewEmployee(
        firstname: String!
        lastname:String!
        email:String!
        gender:String!
        salary:Float!
      ):Employee

      updateEmployee(
        id: ID!
        firstname: String
        lastname:String
        email:String
        gender:String
        salary:Float
      ):Employee
    }
    

 ` 