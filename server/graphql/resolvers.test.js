const { content, contact } = require("../models");
const { gql } = require("apollo-server");
const { Query, Mutation } = require("./resolvers");
jest.mock("../models/index.js");

const axios = require('axios');

// test("getContentData", async () => {
//   const obj = [
//     {
//       id: 1,
//       leftheading:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//       rightheading: "Type Text",
//       leftpara:
//         "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//       rightpara:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//     },
//   ];

//   const db = jest.fn().mockResolvedValue({ data: obj });
//   console.log(db);
//   const data = await Query.getAllContentData();
//   console.log(data);
//   expect(data[0].rightheading).toBe("Type Text");
// });

test("getContentData", async () => {
  const response = await axios.post('http://localhost:4000/', {
    query: `
      query {
        getContentData(id: 2) {
          id
          leftheading
          rightheading
          leftpara
          rightpara
        }
      }`
  });

  const { data } = response;
  expect(data).toMatchObject({
    data: {
      getContentData: {
        id: "2",
        leftheading: "sgafga",
        rightheading: "asfgafg",
        leftpara: "dfgterfgfght",
        rightpara: "gnfynytjyjgm"
      }
    }
  })
});


test("sendMessage", async() => {
  const response = await axios.post('http://localhost:4000/', {
    query: `
      mutation{
        sendMessage(
          name: "abc"
          email: "abc@mail.com"
          message: "bcd"
        )
      }`
  });

  const {data} = response;
  expect(data).toMatchObject({
    data: 
      {sendMessage: "Message Sent"}
  });
})

