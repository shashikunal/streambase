import React from "react";
import { useLocation } from "react-router-dom";
import Styles from "./movie.module.css";
import MovieSection from "./MovieSection";
const MovieDetails = props => {
  let location = useLocation();
  let { movieVal } = location.state;
  let {
    title,
    id,
    description,
    language,
    cast,
    genre,
    ratings,
    downLoadUrlPhoto,
    downLoadUrlVideo,
    yol,
  } = movieVal;
  return (
    <section id={Styles.moviePlayer}>
      <article>
        <main>
          <div className={Styles.videoPlayer}>
            <video src={downLoadUrlVideo} controls autoPlay></video>
          </div>
          <div className={Styles.videoDescription}>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>Language {language}</p>
            <p> Year {yol}</p>
            <p>{genre}</p>
            <p>Rating {ratings}</p>
            <p>Cast : {cast}</p>
          </div>
        </main>

        <footer>
          <MovieSection />
        </footer>
      </article>
    </section>
  );
};

export default MovieDetails;
