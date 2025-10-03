import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of a movie object
interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  url: string; // You might want to rename this to `poster_path` for consistency
}

// Define the context shape
interface MovieContextType {
  fav: Movie[];
  addFav: (movie: Movie) => void;
  removeFav: (movieId: number) => void;
  isFav: (movieId: number) => boolean;
}

// Create the context
const MovieContext = createContext<MovieContextType | undefined>(undefined);

// Custom hook
export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};

// Provider props
interface MovieProviderProps {
  children: ReactNode;
}

// Provider component
export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [fav, setFav] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favourites");
    if (storedFavs) setFav(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(fav));
  }, [fav]);

  const addFav = (movie: Movie) => {
    if (!isFav(movie.id)) {
      setFav((prev) => [...prev, movie]);
    }
  };

  const removeFav = (movieId: number) => {
    setFav((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFav = (movieId: number) => {
    return fav.some((movie) => movie.id === movieId);
  };

  const value: MovieContextType = {
    fav,
    addFav,
    removeFav,
    isFav,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
