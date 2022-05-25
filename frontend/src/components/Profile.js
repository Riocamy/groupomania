import React, { useState } from "react";
import UploadImg from "./UploadImg";
import Update from "../components/Update";
import Delete from "../components/Delete";
import axios from "axios";
import Cookies from "js-cookie";
import avatar from "../assets/avatar.png";

// Fonction pour mettre en place le profil de l'utilisateur
function Profile() {
  // Informations disponibles dans le profil 
  const [imgSrc, setImgSrc] = useState("");
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [city, setCity] = useState("");
  const [job ,setJob] = useState("");
  // Modification et suppression du profil
  const [UpModal, setUpModal] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);

  // Récupération des données d'authentification
  let urlElements = window.location.href.split("/");
  let id = urlElements[4];
  const auth = Cookies.get("Token");

  // Affichage des informations du profil de l'utilisateur
  axios
    .get(`http://localhost:8080/api/user/profile/${id}`, {
      headers: {
        Authorization: `${auth}`,
      },
    })
    .then((response) => {
      setImgSrc(response.data[0].imageUrl);
      setEmail(response.data[0].email);
      setPseudo(response.data[0].pseudo);
      setCity(response.data[0].Ville);
      setJob(response.data[0].Emploi);
    })
    .catch((error) => {
      return console.log(error);
    });

  // Fonction pour suprimer ou modifier un profil
  const handleModals = (e) => {
    if (e.target.id === "modifier") {
      setDeleteModal(false);
      setUpModal(true);
    } else if (e.target.id === "suprimer") {
      setUpModal(false);
      setDeleteModal(true);
    }
  };

  // Intégration du profil dans le DOM
  return (
    <div className="card-position">
      <div className="profile-card ">
        <div className="icon-color"></div>
        <div>
          <img
            src={imgSrc ? `${imgSrc}` : `${avatar}`}
            alt="profile_picture"
            id="img-profile"
          />
          <UploadImg />
        </div>

        <h1 id="pseudoProfile">{pseudo}</h1>
        <div className="info-profile">
          <i className="fas fa-user"></i>

          <div id="jobProfile" className="info-profile">
            {job}
          </div>
        </div>
        <div className="info-profile">
          <i className="fas fa-map-marker-alt"></i>
          <div id="cityProfile" className="info-profile">
            {city}
          </div>
        </div>
        <div className="info-profile">
          <i id="i" className="fas fa-envelope"></i>
          <div className="info-profile" id="emailProfile" value="text" >
          {email}
          </div>
        </div>
        <input
          type="submit"
          value="Modifier"
          onClick={handleModals}
          id="modifier"
          className="btn-profil"
        />
        <input
          type="submit"
          value="Suprimer"
          onClick={handleModals}
          id="suprimer"
          className="btn-profil"
        />
        {UpModal && <Update email={email} ville={city} pseudo={pseudo} emploi={job} />}
        {DeleteModal && <Delete email={email} />}
      </div>
    </div>
  );
}

Profile.propTypes = {};

export default Profile;