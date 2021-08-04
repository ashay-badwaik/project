const { gql } = require('apollo-server');

const typeDefs = gql`
    type Message{
        id: ID!
        name: String
        email: String
        message: String
    }

    type ContentData{
        id: ID!
        leftheading: String
        rightheading: String
        leftpara: String
        rightpara: String
    }

    type Query {
        getContentData(id: ID!): ContentData!
        getAllContentData: [ContentData]!
        getAllContact: [Message]!
        getContact(id: ID!): Message!
        getLastContact: Message!
    }

    type Mutation {
        sendMessage(name:String! email:String! message:String!): String
    }
`

module.exports = typeDefs;
