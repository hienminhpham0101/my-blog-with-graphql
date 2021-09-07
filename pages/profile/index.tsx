import { useQuery } from "@apollo/client";
import React from "react";
import { GET_CURRENT_USER } from "../queries/queries";

const Profile = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  if (loading) return <>Loading</>;
  if (error) return <>{error.message}</>;

  return (
    <div>
      <div>profile</div>
      {`${data.me.username} ${data.me.email}`}
    </div>
  );
};

export default Profile;
