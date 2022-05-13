import { gql } from "@apollo/client";

export const InsertDiary = gql`
  mutation MyMutation($diary: diary_insert_input!) {
    insert_diary_one(object: $diary) {
      id
    }
  }
`;

export const UpdateDiary = gql`
  mutation MyMutation($id: Int!, $title: String!, $image: String!, $place: String!, $description: String!) {
    update_diary_by_pk(pk_columns: { id: $id }, _set: { title: $title, place: $place, image: $image, description: $description }) {
      id
    }
  }
`;

export const DeleteDiary = gql`
  mutation MyMutation($id: Int!) {
    delete_diary_by_pk(id: $id) {
      id
    }
  }
`;

export const InsertPortfolio = gql`
  mutation MyMutation($portfolio: portfolio_insert_input!) {
    insert_portfolio_one(object: $portfolio) {
      portfolio_id
    }
  }
`;

export const InsertImage = gql`
  mutation MyMutation($images: [image_insert_input!]!) {
    insert_image(objects: $images) {
      returning {
        id
        image
        portfolio_id
      }
    }
  }
`;

export const DeleteImage = gql`
  mutation MyMutation($portfolio_id: String!) {
    delete_image(where: { portfolio_id: { _eq: $portfolio_id } }) {
      returning {
        image
        id
      }
    }
  }
`;

export const UpdatePortfolio = gql`
  mutation MyMutation($portfolio_id: String!, $title: String!, $categories_id: Int!, $description: String!) {
    update_portfolio_by_pk(pk_columns: { portfolio_id: $portfolio_id }, _set: { title: $title, categories_id: $categories_id, description: $description }) {
      portfolio_id
    }
  }
`;

export const DeletePortfolio = gql`
  mutation MyMutation($portfolio_id: String!) {
    delete_portfolio(where: { portfolio_id: { _eq: $portfolio_id } }) {
      returning {
        title
      }
    }
  }
`;
