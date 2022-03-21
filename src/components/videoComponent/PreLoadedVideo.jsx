import React, { useRef, useState } from "react";
import VIDEO from "./arabic_kuthu.mp4";
import Styles from "./video.module.css";
import { FaPlay, FaPause } from "react-icons/fa";
const PreLoadedVideo = () => {
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
      <div className={Styles.videoDesc}>
        <h2>Lorem ipsum dolor sit.</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          quae commodi quas quo animi earum inventore quod soluta corrupti
          laborum....
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
          </main>
        </p>
      </div>
      <video
        ref={videoRef}
        src={VIDEO}
        className={Styles.videoBlockPlayer}
        muted
        autoPlay
      ></video>
    </section>
  );
};

export default PreLoadedVideo;
