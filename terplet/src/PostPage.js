import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { useParams } from "react-router-dom";

function PostPage() {

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


  let { id } = useParams();
  useEffect(() => {
    let docRef = db.collection("posts").doc(id);

    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
            setTitle(doc.data().title)
            setDescription(doc.data().description)
            setBeds(doc.data().beds)
            setBaths(doc.data().baths)
            setPrice(doc.data().price)
            setLocation(doc.data().location)
            setUnivAffiliated(doc.data().univAffiliated)
            setStartDate(doc.data().start)
            setEndDate(doc.data().end)
            setImage(doc.data().imageURL)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, []);

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

export default PostPage;
