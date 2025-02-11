import { createBrowserRouter } from "react-router-dom";
import { SignUpForm } from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import App from "../App";
import ProfilePage from "../components/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
    //   { path: "", element: <HomePage /> }, no homepage for now
      { path: "", 
        element: (
            <ProtectedRoute>
                <ProfilePage/>
            </ProtectedRoute>)
        },
      { path: "login", element: <LoginForm /> },
      { path: "signup", element: <SignUpForm /> },
    ],
  },
]);