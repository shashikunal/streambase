import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAccountCircle, MdUploadFile } from "react-icons/md";
import { TiUserDelete } from "react-icons/ti";
import Styles from "./myprofile.module.css";
import { deleteUser } from "firebase/auth";
import { AuthContext } from "./../../api/AuthContext";

const SidebarMenu = () => {
  let USER = useContext(AuthContext);
  let removeAccount = async () => {
    let deletedUser = await deleteUser(USER);
    let result = window.confirm("Are you Sure delete an account ?");
    if (result) {
      window.sessionStorage.removeItem("TOKEN");
      window.location.assign("/signup");
      return deletedUser;
    } else {
    }
  };
  return (
    <div className={Styles.sidebarMenu}>
      <ul>
        <li>
          <Link to="/myprofile/my-account">
            <span>
              <MdOutlineAccountCircle />
            </span>
            <span>My Account</span>
          </Link>
        </li>
        <li>
          <Link to="/myprofile/upload-photo">
            <span>
              <MdUploadFile />
            </span>
            <span>Upload Photo</span>
          </Link>
        </li>
        <li>
          <Link to="/myprofile/update-password">
            <span>
              <MdUploadFile />
            </span>
            <span>Update password</span>
          </Link>
        </li>
        <li className="lastChild" onClick={removeAccount}>
          <a to="#">
            <span>
              <TiUserDelete />
            </span>
            <span>Remove Account</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
