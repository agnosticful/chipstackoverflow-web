import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";

let singletonServerSideApolloClient: ApolloClient<any> | null = null;

export function getSingletonServerSideApolloClient() {
  if (!singletonServerSideApolloClient) {
    singletonServerSideApolloClient = new ApolloClient({
      link: new HttpLink({ uri: process.env.NEXT_PUBLIC_API_ENDPOINT }),
      cache: new InMemoryCache(),
    });
  }

  return singletonServerSideApolloClient;
}
