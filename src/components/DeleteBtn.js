import React from "react";
import axios from '../config/api'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";


const DeleteBtn = ({ id, resource, deleteCallback }) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onDelete = () => {
    setIsLoading(true);

    let token = localStorage.getItem("token");

    axios
      .delete(`/${resource}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        deleteCallback(id); // Runs the removeX function from whatever resource it came from
        // navigate("/courses");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return <Button color="red" onClick={onDelete}>
    {(isLoading) ? "Deleting..." : "Delete"}
    </Button>;
};

export default DeleteBtn;
