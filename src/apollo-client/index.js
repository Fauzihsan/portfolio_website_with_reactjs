import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://mini-project-ihsan.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "HS65GKcrtsOOPo21e5wHf8DThLarwgnktS6Q0ghJH68T75WkEBPY4dpkxF6Sbgx3",
  },
  cache: new InMemoryCache(),
});

export default client;
