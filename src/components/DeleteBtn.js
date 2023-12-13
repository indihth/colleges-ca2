import React from "react";
import axios from "../config/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@material-tailwind/react";

const DeleteBtn = ({
  id,
  resource,
  deleteCallback,
  relatedResource = null,
  data,
  titleText = "Delete",
  enrolements,
  toggleModal
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // const changeModal = () => {
  //   toggleModal();
  // };
  // If a related resource is included (enrolments), delete these first then resource



  const onDelete = () => {
    setIsLoading(true);

    let token = localStorage.getItem("token");

    /////////////////////////////
    // Use an if statement to bypass enrolment deletion is no enrolments?
    // Deletes without errors if no enrolments
    /////////////////////////////

    // If enrolments exist, delete these first
    if (enrolements) {
      // Creating a list of all enrolments for deletion
      let listOfDeleteRequests = data[relatedResource].map((current, index) =>
        axios.delete(`/${relatedResource}/${current.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      );
      // Using Promise instead of axios, axios.all depreciated + not in axios config
      Promise.all(listOfDeleteRequests).then((response) => {
        axios
          .delete(`/${resource}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            // Close modal window if open, or navigate to resource index 
            (toggleModal) ? toggleModal() : navigate(`/${resource}`);
            console.log("enrolment deleted, in course delete");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } else {
      axios
        .delete(`/${resource}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // do something
          console.log("no enrolments, resource delete");
          (toggleModal) ? toggleModal() : navigate(`/${resource}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Button color="red" onClick={onDelete}>
      {/* <Button color="red" onClick={onDelete}> */}
      {isLoading ? "Deleting..." : titleText}
    </Button>
  );
};

export default DeleteBtn;
