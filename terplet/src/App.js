import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import PostPage from "./PostPage";
import Favorites from "./Favorites";
import { db, auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import NewListing from "./NewListing";
import { Grid } from "@material-ui/core";
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from './NavBar'
import {useStateValue} from "./StateProvider"


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
    paddingRight: "100px",
  },
}));

function App() {
  const [{favorites}] = useStateValue();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  console.log(favorites)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
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
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  return (
    <div className="App">
      {/* <NavBar user={user} auth={auth} setOpenSignIn={setOpenSignIn} setOpen={setOpen}/> */}

      <Router>
      <NavBar user={user} auth={auth} setOpenSignIn={setOpenSignIn} setOpen={setOpen}/>
        <Switch>

          <Route exact path="/newlisting">
            {user?.displayName ? (
              <NewListing username={user.displayName} />
            ) : (
              <h3>Please Login</h3>
            )}          
          </Route>

          <Route path ="/postpage/:id">
              <PostPage />
          </Route>

          <Route path ="/favorites">
              <Favorites />
          </Route>

          <Route exact path="/">
            <Modal open={open} onClose={() => setOpen(false)}>
              <Fade in={open}>
                <div style={modalStyle} className={classes.paper}>
                  <center>
                    <h3>TERPLET</h3>
                  </center>
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
                    <Button type="submit" onClick={signUp}>
                      Sign Up
                    </Button>
                  </form>
                </div>
              </Fade>
            </Modal>

            <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
              <Fade in={openSignIn}>
                <div style={modalStyle} className={classes.paper}>
                  <center>
                    <h3>TERPLET</h3>
                  </center>
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
                    <Button type="submit" onClick={signIn}>
                      Sign In
                    </Button>
                  </form>
                </div>
              </Fade>
            </Modal>

            {/*<div className="app__header">
              <img
                className="app__headerImage"
                src="https://umterps.com/images/logos/site/site.png"
                alt=""
              ></img>
            </div>*/}
            <br />
            <Grid container spacing={4} className={classes.gridContainer} >
              {posts.map(({ id, post }) => (
                <Grid item>
                  <Post
                    id={id}
                    username={post.username}
                    description={post.description}
                    univAffiliated={post.univAffiliated}
                    beds={post.beds}
                    baths={post.baths}
                    start={post.start}
                    end={post.end}
                    price={post.price}
                    location={post.location}
                    imageURL={post.imageURL}
                    title={post.title}
                  />
                </Grid>
              ))}
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
