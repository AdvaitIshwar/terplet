import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import TextField from '@material-ui/core/TextField';
import ImageUpload from './ImageUpload';
import {Grid} from "@material-ui/core"

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
  gridContainer: {
    paddingLeft: "100px",
    paddingRight: "100px"
  }
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser)

      } else {
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }

  }, [user, username]);

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

  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));
    
    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div className="App">
      {user?.displayName ? (<ImageUpload username={user.displayName}/>) : <h3>Please Login</h3>}

      <Modal open={open} onClose={() => setOpen(false)}>
        <Fade in={open}>
          <div style={modalStyle} className={classes.paper}>
            <center><h3>TERPLET</h3></center>
            <br />
            <form className="app__signup">
              <TextField
                required
                id="outlined-username-input"
                label="Username"
                type="username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <TextField
                required
                id="outlined-email-input"
                label="Email"
                type="email"
                autoComplete="current-email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
                <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <Button type="submit" onClick={signUp}>Sign Up</Button>
            </form>
          </div>
        </Fade>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <Fade in={openSignIn}>
          <div style={modalStyle} className={classes.paper}>
            <center><h3>TERPLET</h3></center>
              <br />
              <form className="app__signup">
                <TextField
                  required
                  id="outlined-email-input"
                  label="Email"
                  type="email"
                  autoComplete="current-email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                  <TextField
                  required
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <Button type="submit" onClick={signIn}>Sign In</Button>
            </form>
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

      {user ? (<Button onClick={() => auth.signOut()}>Logout</Button>):
      (
      <div>
      <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
      <Button onClick={() => setOpen(true)}>Sign Up</Button>
      </div>
      )}
      <Grid container spacing={4} className={classes.gridContainer}>
        {posts.map(({ id, post }) => (
          <Grid item>
          <Post
            key={id}
            beds={post.beds}
            baths={post.baths}
            start={post.start}
            end={post.end}
            price={post.price}
            location={post.location}
            imageURL={post.imageURL}
            caption={post.caption}
          />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
