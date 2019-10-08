import gql from 'graphql-tag';

export const CREATE_MESSAGE = gql`
  mutation createMessage($text: String!, $room: String!, $user: String!) {
    createMessage(text: $text, room: $room, user: $user) {
      id
      text
      room
      user {
        id
        name
      }
      createdAt
    }
  }
`;

export const CREATE_MESSAGE_SUBSCRIPTION = gql`
  subscription createdMessage {
    createdMessage {
      id
      text
      room
      user {
        id
        name
      }
      createdAt
    }
  }
`;
