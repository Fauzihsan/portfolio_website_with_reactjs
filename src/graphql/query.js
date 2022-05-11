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

export const GetDiary = gql`
  query MyQuery {
    diary(order_by: { id: desc }) {
      id
      title
      image
      place
      description
      created_at
    }
  }
`;

export const GetPortfolio = gql`
  query MyQuery {
    portfolio(order_by: { id: desc }) {
      id
      title
      image
      description
      categories_id
    }
  }
`;

export const GetPortfolioById = gql`
  query MyQuery($id: Int!) {
    portfolio_by_pk(id: $id) {
      id
      title
      description
      image
      categories_id
    }
  }
`;

// export const GetPortfolioById = gql`
//   query MyQuery($_id: Int!) {
//     portfolio(where: { id: { _eq: $_id } }) {
//       id
//       image
//       title
//       description
//       categories_id
//     }
//   }
// `;

export const GetPortfolioCategory = gql`
  query MyQuery {
    portfolio_category {
      id
      name_category
    }
  }
`;
