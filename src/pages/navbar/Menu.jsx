import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Styles from "./navbar.module.css";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../../api/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../api/firebase";
import { toast } from "react-toastify";
const Menu = () => {
  let [toggle, setToggle] = useState(false);
  let USER = useContext(AuthContext);
  let toggleRef = useRef();
  let dropDownMenu = e => {
    setToggle(!toggle);
  };

  let LogOut = async () => {
    await signOut(auth);
    window.sessionStorage.removeItem("TOKEN");
    toast.success("successfully logged out");
    window.location.assign("/login");
  };

  let AuthenticatedUser = () => {
    return (
      <>
        <li onClick={dropDownMenu}>
          <NavLink to={{ pathname: "/" }} className={Styles.navbarIconLink}>
            <span>
              <img
                src={USER.photoURL}
                alt={USER.displayName}
                className={Styles.navbarIcon}
              />
            </span>
            <span>Profile</span>
          </NavLink>
          <div
            className={toggle === true ? "dropDown show" : "dropDown hide"}
            ref={toggleRef}
          >
            <ul>
              <li>
                <NavLink to="/myprofile">
                  <span>
                    <FaUser />
                  </span>
                  My Profile
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <a href="#" onClick={LogOut} className={Styles.navbarAnchor}>
            Logout
          </a>
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
    <div className={Styles.menu}>
      <ul>
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
    </div>
  );
};

export default Menu;
