import React, { useState, useEffect} from "react";
import "./App.css";
import Post from "./Post";
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data(),
      })))
      })
  }, []);

  return (
    <div className="App">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://umterps.com/images/logos/site/site.png"
          alt=""
        ></img>
      </div>
      
      {posts.map(({id, post}) => (
        <Post key={id} beds={post.beds} baths={post.baths} start={post.start} end={post.end} price={post.price} location={post.location} imageURL={post.imageURL}/>
      ))
      }
    </div>
  );
}

export default App;
