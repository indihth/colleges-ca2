import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import { Typography, Button } from "@material-tailwind/react";
import DeleteBtn from "../../components/DeleteBtn";

const Show = () => {
  const { id } = useParams();
  const [enrolment, setEnrolment] = useState(null);

  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/enrolments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Authorization": `Bearer ${token}`
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setEnrolment(response.data.data); // Puts data in 'enrolment' state
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  // If enrolment does not exist, show text. Or while loading
  if (!enrolment) return <h3>Enrolments not found</h3>;

  return (
    <>
      <div>
        <Typography variant="h2">Status: {enrolment.status}</Typography>
        <Typography variant="h5">Course: {enrolment.course.title}</Typography>
        <Typography variant="h5">Lecturer: {enrolment.lecturer.name}</Typography>
      </div>

      <div className="mt-3">
        <Link to={`/enrolments/${id}/edit`}>
          <Button>Edit</Button>
        </Link>
        {/* Can't pass function declaration i.e navigate() - must pass a function*/}
        <DeleteBtn
          id={id}
          resource="enrolments"
          deleteCallback={() => navigate("/enrolments")}
        />
      </div>
    </>
  );
};

export default Show;
