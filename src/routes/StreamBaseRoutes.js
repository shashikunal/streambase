import { useRoutes } from "react-router-dom";
import Home from "./../pages/home/Home";
import Login from "./../components/authComponent/Login";
import Signup from "../components/authComponent/Signup";
import NotFound from "../pages/notfound/NotFound";

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
      path: "*",
      element: <NotFound />,
    },
  ]);
  return StreamRoutes;
};

export default StreamBaseRoutes;
