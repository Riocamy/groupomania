//import logo from '../logo.svg';
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Profil from "../pages/Private";
import '../styles/App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil/:id" element={<Profil />} />
      </Routes>
    </div>
  );
}

export default App;

/*
// Modèle React par défaut
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/