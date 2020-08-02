import React, { useState } from "react";
import "./Post.css";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardActionArea from "@material-ui/core/CardActionArea";
import BookMarkIcon from "@material-ui/icons/Bookmark";
import Badge from '@material-ui/core/Badge'
import {Link} from '@material-ui/core/'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Post({
  id,
  username,
  beds,
  baths,
  start,
  end,
  price,
  location,
  imageURL,
  title,
  univAffiliated,
  description,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  {
    console.log(id.toString())
}

  return (
    <Badge 
    badgeContent = {"$"+price}
    color='error'
    overlap="rectangle"
    max={10000}
    anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
    }}
    >
    <Card className={classes.root} raised={true}>
    <Link href={"/postpage/"+id.toString()}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageURL}
          title={location}
        />
      </CardActionArea>
      </Link>

      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between"}}>
          <Typography variant="h4">
            {title} 
          </Typography>
          
          <Typography variant="subheading"> <strong>${price}</strong>/month </Typography>
        </div>
        <Typography variant="body2" color="textSecondary" component="p">
          {start.toDate().getMonth() + 1}/{start.toDate().getDate()}/
          {start.toDate().getFullYear()}- {end.toDate().getMonth() + 1}/
          {end.toDate().getDate()}/
          {end.toDate().getFullYear()}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Beds: {beds} Baths:{baths}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <BookMarkIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
    </Badge>
  );
}

export default Post;
