import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import { Typography, Button, Spinner } from "@material-tailwind/react";
import BackButton from "../../components/BackButton";
import DeleteModal from "../../components/DeleteModal";

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

  // If enrolment does not exist or while loading
  if (!enrolment) return <Spinner className="mx-auto mt-10" />;

  // Display message if nothing has loaded after x amount of time
  // 

  return (
    <>
      <BackButton className="mt-3" />
      <div>
        <Typography variant="h2">Status: {enrolment.status}</Typography>
        <Typography variant="h5">Course: {enrolment.course.title}</Typography>
        <Typography variant="h5">
          Lecturer: {enrolment.lecturer.name}
        </Typography>
      </div>

      <div className="mt-3">
        <Link to={`/enrolments/${id}/edit`}>
          <Button>Edit</Button>
        </Link>

        <DeleteModal
            resource="enrolments"
            data={enrolment}
            title="Enrolments"
          />
      </div>
    </>
  );
};

export default Show;
