import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { getTokenFromLocalStorage } from "./auth/services/localStorageServices";

function MyApp({ Component, pageProps }: AppProps) {
  const httpLink = createHttpLink({
    uri: "http://127.0.0.1:8000/graphql/",
  });

  const authLink = setContext((_, { headers }) => {
    const token = getTokenFromLocalStorage();
    return {
      headers: {
        ...headers,
        Authorization: token ? `JWT ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
