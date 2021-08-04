import { gql } from "@apollo/client";


export const SEND_MESSAGE = gql`
  mutation sendMessage($name: String! $email: String! $message: String!){
    sendMessage(
      name: $name
      email: $email
      message: $message
    )
  }
`;