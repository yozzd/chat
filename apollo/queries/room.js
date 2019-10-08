import gql from 'graphql-tag';

export const CREATE_ROOM = gql`
  mutation createRoom($name: String!, $user: String!) {
    createRoom(name: $name, user: $user) {
      id
      name
      user
    }
  }
`;
