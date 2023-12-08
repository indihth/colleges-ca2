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
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // If a related resource is included (enrolments), delete these first then resource

  const onDelete = () => {
    setIsLoading(true);

    let token = localStorage.getItem("token");

    // Debugging:
    // console.log(`resource: ${resource}`)
    // console.log(`related resource ${relatedResource}`)
    // console.log(data)
    // console.log(`Id: ${id}`)

    /////////////////////////////
    // Use an if statement to bypass enrolment deletion is no enrolments?
    // Deletes without errors if no enrolments
    /////////////////////////////
    // If enrolments exists for resource, delete these first
    if (!resource === "enrolments") {
      // Creating a list of all enrolments for deletion
      let listOfDeleteRequests = data[relatedResource].map((current, index) =>
        axios.delete(`/${relatedResource}/${current.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      );
      // log the contents of listOfDeleteRequests
      console.log("onDelete");
      console.log(listOfDeleteRequests);

      // Using Promise instead of axios, axios.all depreciated + not in axios config
      Promise.all(listOfDeleteRequests).then((response) => {
        axios
          .delete(`/${resource}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            // do something
            console.log("enrolment deleted, in course delete");
            navigate(`/${resource}`);
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
          console.log("enrolment deleted, in course delete");
          navigate(`/${resource}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // axios
    //   .delete(`/${resource}/${id}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     console.log("single delete");
    //     deleteCallback(id); // Runs the removeX function from whatever resource it came from
    //     // navigate("/courses");
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data);
    //   });
  };

  return (
    <Button color="red" onClick={onDelete}>
      {isLoading ? "Deleting..." : titleText}
    </Button>
  );
};

export default DeleteBtn;
