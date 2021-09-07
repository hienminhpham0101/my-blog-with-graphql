export const getTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
};

export const setTokenToLocalStorage = (token: string) =>
  localStorage.setItem("token", token);
