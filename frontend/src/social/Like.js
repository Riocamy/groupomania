import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import '../styles/Home.css'

const App = (props) => {
  const [style, setStyle] = useState(null);
  const [likeNum, setLikeNum] = useState([]);

  let idPost = props.idPost.id;
  let urlElements = window.location.href.split("/");
  let id = urlElements[4];

  // Fonction pour recuperer le nombre de like
  const refreshLike = () => {
    axios
      .get(`http://localhost:8080/api/like/`)
      .then((res) => {
        setLikeNum(res.data.result);
      })
      .catch((err) => {
        return console.log(err);
      });
  };

  useEffect(() => {
    refreshLike();
  }, []);

  // Fonction pour afficher le nombre de like par post
  const numberList = likeNum.map((e) => {
    if (props.idPost.id === e.post_id) {
      return <p key={e.idlike}>{e.Nblike}</p>;
    }
  });

  // Fonction pour ajouter ou suprimer un like
  const changeStyle = () => {
    const auth = Cookies.get("Token");
    const idUser = localStorage.getItem("id");
    let idPost = props.idPost.id;

    axios
      .get(`http://localhost:8080/api/like/${idPost}`, {
        headers: {
          Authorization: `${auth}`,
        },
        data: idPost,
      })
      .then((res) => {
        let resultLike = res.data.result;
        let test = resultLike.find((element) => {
          return element.user_id == idUser;
        });
        if (!test) { // Ajouter un like
          axios
            .post(`http://localhost:8080/api/like/${idUser}`, {
              headers: {
                Authorization: `${auth}`,
              },
              data: idPost,
            })
            .then((res) => {
              refreshLike();
              props?.refreshPosts();
              return console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          return setStyle("cont");
        } else { // Annuler un like
          axios
            .delete(
              `http://localhost:8080/api/like/deletelike/${id}/${idPost}`,
              {
                headers: {
                  Authorization: `${auth}`,
                },
              }
            )
            .then((res) => {
              refreshLike();
              props?.refreshPosts();
              return setStyle(null);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Intégration dans le DOM
  return (
    <>
      <div className="container-like">
        <div className={style}>
          <i
            className="fa fa-heart"
            id={`coeur` + idPost}
            onClick={changeStyle}
          ></i>
        </div>
        {<div className="number-style">{numberList} </div>}
      </div>
    </>
  );
}
export default App;