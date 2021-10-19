import { gql } from "graphql-tag";
export const GET_CURRENT_USER = gql`
  query {
    me {
      username
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const GET_POSTS = gql`
  query {
    posts {
      title
      content
      slug
      voteUp
      voteDown
      viewCount
      ownerUserId {
        username
      }
      categoryId {
        name
      }
      createdAt
    }
  }
`;
