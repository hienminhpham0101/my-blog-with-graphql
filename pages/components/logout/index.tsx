import { useQuery } from "@apollo/client";
import React from "react";
import { GET_CURRENT_USER } from "../../queries/queries";
import Link from "next/link";
const Logout = () => {
  const { client, data } = useQuery(GET_CURRENT_USER);

  const logout = () => {
    window.localStorage.clear();
    client.resetStore();
  };

  if (data && data.me) {
    return (
      <button onClick={logout} color="inherit">
        Logout
      </button>
    );
  }
  return (
    <div>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </div>
  );
};

export default Logout;
