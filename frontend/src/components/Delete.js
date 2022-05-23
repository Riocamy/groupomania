import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import swal from "sweetalert";
import { validPassword } from "../utils/regex";

function Delete(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwdError, setPwdError] = useState(false);

  // Fonction pour suprimer un profil
  const submitHandler = (e) => {
    e.preventDefault();
    if (!validPassword.test(password)) {
      return setPwdError(true);
    }
    // Condition de verification pour la suppression
    if (props.email !== email) {
      swal("Email ou mot de passe incorrect");
    } else {
      let urlElements = window.location.href.split("/");
      let id = urlElements[4];
      const auth = Cookies.get("Token");

      // Suppression des informations
      axios
        .delete(`http://localhost:8080/api/user/delete/${id}`, {
          headers: {
            Authorization: `${auth}`,
          },
        })
        .then((response) => {
          function handleRemoveCookie() {
            Cookies.remove("Token", { path: "" });
          }
          window.location = "/";
          handleRemoveCookie();
        })
        .catch((err) => {
          let message = document.querySelector(".passwordError");
          message.innerHTML = `${err.response.data.message}`;
        });
    }
  };

  // Intégration de la fonctionnalité delete dans le DOM
  return (
    <div className="card-delete">
      <form className="card-form" onSubmit={submitHandler}>
        <div>
          Email
          <br />
          <input
            type="text"
            name="email"
            className="form-modif"
            autoComplete="on"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <br />

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
          />
        </div>
        <div className="passwordError"></div>
        <br />

        <input
          className="delete-button"
          type="submit"
          value="Suprimer profil"
        />
        <div className="err-update">
          {pwdError && <p>Mot de passe invalide</p>}
        </div>
      </form>
    </div>
  );
}

export default Delete;