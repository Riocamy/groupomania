import React from "react";
import Nav from "../social/Navigation";
import NewPost from "../social/NewPost";
import AllPosts from "../social/AllPosts";
import '../styles/Feed.css'

// Mise en place du feed
const Feed = (props) => {
  return (
    <div>
      <Nav />
      <NewPost />
      <AllPosts />
    </div>
  );
};

Feed.propTypes = {};

export default Feed;