import React, { useState } from "react";
import Styles from "./auth.module.css";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../api/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const PasswordReset = () => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");

  let [loading, setLoading] = useState(false);

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast.info(
        `password reset email has been sent to  ${email} address please change password`
      );
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  return (
    <section id={Styles.authSection}>
      <article className={Styles.authArticle}>
        <h2 style={{ padding: "20px 0" }}>Forgot Password</h2>
        <div className={Styles.formBlock}>
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
              <p className={Styles.gotoAuth}>
                go back to Stream base{" "}
                <Link to="/login" className={Styles.gotoAuthLink}>
                  login
                </Link>
              </p>
            </div>
            <div className="form-group">
              <button className={Styles.btn}>
                {loading ? "loading..." : "password reset"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default PasswordReset;
