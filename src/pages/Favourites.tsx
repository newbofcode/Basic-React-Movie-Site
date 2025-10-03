import React from "react";
import "../CSS/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

const Favourites = () => {
  const { fav } = useMovieContext();

  return fav.length > 0 ? (
    <div className="movies-grid">
      {fav.map((movie) => (
        <MovieCard
          url={movie.url}
          title={movie.title}
          release_date={movie.release_date}
          summary={movie.summary}
          id={movie.id}
          key={movie.id}
        />
      ))}
    </div>
  ) : (
    <div className="favourites">
      <h2>Your Favourite Movies</h2>
      <p className="favourites-empty">No favourites yet</p>
    </div>
  );
};

export default Favourites;
