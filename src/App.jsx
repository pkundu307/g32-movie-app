import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import Loader from "./components/Loader";
import Searchbar from "./components/Searchbar";

function App() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <Searchbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
