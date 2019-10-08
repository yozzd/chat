import gql from 'graphql-tag';

export const CONFIRM_ROOM = gql`
  mutation confirmRoom($name: String!) {
    confirmRoom(name: $name) {
      id
      name
    }
  }
`;

export const CREATE_ROOM = gql`
  mutation createRoom($name: String!, $user: String!) {
    createRoom(name: $name, user: $user) {
      id
      name
      user
    }
  }
`;

export const JOIN_ROOM = gql`
  mutation joinRoom($id: String!, $user: String!) {
    joinRoom(id: $id, user: $user) {
      id
      name
      user
    }
  }
`;
