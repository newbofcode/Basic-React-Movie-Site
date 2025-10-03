import "./CSS/App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Favourites from "./pages/Favourites";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";

function App() {
  return (
    <>
      <MovieProvider>
        <div>
          <NavBar></NavBar>
        </div>
        <main className="main-content">
          <Routes>
            {" "}
            <Route path="/" element={<Home></Home>}></Route>{" "}
            <Route
              path="/favourites"
              element={<Favourites></Favourites>}
            ></Route>
          </Routes>
        </main>
      </MovieProvider>
    </>
  );
}

export default App;
