const { ApolloServer, gql } = require('apollo-server');
const resolvers = require('./graphql/resolvers');
const typeDefs = require("./graphql/schema.js");


it('fetches single launch', async () => {
    // const userAPI = new UserAPI({ store });
    // const launchAPI = new LaunchAPI();

    const GET_DATA = gql`
      query getContentData($id: ID!){
        getContentData(id: $id){
          id
          leftheading
          rightheading
          leftpara
          rightpara
        }
      }
    `
    
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      // dataSources: () => ({ userAPI, launchAPI }),
      // context: () => ({ user: { id: 1, email: 'a@a.a' } }),
    });

  
    // run query against the server and snapshot the output
    const res = await server.executeOperation({ query: GET_DATA, variables: { id: 2 } });
    expect(res).toMatchObject({
      data: {
        getContentData: {
          id: "2",
          leftheading: "sgafga",
          rightheading: "asfgafg",
          leftpara: "dfgterfgfght",
          rightpara: "gnfynytjyjgm"
        }
    }});
});

it('Mutaions', async () => {
  // const userAPI = new UserAPI({ store });
  // const launchAPI = new LaunchAPI();

  const SEND_MESSAGE = gql`
    mutation sendMessage($name: String! $email: String! $message: String!){
      sendMessage(
        name: $name
        email: $email
        message: $message
      )
    }
  `;
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // dataSources: () => ({ userAPI, launchAPI }),
    // context: () => ({ user: { id: 1, email: 'a@a.a' } }),
  });


  // run query against the server and snapshot the output
  const res = await server.executeOperation({ query: SEND_MESSAGE, variables: { name:"abcd", email:"abcd@ma.com", message:"qwert" } });
  expect(res).toMatchObject({
    data: 
      {sendMessage: "Message Sent"}
  });  
});