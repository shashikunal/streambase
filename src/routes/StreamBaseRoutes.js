import { useRoutes } from "react-router-dom";
import Home from "./../pages/home/Home";
import Login from "./../components/authComponent/Login";
import Signup from "../components/authComponent/Signup";
import NotFound from "../pages/notfound/NotFound";
import MyProfile from "./../components/profile/MyProfile";
import UploadProfilePhoto from "../components/profile/UploadProfilePhoto";
import MyAccount from "../components/profile/MyAccount";
import PasswordReset from "./../components/authComponent/PasswordReset";
import PhoneAuth from "./../components/authComponent/PhoneAuth";
import ProtectedRoute from "./../helpers/ProtectedRoute";
import UpdatePassword from "./../components/profile/UpdatePassword";

let StreamBaseRoutes = () => {
  let StreamRoutes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "password-reset",
      element: <PasswordReset />,
    },
    {
      path: "phone-auth",
      element: <PhoneAuth />,
    },
    {
      path: "myprofile",
      element: (
        <ProtectedRoute>
          <MyProfile />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "upload-photo",
          element: <UploadProfilePhoto />,
        },
        {
          path: "update-password",
          element: <UpdatePassword />,
        },
        {
          path: "my-account",
          element: <MyAccount />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return StreamRoutes;
};

export default StreamBaseRoutes;
