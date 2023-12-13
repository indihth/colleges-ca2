import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import { Typography, Button, Spinner } from "@material-tailwind/react";
// import DeleteBtn from "../../components/DeleteBtn";
import DeletePopup from "../../components/DeletePopup";
import DeleteModal from "../../components/DeleteModal";
import BackButton from "../../components/BackButton";

const Show = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [enrolments, setEnrolments] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  useEffect(() => {
    //
    axios
      .get(`https://college-api.vercel.app/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Authorization": `Bearer ${token}`
        },
      })
      .then((response) => {
        // console.log(response.data.data);
        setCourse(response.data.data); // Puts data in 'course' state
        response.data.data.enrolments.length > 0
          ? setEnrolments(true)
          : setEnrolments(false);
        // setEnrolment(response.data.data.enrolments)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  // If course does not exist, show text. Or while loading
  if (!course) return <Spinner className="mx-auto mt-10" />;

  // Checking enrolments can be read
  // console.log(`Enrolments: ${course.enrolments.length}`)
  console.log(`enrolments is: ${enrolments}, ${course.enrolments.length}`);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <BackButton className="mt-3" />
      <div>
        <Typography variant="h2" >{course.title}</Typography>
        <Typography variant="paragraph">{course.description}</Typography>
        <Typography variant="h5">Code: {course.code}</Typography>
        <Typography variant="h5">Points: {course.points}</Typography>
        <Typography variant="h5">Level: {course.level}</Typography>
      </div>

      <div className="mt-3">
        <Link to={`/courses/${id}/edit`}>
          <Button>Edit</Button>
        </Link>

        {/* Passing the resource type to use in end point, 'data' to pass entire object */}
        {/* <DeletePopup resource="courses" data={course} enrolments={enrolments} title="Course"/> */}

        <DeleteModal
          resource="courses"
          data={course}
          enrolments={enrolments}
          title="Course"
        />
      </div>
    </>
  );
};

export default Show;
