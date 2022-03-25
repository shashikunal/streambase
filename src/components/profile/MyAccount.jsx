import React, { useContext } from "react";
import Styles from "./myprofile.module.css";
import { AuthContext } from "./../../api/AuthContext";
const MyAccount = () => {
  let USER = useContext(AuthContext);
  let { displayName, email, emailVerified, photoURL } = USER;
  return (
    <section>
      <article>
        <div className={Styles.photoURL}>
          <figure>
            <img src={photoURL} alt={displayName} />
          </figure>
          <footer>
            <h2>{displayName}</h2>
          </footer>
        </div>
        <div className={Styles.userInfo}>
          <aside>
            <p>{email}</p>
            <p>{emailVerified}</p>
          </aside>
        </div>
      </article>
    </section>
  );
};

export default MyAccount;
