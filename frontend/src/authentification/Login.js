import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import '../styles/Auth.css';

// Utilisation de la classe LoginForm pour mettre en place le formulaire de connexion
class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  changeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // Fonction permettant de se connecter à son profil
  submitHandler = (e) => {
    e.preventDefault();
    // Mise en place d'Axios pour gérer les requêtes
    axios
      .post("http://localhost:8080/api/user/login", this.state)
      .then((response) => {
        const pseudo = response.data.pseudo;
        const id = response.data.id;
        localStorage.setItem("pseudo", JSON.stringify(pseudo));
        localStorage.setItem("id", JSON.stringify(id));
        window.location = `/profil/${id}`;
        // Stockage du token pour vérifier que c'est le bon utilisateur
        Cookies.set("Token", response.data.token, { expires: 1 });
      })
      .catch((err) => {
        let message = document.querySelector(".passwordError");
        message.innerHTML = `${err.response.data.message}`;
      });
  };

  // Création du formulaire de connexion dans le DOM
  render() {
    const { email, password } = this.state;
    return (
      <div className="card-position">
        <form className="card-form" onSubmit={this.submitHandler}>
          <label htmlFor="email">
            Email
            <br />
            <input
              id="email-log"
              type="text"
              name="email"
              className="email"
              value={email}
              onChange={this.changeHandler}
            />
            <br />
          </label>

          <br />
          <label htmlFor="password">
            Mot de passe
            <br />
            <input
              type="password"
              name="password"
              className="email"
              autoComplete="on"
              id="password-log"
              value={password}
              onChange={this.changeHandler}
            />
            <br />
          </label>

          <div className="passwordError"></div>
          <br />
          <input className="submit-button" type="submit" value="Se connecter" />
        </form>
      </div>
    );
  }
}

export default LoginForm;