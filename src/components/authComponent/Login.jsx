import React, { useState } from "react";
import Styles from "./auth.module.css";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../api/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [toggle, setToggle] = useState(false);
  let [PasswordShow, setPasswordShow] = useState(false);

  let ChangeIcon = () => {
    setToggle(!toggle);
    setPasswordShow(!PasswordShow);
  };
  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      let userData = await signInWithEmailAndPassword(auth, email, password);
      if (userData.user.emailVerified === true) {
        toast.success("successfully user logged in");
        navigate("/");
      } else {
        navigate("/login");
        toast.error("user not yet verified");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message.slice(9));
    }
    setLoading(false);
    setEmail("");
    setPassword("");
  };
  return (
    <section id={Styles.authSection}>
      <article className={Styles.authArticle}>
        <h2 style={{ padding: "20px 0" }}>Login</h2>
        <div className={Styles.formBlock}>
          <Link to="/phone-auth">Try with phone number</Link>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className={Styles.formLabel}>
                email
              </label>
              <input
                type="email"
                className={Styles.formControl}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className={Styles.formLabel}>
                password
              </label>
              <input
                type={PasswordShow === true ? "text" : "password"}
                className={Styles.formControl}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <span className={Styles.eyeIcon} onClick={ChangeIcon}>
                {toggle !== true ? (
                  <FaEyeSlash className={Styles.eyeIconSVG} />
                ) : (
                  <FaEye className={Styles.eyeIconSVG} />
                )}
              </span>
            </div>
            <div className="form-group">
              <p className={Styles.gotoAuth}>
                new to Stream base{" "}
                <Link to="/signup" className={Styles.gotoAuthLink}>
                  Signup
                </Link>
              </p>
              <p style={{ clear: " both", padding: "3px 0" }}>
                <Link to="/password-reset" className={Styles.gotoAuthLink}>
                  forgot password
                </Link>
              </p>
            </div>
            <div className="form-group">
              <button className={Styles.btn}>
                {loading ? "loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default Login;
