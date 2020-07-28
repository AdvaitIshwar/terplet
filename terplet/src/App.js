import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <Fade in={open}>
          <div style={modalStyle} className={classes.paper}>
            Sign Up
          </div>
        </Fade>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://umterps.com/images/logos/site/site.png"
          alt=""
        ></img>
      </div>

      <Button onClick={() => setOpen(true)}>Sign Up</Button>

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          beds={post.beds}
          baths={post.baths}
          start={post.start}
          end={post.end}
          price={post.price}
          location={post.location}
          imageURL={post.imageURL}
        />
      ))}
    </div>
  );
}

export default App;
