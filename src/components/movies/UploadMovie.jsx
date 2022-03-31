import React, { useState } from "react";

import Styles from "./movie.module.css";

const UploadMovie = () => {
  let [title, setTitle] = useState("");
  let [genere, setGenere] = useState("");
  let [yol, setYol] = useState("");
  let [description, setDescription] = useState("");
  let [ratings, setRatings] = useState("");
  let [photo, setPhoto] = useState("");
  let [video, setVideo] = useState("");
  let [language, setLanguage] = useState("");
  let [cast, setCast] = useState("");

  let [loading, setLoading] = useState(false);

  return (
    <main id={Styles.movieBlock}>
      <aside className={Styles.movieArticle}>
        <h2
          style={{ color: "#ffc107", padding: "20px 0", textAlign: "center" }}
        >
          Movie Details
        </h2>

        <form action="#" className={Styles.movieFormBlock}>
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
            <label className={Styles.formLabel} htmlFor="genere">
              Movie Genere
            </label>
            <input
              type="text"
              className={Styles.formControl}
              id="genere"
              name="genere"
              placeholder="Enter Movie Genere"
              onChange={e => setGenere(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className={Styles.formLabel} htmlFor="yor">
              Year of Release
            </label>
            <input
              type="text"
              id="yor"
              className={Styles.formControl}
              name="yor"
              placeholder="Enter Year of Release"
              onChange={e => setYol(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className={Styles.formLabel} htmlFor="descp">
              Description
            </label>
            <input
              type="text"
              id="descp"
              className={Styles.formControl}
              name="descp"
              placeholder="Enter Description"
              onChange={e => setDescription(e.target.value)}
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
              onChange={e => setYol(e.target.value)}
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

          <div className="form-group">
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

          <div className="form-group">
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
