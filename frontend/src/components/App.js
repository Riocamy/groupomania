import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Private from "../pages/Private";
import Feed from "../pages/Feed";
import '../styles/App.css';
import '../styles/Media.css'; //styles responsive

// Mise en place des routes
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil/:id" element={<Private />} />
        <Route path="/accueil/:id" element={<Feed />} />
      </Routes>
    </div>
  );
}

export default App;