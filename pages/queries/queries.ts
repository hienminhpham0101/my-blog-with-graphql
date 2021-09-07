import { gql } from "graphql-tag";
const GET_CURRENT_USER = gql`
  query {
    me {
      username
      email
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export { GET_CURRENT_USER, LOGIN_USER };
