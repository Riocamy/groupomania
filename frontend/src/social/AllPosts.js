import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";

// Fonction pour afficher tous les posts
function AllPosts() {
  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    axios
      .get(`http://localhost:8080/api/post/getAll`)
      .then((response) => {
        return setPosts(response.data);
      })
      .catch((error) => {
        return console.log(error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const eventsList = posts.map((event, index) => (
    <div key={index}>
      <Post post={event} refreshPosts={getPosts} />
    </div>
  ));

  // Intégration dans le DOM
  return (
    <div>
      <div>{eventsList}</div>
    </div>
  );
}

export default AllPosts;