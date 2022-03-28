import React, { useState } from "react";
import Styles from "./auth.module.css";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../api/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const PhoneAuth = () => {
  let navigate = useNavigate();
  let [phone, setPhone] = useState("");

  let [loading, setLoading] = useState(false);

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      let recaptchaVerifier = new RecaptchaVerifier(
        "captcha-container",
        {
          size: "invisible",
          callback: response => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        },
        auth
      );
      // send otp
      let sendOTP = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
      let confirmationMessage = window.prompt("please enter OTP");
      await sendOTP.confirm(confirmationMessage);
      toast.success("successfully logged in");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  return (
    <section id={Styles.authSection}>
      <article className={Styles.authArticle}>
        <h2 style={{ padding: "20px 0" }}>Sign in with Phone number</h2>
        <div className={Styles.formBlock}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phone" className={Styles.formLabel}>
                phone number
              </label>
              <input
                type="text"
                className={Styles.formControl}
                value={phone}
                onChange={e => setPhone(e.target.value)}
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
            <div id="captcha-container"></div>
            <div className="form-group">
              <button className={Styles.btn}>
                {loading ? "loading..." : "send"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default PhoneAuth;
