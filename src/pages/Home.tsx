import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "../CSS/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";
interface Props {
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
  id: number;
}
function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [movies, setMovies] = useState<Props[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        console.log("API response:", popularMovies);
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search...");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="home">
      <form className="search-movie" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a Movie..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading , please wait</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie, index) => {
            return (
              <MovieCard
                url={movie.poster_path}
                title={movie.title}
                release_date={movie.release_date}
                summary={movie.overview}
                key={index} // use movie.id if it's unique
                id={movie.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
