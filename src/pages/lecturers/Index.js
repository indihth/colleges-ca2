import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Typography, Spinner } from "@material-tailwind/react";

// Components
import Table from "../../components/Table";

const Index = () => {
  const { authenticated } = useAuth();

  const [lecturers, setLecturers] = useState([]);
  const [newLecturers, setNewLecturers] = useState([]); // Dynamic render when delete w/o api call

  let token = localStorage.getItem("token");

  // Defining table header information
  const tableHead = [
    "Lecturer",
    "Phone",
    "Address",
    "Assigned | Assoc. | Career Break | Interested ",
    "Actions",
  ];

  // Assign value to each field in table. All fields are required, use empty string "" to leave blank
  const tableRows = {
    field1: "name",
    field2: "email",
    field3: "phone",  
    field4: "address",    // Field4 styling is suitable for longer texts
    // add field5 for conditional rendering of enrolment col?
  };

  useEffect(() => {
    axios
      .get("https://college-api.vercel.app/api/lecturers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLecturers(response.data.data); // Puts data in 'lecturer' state
        // console.log(lecturers)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (lecturers.length === 0) return  <Spinner className="mx-auto mt-10" />;

  return (
    <>
      <Table
        data={lecturers}
        tableHead={tableHead}
        tableRows={tableRows}
        resource={"lecturers"}
        title={"Lecturer"}
      />
    </>
  );
};

export default Index;
