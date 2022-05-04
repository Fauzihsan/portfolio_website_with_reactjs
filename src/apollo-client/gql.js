import { gql } from "@apollo/client";

export const GetUser = gql`
  query MyQuery($email: String!, $password: String!) {
    users(limit: 1, where: { email: { _eq: $email }, password: { _eq: $password } }) {
      id
      name
      email
      password
    }
  }
`;
