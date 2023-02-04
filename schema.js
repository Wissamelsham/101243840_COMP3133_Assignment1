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
      username: String!
      password:String!
      email:String!
      token: String!
    }

    
    type Query {
     
      getUser:[User]
    }

    type Mutation {
      addUser(
        username: String!
        email:String! 
        password:String!
      ):User
    }
    

 ` 