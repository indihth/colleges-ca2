import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import { Typography, Button } from "@material-tailwind/react";
import DeletePopup from "../../components/DeletePopup";

const Show = () => {
  const { id } = useParams();
  const [lecturer, setLecture] = useState(null);
  const [enrolments, setEnrolments] = useState("");

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/lecturers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Authorization": `Bearer ${token}`
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setLecture(response.data.data); // Puts data in 'lecturer' state
        response.data.data.enrolments.length > 0
          ? setEnrolments(true)
          : setEnrolments(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  // If lecturer does not exist, show text. Or while loading
  if (!lecturer) return <h3>Lecturer not found</h3>;

  console.log(`enrolments is: ${enrolments}, ${lecturer.enrolments.length}`);

  return (
    <>
      <div>
        <Typography variant="h2">{lecturer.name}</Typography>
        <Typography variant="h5">Address: {lecturer.address}</Typography>
        <Typography variant="h5">Email: {lecturer.email}</Typography>
        <Typography variant="h5">Phone: {lecturer.phone}</Typography>
      </div>

      <div className="mt-3">
        <Link to={`/lecturers/${id}/edit`}>
          <Button>Edit</Button>
        </Link>

        {/* Passing the resource type to use in end point, 'data' to pass entire object */}
        <DeletePopup resource="lecturers" data={lecturer} enrolments={enrolments} title="Lecturer" />
      </div>
    </>
  );
};

export default Show;
