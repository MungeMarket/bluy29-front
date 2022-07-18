import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://52.79.62.149:3002/graphql",
  cache: new InMemoryCache(),
});

export default client;
