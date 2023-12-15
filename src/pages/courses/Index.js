import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext'
import { Button, Spinner } from "@material-tailwind/react";

// Components
import Table from "../../components/Table";


const Index = () => {
  const { authenticated } = useAuth();

  const [courses, setCourses] = useState([]);

  let token = localStorage.getItem("token");

    // Defining table header information
    const tableHead = [
      "Course",
      "Level",
      "Description",
      "Assigned | Assoc. | Career Break | Interested",
      "Actions",
    ];
  
    // Assign value to each field in table. All fields are required, use empty string "" to leave blank
    const tableRows = {
      field1: "title",
      field2: "code",
      field3: "level",
      field4: "description", // Field4 styling is suitable for longer texts
      // add field5 for conditional rendering of enrolment col?
    };
  

  useEffect(() => {
    axios
      .get("https://college-api.vercel.app/api/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Authorization": `Bearer ${token}`
        },
      })
      .then((response) => {
        setCourses(response.data.data); // Puts data in 'course' state
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (courses.length === 0) return  <Spinner className="mx-auto mt-10" />;

  return (
    <>
    <Table
        data={courses}
        tableHead={tableHead}
        tableRows={tableRows}
        resource={"courses"}
        title={"Course"}
      />
    </>
  );
};

export default Index;
