import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

// Fonction pour ajouter un commentaire 
function Comments (props) {
  const [loading, setLoading] = useState(false);
  const [isActive, setActive] = useState("false");
  const [message, setMessage] = useState("");
  
  const timerRef = useRef();

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );

  const handleToggle = () => {
    setActive(!isActive);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading((prevLoading) => !prevLoading);

    const newPseudo = localStorage.getItem("pseudo");
    const pseudo = newPseudo.replace(/"/g, "");
    const auth = Cookies.get("Token");
    const idUser = localStorage.getItem("id");
    let idPost = props.id;

    let newObj = { message: message ,pseudo: pseudo, idPost: idPost };

    axios
      .post(`http://localhost:8080/api/comment/${idUser}`, {
        headers: {
          Authorization: `${auth}`,
        },
        data: newObj,
      })
      .then((res) => {
        window.location = `/main/${idUser}`;
        return console.log(res.data);
      })
      .catch((err) => {
        return console.log(err);
      });
  };

  // Intégration dans le DOM
  return (
    <div className={`card-form ${isActive ? "" : "actived"}`}>
        <i id="close-update" className="fa fa-ban close" onClick={handleToggle}></i>
      <h1>Commentaire</h1>
      <form>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <br />
          <input
            type="text"
            className="form-group-input"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <br />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ height: 40 }}>
        <Fade
          in={loading}
          style={{
            transitionDelay: loading ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
          <CircularProgress />
        </Fade>
      </Box>
      <button
          type="submit"
          onClick={onSubmit}
          sx={{ m: 0 }}
          className="btn btn-primary btn-block"
        >
          
          {loading ? 'Loading' : 'Comments'}
        </button>
    </Box>
      </form>
    </div>
  );
}

export default Comments;