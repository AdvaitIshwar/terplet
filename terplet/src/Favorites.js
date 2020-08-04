import React from 'react'
import {useStateValue} from "./StateProvider";
import { Grid } from "@material-ui/core";
import Post from "./Post";
import { makeStyles } from "@material-ui/core/styles";

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

function Favorites (){
    const classes = useStyles();
    const [{favorites}] = useStateValue();
    console.log(favorites)
    return (
        <div>
            {favorites?.length === 0 ? (
                <h2>You have no favorites</h2>
            ) : (
                <h2>Your Favorites</h2>
            )}
            <Grid container spacing={4} className={classes.gridContainer} >
                {favorites.map((item ) => (
                    <Grid item>
                    <Post
                        id={item.id}
                        username={item.username}
                        description={item.description}
                        univAffiliated={item.univAffiliated}
                        beds={item.beds}
                        baths={item.baths}
                        start={item.start}
                        end={item.end}
                        price={item.price}
                        location={item.location}
                        imageURL={item.imageURL}
                        title={item.title}
                    />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
};

export default Favorites;