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
    portfolio {
      portfolio_id
      title
      description
      categories_id
      imagePortfolio {
        id
        image
        portfolio_id
      }
    }
  }
`;

export const GetPortfolioById = gql`
  query MyQuery($portfolio_id: String!) {
    portfolio(where: { portfolio_id: { _eq: $portfolio_id } }) {
      portfolio_id
      title
      description
      categories_id
      imagePortfolio {
        id
        image
      }
    }
  }
`;

export const GetImagePortfolio = gql`
  query MyQuery {
    image {
      id
      image
      portfolio_id
    }
  }
`;

export const GetImagePortfolioById = gql`
  query MyQuery($portfolio_id: String!) {
    image(where: { portfolio_id: { _eq: $portfolio_id } }) {
      id
      image
      portfolio_id
    }
  }
`;

export const GetPortfolioCategory = gql`
  query MyQuery {
    portfolio_category {
      id
      name_category
    }
  }
`;
