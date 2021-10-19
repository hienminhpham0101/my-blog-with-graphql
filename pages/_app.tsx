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
import UserWrapper from "./contexts/authContext";

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

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function MyApp({ Component, pageProps }: AppProps) {
  const TopProgressBar = dynamic(
    () => {
      return import("./components/topProgressBar/topProgressBar");
    },
    { ssr: false }
  );

  return (
    <ApolloProvider client={client}>
      <TopProgressBar />
      <UserWrapper>
        <div className="max-w-7xl mx-auto">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </UserWrapper>
    </ApolloProvider>
  );
}
export default MyApp;
