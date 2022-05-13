import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "https://mini-project-ihsan.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "HS65GKcrtsOOPo21e5wHf8DThLarwgnktS6Q0ghJH68T75WkEBPY4dpkxF6Sbgx3",
  },
});

const wsLink = new WebSocketLink({
  uri: "wss://mini-project-ihsan.hasura.app/v1/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": "HS65GKcrtsOOPo21e5wHf8DThLarwgnktS6Q0ghJH68T75WkEBPY4dpkxF6Sbgx3",
      },
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
