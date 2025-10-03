import React, { useState } from "react";
import "../CSS/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
//need image, title, summary, release date, favourite
interface Props {
  url: string;
  title: string;
  release_date: string;
  summary: string;
  id: number;
}
const MovieCard = ({ url, title, release_date, summary, id }: Props) => {
  const [favouriteBtn, setFavouriteBtn] = useState("❤");
  const { isFav, addFav, removeFav } = useMovieContext();
  const fav = isFav(id);
  return (
    <div className="movie-card">
      <div className="movie-img">
        <img src={`https://image.tmdb.org/t/p/w500${url}`} alt={title} />
        <div className="movie-overlay">
          <button
            className={`favourite-btn ${fav ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              if (fav) removeFav(id);
              else addFav({ url, title, release_date, summary, id });
              setFavouriteBtn((prev) => (prev === "❤" ? "💕" : "❤"));
            }}
          >
            {favouriteBtn}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{title} </h3>
        <p>{summary}</p>
        <p>{"Released in: " + release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
};

export default MovieCard;
