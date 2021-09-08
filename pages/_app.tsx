import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "nprogress/nprogress.css";
import "tailwindcss/tailwind.css";
import { getTokenFromLocalStorage } from "./auth/services/localStorageServices";
import Layout from "./components/layout/layout";

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

  const TopProgressBar = dynamic(
    () => {
      return import("./components/topProgressBar/topProgressBar");
    },
    { ssr: false }
  );

  return (
    <ApolloProvider client={client}>
      <TopProgressBar />
      <div className="max-w-7xl mx-auto">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </ApolloProvider>
  );
}
export default MyApp;
