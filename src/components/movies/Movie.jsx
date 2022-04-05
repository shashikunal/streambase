import React from "react";
import Styles from "./movie.module.css";
import { AiFillStar } from "react-icons/ai";
import { RiUser5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
const Movie = props => {
  const totalStars = 5;

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
  } = props.movieVal;

  return (
    <main className="col-4">
      <div>
        <header>
          <Link
            to={{
              pathname: `/${title}/${id}`,
            }}
            state={{ ...props }}
          >
            <img src={downLoadUrlPhoto} alt={title} />
          </Link>
        </header>
        <aside>
          <h2>{title}</h2>
          <p className={Styles.rating_cast}>
            <span className={Styles.movieContent}>
              <li>{language}</li>
              <li>{genre}</li>
            </span>
            <span className={Styles.ratingBlock}>
              {[...new Array(totalStars)].map((arr, index) => {
                return index < ratings ? (
                  <AiFillStar
                    style={{
                      color: "#ffc107",
                    }}
                  />
                ) : (
                  <AiFillStar />
                );
              })}
            </span>
          </p>

          <p className={Styles.movie_desc}>
            {description.slice(0, 30) + "..."}
          </p>
          <p className={Styles.cast_block}>
            <span>
              <RiUser5Fill />
            </span>
            <span>{cast}</span>
          </p>
        </aside>
        <footer className={Styles.movie_footer}>
          <Link
            to={{
              pathname: `/${title}/${id}`,
            }}
            state={{ ...props }}
          >
            watch now
          </Link>
        </footer>
        {/* <button onClick={sendMovies}>watch now</button> */}
      </div>
    </main>
  );
};

export default Movie;
