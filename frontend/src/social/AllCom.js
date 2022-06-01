import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import DeleteCom from "./DeleteCom";

// Fonction pour afficher tous les commentaires
function Allcom(props) {
  const [com, setCom] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/comment/all`)
      .then((response) => {
        return setCom(response.data);
      })
      .catch((error) => {
        return console.log(error);
      });
  }, []);

  const eventsList = com.map((event) => {
    if (props.idPost === event.post_id) {
      return ( // Mise en place du module de commentaires
          <div className="card-com" key={event.id_com}>
            <div className="header-card-com">
              <Stack direction="row" spacing={2}>
                <Avatar alt={event.user_name} src="./assets/avatar.png" />
              </Stack>
              <div
                onClick={() => {
                  if (window.confirm("Voulez-vous supprimer cet article ?")) {
                  }
                }}
              >
                <DeleteCom
                  className="trash"
                  idCom={event.id_com}
                />
              </div>
            </div>
            <div className="com-container">
              <a className="pseudo">
                {event.user_name}
              </a>
              <div className="message-com">{event.message_com}</div>
            </div>
          </div>
      );
    }
  });

  // Intégration de tous les commentaires dans le DOM
  return <div className="all-com">{eventsList}</div>;
}

export default Allcom;