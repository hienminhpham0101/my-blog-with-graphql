import { createContext, useContext } from "react";

interface IUser {
  username: string;
  email: string;
}
export const initialCurrentUser = {
  username: "",
  email: "",
};
export const UserContext = createContext<{
  currentUser: IUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser>>;
}>({
  currentUser: initialCurrentUser,
  setCurrentUser() {},
});

export const UserContextProvider = UserContext.Provider;
export const useAuth = () => useContext(UserContext);
