import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { validEmail, validPassword } from "../utils/regex";

function Update(profile) {
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [Emploi, setEmploi] = useState("");
  const [Ville, setVille] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);

  // Fonction pour modifier les informations d'un profil
  const submitHandler = (e) => {
    e.preventDefault();
    if (!validEmail.test(email)) {
      return setEmailErr(true);
    }
    if (!validPassword.test(password)) {
      return setPwdError(true);
    }

    // Informations après modification
    let newPseudo = localStorage.setItem('pseudo', pseudo);
    const auth = Cookies.get("Token");
    let update = { email, pseudo, password, Emploi, Ville };
    const id = localStorage.getItem("id");

    // Affichage des informations modifiées
    axios
      .put(`http://localhost:8080/api/user/update/${id}`, update, {
        headers: {
          Authorization: `${auth}`,
        },
      })
      .then((response) => {
        
        return (window.location = `/profil/${id}`);
      })
      .catch((err) => {
        let message = document.querySelector(".passwordError");
        message.innerHTML = `${err.response.data.message}`;
      });
  };

  // Intégration des informations modifiées dans le DOM
  return (
    <div>
      <form className="card-form" onSubmit={submitHandler}>
        <div>
          Email
          <br />
          <input
            type="email"
            name="email"
            className="form-modif"
            autoComplete="on"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder={profile.email}
            minLength="2" 
            maxLength="35"
            required="required"
          />
        </div>
        <br />
        <div>
          Pseudo
          <br />
          <input
            type="text"
            name="pseudo"
            className="form-modif"
            autoComplete="on"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
            placeholder={profile.pseudo}
            minLength="2" 
            maxLength="25"
            required="required"
          />
        </div>
        <div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            className="form-modif"
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            minLength="2" 
            maxLength="25"
            required="required"
          />
        </div>
        <div>
          <br />
          <label htmlFor="password">Emploi</label>
          <br />
          <input
            type="text"
            name="Emploi"
            className="form-modif"
            autoComplete="on"
            onChange={(e) => setEmploi(e.target.value)}
            value={Emploi}
            placeholder={profile.emploi}
            minLength="2" 
            maxLength="25"
            required="required"
          />
        </div>
        <div>
          <br />
          <label htmlFor="password">Ville</label>
          <br />
          <input
            type="text"
            name="Ville"
            className="form-modif"
            autoComplete="on"
            onChange={(e) => setVille(e.target.value)}
            value={Ville}
            placeholder={profile.ville}
            minLength="2" 
            maxLength="25"
            required="required"
          />
        </div>
        <br />
        <div className="passwordError"></div>
        <br />

        <input
          className="delete-button"
          type="submit"
          value="Enregistrer modifications"
        />
        <div className="err-update">
          {emailErr && <p>Adresse email invalide</p>}
          {pwdError && (
            <p>Mot de passe require 6 characters, un nombre, une majuscule</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Update;