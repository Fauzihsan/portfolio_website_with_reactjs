import { gql } from "@apollo/client";

export const SubscriptionDiary = gql`
  subscription MySubscription {
    diary(order_by: { id: desc }) {
      id
      title
      place
      image
      description
      created_at
    }
  }
`;

export const SubscriptionPortfolio = gql`
  subscription MySubscription {
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

export const SubscriptionCountExperience = gql`
  subscription MySubscription($_eq: Int = 1) {
    portfolio(where: { categories_id: { _eq: $_eq } }) {
      title
      portfolio_id
      description
      categories_id
      imagePortfolio {
        id
        image
      }
    }
  }
`;

export const SubscriptionCountSkill = gql`
  subscription MySubscription($_eq: Int = 2) {
    portfolio(where: { categories_id: { _eq: $_eq } }) {
      title
      portfolio_id
      description
      categories_id
      imagePortfolio {
        id
        image
      }
    }
  }
`;

export const SubscriptionCountProject = gql`
  subscription MySubscription {
    portfolio(where: { _not: { categories_id: { _eq: 1 } }, _and: { _not: { categories_id: { _eq: 2 } } } }) {
      title
      portfolio_id
      description
      categories_id
      imagePortfolio {
        id
        image
      }
    }
  }
`;
