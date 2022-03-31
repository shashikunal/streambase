import React, { useState, useContext } from "react";
import Styles from "../authComponent/auth.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { storage } from "../../api/firebase";
import {
  ref as photoRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "./../../api/AuthContext";

const UploadProfilePhoto = () => {
  let USER = useContext(AuthContext);
  let [loading, setLoading] = useState(false);
  let [photo, setPhoto] = useState("");
  let [progress, setProgress] = useState(0);
  let [barStatus, setBarStatus] = useState(false);

  let handleSubmit = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      let storageRef = photoRef(storage, `/profile-photo/${photo.name}`);
      let uploadTask = uploadBytesResumable(storageRef, photo);

      uploadTask.on(
        "state_changed",
        snapShot => {
          //progressing upload photo snaps
          let progressBar =
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
          setProgress(progressBar);
          setBarStatus(true);
          setLoading(true);
        },
        err => {},
        async () => {
          //completion task
          let downLoadUrl = await getDownloadURL(storageRef);
          updateProfile(USER, {
            photoURL: downLoadUrl,
          });
          setBarStatus(false);
          setLoading(false);
          toast.success("successfully photo updated");
          window.location.assign("/");
        }
      );

      //firebase event
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  let ProgressUI = () => {
    return (
      <div class="progress">
        <div class="bar" style={{ width: `${progress}%` }}>
          <p class="percent">{Math.round(progress)}</p>
        </div>
      </div>
    );
  };

  return (
    <section id={Styles.authSection}>
      <header>
        <span> {barStatus === true ? <ProgressUI /> : ""}</span>
      </header>
      <article className={Styles.authArticle}>
        <h2 style={{ padding: "20px 0" }}>Upload Photo</h2>
        <div className={Styles.formBlock}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className={Styles.formLabel}>
                Upload Photo
              </label>
              <input
                type="file"
                className={Styles.formControl}
                onChange={e => setPhoto(e.target.files[0])}
              />
            </div>

            <div className="form-group">
              <p className={Styles.gotoAuth}>
                Go back to home page{" "}
                <Link to="/user" className={Styles.gotoAuthLink}>
                  go back
                </Link>
              </p>
            </div>
            <div className="form-group">
              <button className={Styles.btn}>
                {loading ? "loading..." : "Upload"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default UploadProfilePhoto;
