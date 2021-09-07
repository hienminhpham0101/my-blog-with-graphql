import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  initialCurrentUser,
  UserContextProvider,
} from "./auth/contexts/userContext";
import { getTokenFromLocalStorage } from "./auth/services/localStorageServices";
import Header from "./components/layout/header";
import Logout from "./components/logout";
import { GlobalLoadingProvider } from "./global/progressBar/global-loading";
import { GET_CURRENT_USER } from "./queries/queries";

const Home: NextPage = () => {
  const [currentUser, setCurrentUser] = useState(initialCurrentUser);
  const router = useRouter();
  const [token, setToken] = useState(getTokenFromLocalStorage);
  const [loadingState, setLoadingState] = useState<"init" | "loading" | "idle">(
    "init"
  );
  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
  }, [token]);

  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  if (data) {
    if (!data) {
      router.push("/login");
    }
  }
  if (loading) return <>Loading...</>;
  if (error) return <>Error! {error.message}</>;

  return (
    <GlobalLoadingProvider
      value={{
        loadingState,
        setLoadingState,
      }}
    >
      <Header />
      <Link href="/login">login</Link>
    </GlobalLoadingProvider>
  );
};

export default Home;
