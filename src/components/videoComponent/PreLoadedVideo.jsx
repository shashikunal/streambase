import React, { useRef, useState, useContext, Fragment } from "react";
// import VIDEO from "./arabic_kuthu.mp4";
import Styles from "./video.module.css";
import { Link } from "react-router-dom";
import { FaPlay, FaPause } from "react-icons/fa";
import { MovieContext } from "./../../api/MovieContext";
import { toast } from "react-toastify";
const PreLoadedVideo = () => {
  let { Movies } = useContext(MovieContext);
  let videoRef = useRef();
  let [play, setPlay] = useState(true);
  let VideoControls = () => {
    setPlay(!play);
    if (play) {
      videoRef.current.pause();
      videoRef.current.muted = true;
    } else {
      videoRef.current.play();
      videoRef.current.muted = false;
    }
  };
  return (
    <section id={Styles.videoBlock}>
      {Movies.length > 0 && (
        <Fragment>
          <div className={Styles.videoDesc}>
            <h2>{Movies[Movies.length - 1].movieVal.title}</h2>
            <p>Watch anywhere. Cancel anytime.</p>
            <p>
              {Movies[Movies.length - 1].movieVal.description.slice(0, 60) +
                "..."}
            </p>
            <p>
              <main onClick={VideoControls}>
                {play ? (
                  <aside className={Styles.videoAside}>
                    <FaPause className={Styles.videoPlay} />
                    <span>Pause</span>
                  </aside>
                ) : (
                  <aside className={Styles.videoAside}>
                    <FaPlay className={Styles.videoPlay} />
                    <span>Play</span>
                  </aside>
                )}
                <Link to="/user/movie">watch now</Link>
              </main>
            </p>
          </div>
          <video
            ref={videoRef}
            src={Movies[Movies.length - 1].movieVal.downLoadUrlVideo}
            className={Styles.videoBlockPlayer}
            muted
            autoPlay
          ></video>
        </Fragment>
      )}
    </section>
  );
};

export default PreLoadedVideo;
