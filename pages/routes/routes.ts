const menu = [
  { title: "Home", path: "/" },
  { title: "Post", path: "/post" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const login = [
  {
    title: "Sign in",
    path: "/signIn",
    className:
      "whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900",
  },
  {
    title: "Sign up",
    path: "/login",
    className:
      "ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700",
  },
];

export { menu, login };
