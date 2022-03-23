import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Styles from "./navbar.module.css";
import { AuthContext } from "../../api/AuthContext";
const Menu = () => {
  let USER = useContext(AuthContext);
  console.log(USER);

  let AuthenticatedUser = () => {
    return (
      <>
        <li>
          <NavLink to={{ pathname: "/" }} className={Styles.navbarAnchor}>
            <span style={{ left: "0px", position: "relative" }}>
              <img
                src={USER.photoURL}
                alt={USER.displayName}
                style={{
                  position: "absolute",
                  width: "30px",
                  height: "30px",
                  borderRadius: "100%",
                  left: "-36px",
                }}
              />
            </span>
            <span>{USER.displayName}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={{ pathname: "/" }} className={Styles.navbarAnchor}>
            Logout
          </NavLink>
        </li>
      </>
    );
  };
  let AnonymousUser = () => {
    return (
      <>
        <li>
          <NavLink
            to={{ pathname: "/login" }}
            activeclassname="active"
            className={Styles.navbarAnchor}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to={{ pathname: "/signup" }}
            activeclassname="active"
            className={Styles.navbarAnchor}
          >
            Signup
          </NavLink>
        </li>
      </>
    );
  };
  return (
    <ul className={Styles.navbarUl}>
      <li>
        <NavLink
          to={{ pathname: "/" }}
          activeclassname="active"
          className={Styles.navbarAnchor}
        >
          Home
        </NavLink>
      </li>
      {USER ? <AuthenticatedUser /> : <AnonymousUser />}
    </ul>
  );
};

export default Menu;
