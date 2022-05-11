import { gql } from "@apollo/client";

export const InsertDiary = gql`
  mutation MyMutation($diary: diary_insert_input!) {
    insert_diary_one(object: $diary) {
      id
    }
  }
`;

export const UpdateDiary = gql`
  mutation MyMutation($id: Int!, $title: String!, $place: String!, $image: String!, $description: String!) {
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
      id
    }
  }
`;

export const UpdatePortfolio = gql`
  mutation MyMutation($id: Int!, $title: String!, $categories_id: Int!, $image: String!, $description: String!) {
    update_portfolio_by_pk(pk_columns: { id: $id }, _set: { title: $title, categories_id: $categories_id, image: $image, description: $description }) {
      id
    }
  }
`;

export const DeletePortfolio = gql`
  mutation MyMutation($id: Int!) {
    delete_portfolio_by_pk(id: $id) {
      id
    }
  }
`;
