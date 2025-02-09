import { createBrowserRouter } from "react-router-dom";
import { SignUpForm } from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App   />,
    children: [
    //   { path: "", element: <HomePage /> }, no homepage for now
      { path: "", element: <LoginForm /> },
      { path: "login", element: <LoginForm /> },
      { path: "signup", element: <SignUpForm /> },
    ],
  },
]);