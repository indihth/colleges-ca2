import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Spinner } from "@material-tailwind/react";
import Table from "../../components/Table";

const Index = () => {
  const { authenticated } = useAuth();

  const [enrolments, setEnrolments] = useState([]);

  let token = localStorage.getItem("token");

  // Defining table header information
  const tableHead = ["Course", "Lecturer", "Status", "Actions"];
  

  // Assign value to each field in table. All fields are required, use empty string "" to leave blank
  // Two levels of dot notation need to access course and lecturer object, "course.name" doesn't work
  const tableRows = {
    field1: "course",
    field1a: "title",
    field2: "course",
    field2a: "code",
    field3: "lecturer",
    field3a: "name",
    status: "status", // Field4 styling is suitable for longer texts
    // add field5 for conditional rendering of enrolment col?
  };

  useEffect(() => {
    axios
      .get("https://college-api.vercel.app/api/enrolments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEnrolments(response.data.data); // Puts data in 'enrolment' state
        // console.log(enrolments)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (enrolments.length === 0) return  <Spinner className="mx-auto mt-10" />;

  return (
    <div>
      <Table
        data={enrolments}
        tableHead={tableHead}
        tableRows={tableRows}
        resource={"enrolments"}
        title={"Enrolment"}
      />
    </div>
  );
};

export default Index;
