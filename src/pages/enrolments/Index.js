import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext'
import { Button } from "@material-tailwind/react";


const Index = () => {
  const { authenticated } = useAuth();

  const [enrolments, setEnrolments] = useState([]);

  let token = localStorage.getItem("token");

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

  if (enrolments.length === 0) return <h3>There are no enrolments</h3>;

  const enrolmentList = enrolments.map((enrolment) => {
    return (
      <div key={enrolment.id} className="my-5">
        {authenticated ? (
          <>
          <p>
            <b>Status: </b>{" "}
            <Link to={`/enrolments/${enrolment.id}`}>{enrolment.status}</Link>
          </p>
          <p><b>Course:</b> {enrolment.course.title}</p>
          <p><b>Lecturer:</b> {enrolment.lecturer.name}</p>
          </>
        ) : (
          <p>
            <b>Course: </b> {enrolment.status}
          </p>
        )}
      </div>
    );
  });

  return (
    <>
    <Button><Link to="/enrolments/create">Create Enrolment</Link></Button>
      <div>Enrolments Index</div>
      {enrolmentList}
    </>
  );
};

export default Index;
