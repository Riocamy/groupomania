import React, { useState } from "react";
import "../index";
import Login from "../authentification/Login";
import Signup from "../authentification/Signup";
import Logo from "../assets/icon-left-font-monochrome-black.png";
import '../styles/Home.css'


// Fonction pour mettre en place la homepage
function Home() {
  
  const [signUpModal, setSignUpModal] = useState(false);
  const [signInModal, setSignInModal] = useState(true);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  // Intégration de la homepage dans le DOM
  return (
    <div className="connection-form">
      <img className="logo-profile" src={Logo} alt="logo groupomania"></img>

      <div className="form-container">
        <ul className="log">
          <li onClick={handleModals} id="register" className="active">
            S'inscrire
          </li>

          <li onClick={handleModals} id="login" className="active">
            Se connecter
          </li>
        </ul>
        <></>
        {signUpModal && <Signup />}
        {signInModal && <Login />}
      </div>
    </div>
  );
}

export default Home;