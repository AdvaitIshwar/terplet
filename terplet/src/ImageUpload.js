import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import { db, storage } from "./firebase";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name})`).put(image);

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
            db.collection("TEST").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              beds: beds,
              baths: baths,
              price: price,
              location: location,
              start: startDate,
              end: endDate,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div>
      <progress value={progress} max="100" />
      <br />

      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <br />

      <input
        type="text"
        placeholder="Enter Number of Beds"
        onChange={(event) => setBeds(event.target.value)}
        value={beds}
      />
      <br />

      <input
        type="text"
        placeholder="Enter Number of Baths..."
        onChange={(event) => setBaths(event.target.value)}
        value={baths}
      />
      <br />

      <input
        type="text"
        placeholder="Enter Price..."
        onChange={(event) => setPrice(event.target.value)}
        value={price}
      />
      <br />

      <input
        type="date"
        placeholder="Enter Start Date ..."
        onChange={(event) => setStartDate(event.target.value)}
        value={startDate}
      />
      <br />

      <input
        type="date"
        placeholder="Enter End Date..."
        onChange={(event) => setEndDate(event.target.value)}
        value={endDate}
      />
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

      <input type="file" onChange={handleChange} />
      <br />

      <Button onClick={handleUpload}>Post</Button>
    </div>
  );
}

export default ImageUpload;
