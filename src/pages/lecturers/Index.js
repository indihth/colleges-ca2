import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext'
import { Button } from "@material-tailwind/react";


const Index = () => {
  const { authenticated } = useAuth();

  const [lecturers, setLecturers] = useState([]);

  let token = localStorage.getItem("token");

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

  if (lecturers.length === 0) return <h3>There are no lecturers</h3>;

  const lecturersList = lecturers.map((lecturer) => {
    return (
      <div key={lecturer.id} className="my-5">
        {authenticated ? (
          <p>
            <b>Name: </b>{" "}
            <Link to={`/lecturers/${lecturer.id}`}>{lecturer.name}</Link>
          </p>
        ) : (
          <p>
            <b>Name: </b> {lecturer.name}
          </p>
        )}
      </div>
    );
  });

  return (
    <>
    <Link to="/lecturers/create"><Button>Create Lecturer</Button></Link>
      <div>Courses Index</div>
      {lecturersList}
    </>
  );
};

export default Index;
