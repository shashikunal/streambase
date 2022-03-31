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
          <Link
            to="/user"
            style={{
              color: "#fff",
              fontWeight: "bold",
              textTransform: "uppercase",
              borderBottom: "3px solid #ffc107",
              background: "#333",
            }}
          >
            Account Setting
          </Link>
        </li>
        <li>
          <Link to="/user/my-account">
            <span>
              <MdOutlineAccountCircle />
            </span>
            <span>My Account</span>
          </Link>
        </li>
        <li>
          <Link to="/user/upload-photo">
            <span>
              <MdUploadFile />
            </span>
            <span>Upload Photo</span>
          </Link>
        </li>
        <li>
          <Link to="/user/update-password">
            <span>
              <MdUploadFile />
            </span>
            <span>Update password</span>
          </Link>
        </li>
        <li>
          <Link
            to="/user/movie"
            style={{
              color: "#fff",
              fontWeight: "bold",
              textTransform: "uppercase",
              borderBottom: "3px solid #ffc107",
              background: "#333",
            }}
          >
            Movies
          </Link>
        </li>
        <li>
          <Link to="/user/movie/upload-movie">
            <span>
              <MdUploadFile />
            </span>
            <span>upload movie</span>
          </Link>
        </li>

        <li className="lastChild_removeAccount" onClick={removeAccount}>
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
