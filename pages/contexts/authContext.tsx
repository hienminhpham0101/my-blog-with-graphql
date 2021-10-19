import { useQuery } from "@apollo/client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { GET_CURRENT_USER } from "../queries/queries";

export interface User {
  me: { id: number; username: string; email: string };
}

const UserContext = createContext<{
  profile: User;
  setProfile: Dispatch<SetStateAction<User>>;
}>({
  profile: {} as User,
  setProfile() {},
});

export default function UserWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState({} as User);
  const { data } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    setProfile(data);
  }, [data]);

  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
