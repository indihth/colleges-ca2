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
        setLecturers(response.data.data); // Puts data in 'lecture' state
        // console.log(lecturers)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (lecturers.length === 0) return <h3>There are no lecturers</h3>;

  const lectureList = lecturers.map((lecture) => {
    return (
      <div key={lecture.id} className="my-5">
        {authenticated ? (
          <p>
            <b>Name: </b>{" "}
            <Link to={`/lecturers/${lecture.id}`}>{lecture.name}</Link>
          </p>
        ) : (
          <p>
            <b>Name: </b> {lecture.name}
          </p>
        )}
      </div>
    );
  });

  return (
    <>
    <Button><Link to="/lecturers/create">Create Lecturer</Link></Button>
      <div>Courses Index</div>
      {lectureList}
    </>
  );
};

export default Index;
