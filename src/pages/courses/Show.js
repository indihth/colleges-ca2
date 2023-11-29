import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import { Typography, Button } from "@material-tailwind/react";
import DeleteBtn from "../../components/DeleteBtn";

const Show = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Authorization": `Bearer ${token}`
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setCourse(response.data.data); // Puts data in 'course' state
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  // If course does not exist, show text. Or while loading
  if (!course) return <h3>Course not found</h3>;

  return (
    <>
      <div>
        <Typography variant="h2">{course.title}</Typography>
        <Typography variant="paragraph">{course.description}</Typography>
        <Typography variant="h5">Code: {course.code}</Typography>
        <Typography variant="h5">Points: {course.points}</Typography>
        <Typography variant="h5">Level: {course.level}</Typography>
      </div>

      <div className="mt-3">
        <Link to={`/courses/${id}/edit`}>
          <Button>Edit</Button>
        </Link>
        {/* Can't pass function declaration i.e navigate() - must pass a function*/}
        <DeleteBtn
          id={id}
          resource="courses"
          deleteCallback={() => navigate("/courses")}
        />
      </div>
    </>
  );
};

export default Show;
