import React, { useState } from "react";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import { db, storage } from "./firebase";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import "./NewListing.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DateFnsUtils from "@date-io/date-fns";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function ImageUpload({ username }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [univAffiliated, setUnivAffiliated] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              title: title,
              univAffiliated: univAffiliated,
              description: description,
              imageURL: url,
              beds: beds,
              baths: baths,
              price: price,
              location: location,
              start: startDate,
              end: endDate,
              username: username,
            });

            setUnivAffiliated("");
            setTitle("");
            setBaths();
            setBeds();
            setPrice("");
            setLocation("");
            setStartDate(new Date());
            setEndDate(new Date());
            setProgress(0);
            setDescription("");
            setImage(null);
          });
      }
    );
  };

  const incrementBeds = () => {
    setBeds(beds+1);
  };
  const decrementBeds = () => {
    if(beds > 0){
    setBeds(beds-1);
    }
  };
  const incrementBaths = () => {
    setBaths(baths+1);
  };
  const decrementBaths = () => {
    if(baths > 0){
    setBaths(baths-1);
    }
  };

  return (
    <div className="newlisting">
      <progress className="imageupload__progress" value={progress} max="100" />
      <br />

      <InputLabel htmlFor="listingtitle">Listing Title</InputLabel>
      <TextField
        id="listingtitle"
        variant="outlined"
        label="Listing Title"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />
      <br />

      <InputLabel htmlFor="listingdescription">Description</InputLabel>
      <TextareaAutosize
        id="listingdescription"
        aria-label="minimum height"
        rowsMin={4}
        onChange={(event) => setDescription(event.target.value)}
        value={description}
      />
      <br />


      <InputLabel htmlFor="beds">Number of Beds</InputLabel>
      <ButtonGroup disableElevation variant="contained" color="primary">
        <Button onClick={decrementBeds}>-</Button>
        <Button><strong>{beds}</strong></Button>
        <Button onClick={incrementBeds}>+</Button>
      </ButtonGroup>
      <br />


      <InputLabel htmlFor="baths">Number of Baths</InputLabel>
      <ButtonGroup disableElevation variant="contained" color="primary">
        <Button onClick={decrementBaths}>-</Button>
        <Button><strong>{baths}</strong></Button>
        <Button onClick={incrementBaths}>+</Button>
      </ButtonGroup>
      <br />

      <InputLabel htmlFor="input-with-icon-adornment">Price</InputLabel>
      <Input
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <AttachMoneyIcon />
          </InputAdornment>
        }
        onChange={(event) => setPrice(event.target.value)}
        value={price}
      />
      <br />

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Start Date"
          format="MM/dd/yyyy"
          value={startDate}
          onChange={(date) => setStartDate(date)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />

        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="End Date"
          format="MM/dd/yyyy"
          value={endDate}
          onChange={(date) => setEndDate(date)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <br />

      <InputLabel htmlFor="location">Location</InputLabel>
      <Select
        native
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        inputProps={{
          name: "location",
          id: "location",
        }}
      >
        <option aria-label="None" value="" />
        <option value={"Terrapin Row"}>Terrapin Row</option>
        <option value={"The Varsity"}>The Varsity</option>
        <option value={"The View"}>The View</option>
        <option value={"Other"}>Other</option>
      </Select>
      <br />

      <InputLabel htmlFor="location">New Tenant Required to be University Affiliated?</InputLabel>
      <Select
        native
        value={univAffiliated}
        onChange={(event) => setUnivAffiliated(event.target.value)}
      >
        <option aria-label="None" value="" />
        <option value={"Yes"}>Yes</option>
        <option value={"No"}>No</option>
      </Select>
      <br />

      <input type="file" onChange={handleChange} />
      <br/>

      <Button onClick={handleUpload}>Post</Button>
      <br />
    </div>
  );
}

export default ImageUpload;
