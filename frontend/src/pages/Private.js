import React, { useState } from "react";
import Profile from "../components/Profile";
import Logo from "../assets/icon-left-font-monochrome-black.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

// Fonction pour mettre en place de l'espace privé
function Private() {
  const navigate = useNavigate();
  const [logoutModal, setLogOutModal] = useState(false);

  // Suppression du Token lorsqu'on se déconnecte
  function handleRemoveCookie() {
    Cookies.remove("Token");
  }
  // Gestion du Token pendant la navigation
  const handleModals = (e) => {
    if (e.target.id === "home-btn") {
      const newId = localStorage.getItem("id");
      const id = newId.replace(/"/g, "");
      navigate(`/accueil/${id}`);
    } else if (e.target.id === "logout") {
      setLogOutModal(true);
      handleRemoveCookie();
      navigate("/");
    } else {
      console.log("Token cookie not found");
    }
  };

  // Intégration de l'espace privé dans le DOM
  return (
    <div>
      <img className="logo-profile" src={Logo} alt="logo groupomania"></img>
      <div className="connection-form">
        <button className="home-btn" id="home-btn" onClick={handleModals}>
          {" "}
          Acceuil
        </button>
        <button id="logout" onClick={handleModals}>
          Logout
        </button>
        {logoutModal}
        <Profile />
      </div>
    </div>
  );
}

export default Private;