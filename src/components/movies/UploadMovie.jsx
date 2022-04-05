import React, { useState } from "react";
import { storage, database } from "../../api/firebase";
import { v4 as movieID } from "uuid";
import {
  ref as photoRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

import { ref, set, child } from "firebase/database";
import Styles from "./movie.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UploadMovie = () => {
  let navigate = useNavigate("");
  let [title, setTitle] = useState("");
  let [genre, setGenre] = useState("");
  let [yol, setYol] = useState("");
  let [description, setDescription] = useState("");
  let [ratings, setRatings] = useState("");
  let [photo, setPhoto] = useState("");
  let [video, setVideo] = useState("");
  let [language, setLanguage] = useState("");
  let [cast, setCast] = useState("");
  let [progress, setProgress] = useState(0);
  let [barStatus, setBarStatus] = useState(false);
  let [id, setId] = useState(movieID());
  let [loading, setLoading] = useState(false);

  let handleSubmit = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      let storageRefPhoto = photoRef(storage, `/movie-poster/${photo.name}`);
      let storageRefVideo = photoRef(storage, `/movie-video/${video.name}`);

      let uploadTaskPhoto = uploadBytesResumable(storageRefPhoto, photo);
      let uploadTaskVideo = uploadBytesResumable(storageRefVideo, video);

      uploadTaskVideo.on(
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
          let downLoadUrlPhoto = await getDownloadURL(storageRefPhoto);
          let downLoadUrlVideo = await getDownloadURL(storageRefVideo);
          await set(ref(database, "movie-data/" + Date.now()), {
            title,
            description,
            genre,
            ratings,
            yol,
            language,
            cast,
            downLoadUrlPhoto,
            downLoadUrlVideo,
            id,
          });
          // child(parentValue, "movie");
          navigate("/");
          toast.success("movie added");
          setBarStatus(false);
          setLoading(false);
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
          <p class="percent">{Math.round(progress) + "%"}</p>
        </div>
      </div>
    );
  };

  return (
    <main id={Styles.movieBlock}>
      <header>
        <span> {barStatus === true ? <ProgressUI /> : ""}</span>
      </header>
      <aside className={Styles.movieArticle}>
        <h2
          style={{ color: "#ffc107", padding: "20px 0", textAlign: "center" }}
        >
          Movie Details
        </h2>

        <form onSubmit={handleSubmit} className={Styles.movieFormBlock}>
          <div className="form-group">
            <label className={Styles.formLabel} htmlFor="title">
              Movie Title
            </label>
            <input
              type="text"
              className={Styles.formControl}
              id="title"
              name="title"
              placeholder="Enter Movie Title"
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className={Styles.formLabel} htmlFor="genre">
              Movie Genre
            </label>
            <select onChange={e => setGenre(e.target.value)}>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="horror">Horror</option>
              <option value="thriller">Thriller</option>
              <option value="romance">Romance</option>
              <option value="mystery">Mystery</option>
              <option value="kids">Kids</option>
            </select>
          </div>

          <div className="form-group">
            <label className={Styles.formLabel} htmlFor="yor">
              Year of Release
            </label>
            <input
              type="date"
              id="yor"
              className={Styles.formControl}
              name="yor"
              placeholder="Enter Year of Release"
              onChange={e => setYol(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className={Styles.formLabel} htmlFor="ratings">
              Ratings
            </label>
            <input
              type="text"
              id="ratings"
              className={Styles.formControl}
              name="ratings"
              placeholder="Enter Ratings"
              onChange={e => setRatings(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className={Styles.formLabel} htmlFor="photo">
              Movie Photo
            </label>
            <input
              type="file"
              id="photo"
              className={Styles.formControl}
              name="photo"
              onChange={e => setPhoto(e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <label className={Styles.formLabel} htmlFor="video">
              Movie Video
            </label>
            <input
              type="file"
              id="video"
              className={Styles.formControl}
              name="video"
              onChange={e => setVideo(e.target.files[0])}
            />
          </div>

          <div className="form-group language">
            <label className={Styles.formLabel} htmlFor="lang">
              Movie Language
            </label>
            <input
              type="text"
              id="lang"
              className={Styles.formControl}
              name="lang"
              onChange={e => setLanguage(e.target.value)}
            />
          </div>

          <div className="form-group cast">
            <label className={Styles.formLabel} htmlFor="cast">
              Movie Cast
            </label>
            <input
              type="text"
              className={Styles.formControl}
              id="cast"
              name="cast"
              onChange={e => setCast(e.target.value)}
            />
          </div>

          <div className="form-group movie_description">
            <label className={Styles.formLabel} htmlFor="description">
              Description
            </label>
            <textarea
              type="text"
              id="description"
              className={Styles.formControl}
              name="description"
              placeholder="Enter Description"
              onChange={e => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <button className={Styles.btn}>
              {loading ? "loading" : "submit"}
            </button>
          </div>
        </form>
      </aside>
    </main>
  );
};

export default UploadMovie;
