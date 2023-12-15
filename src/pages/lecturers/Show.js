import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEYS } from "../../config/ApiKeys";

// Components
import { Typography, Button, Spinner, Avatar } from "@material-tailwind/react";
import DeleteModal from "../../components/DeleteModal";
import BackButton from "../../components/BackButton";
import Table from "../../components/Table";

const Show = () => {
  const { id } = useParams();
  const [lecturer, setLecture] = useState(null);
  const [enrolments, setEnrolments] = useState("");
  const [enrolmentData, setEnrolmentData] = useState([]);
  const [gender, setGender] = useState(null);

  // console.log(API_KEYS.gender)

  let token = localStorage.getItem("token");

  // Defining table header information - remove actions for nested tables?
  const tableHead = ["Course", "Level", "Description", "Status", "Actions"];

  // Assign value to each field in table. All fields are required, use empty string "" to leave blank
  // Two levels of dot notation need to access course and lecturer object, "course.name" doesn't work
  const tableRows = {
    field1: "course",
    field1a: "title",
    field2: "course",
    field2a: "code",
    field3: "course",
    field3a: "level",
    field4: "course", // Field4 styling is suitable for longer texts
    field4a: "description", // Field4 styling is suitable for longer texts
    status: "status",
    // add field5 for conditional rendering of enrolment col?
  };

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
        // genderAPICall(response.data.data.name);
        // If enrolments exist, set to true and store in state
        if (response.data.data.enrolments.length > 0) {
          setEnrolments(true);
          setEnrolmentData(response.data.data.enrolments);
        } else {
          setEnrolments(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const genderAPICall = (name) => {
    axios
      .post(
        `https://gender-api.com/v2/gender/by-full-name`,
        {
          full_name: name,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEYS.gender}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        response.data.result_found
          ? setGender(response.data)
          : setGender("pixel");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // If lecturer does not exist, show text. Or while loading
  if (!lecturer) return <Spinner className="mx-auto mt-10" />;

  // console.log(`enrolments is: ${enrolments}, ${lecturer.enrolments.length}`);

  return (
    <>
      <BackButton className="mt-3" />
      <div>
        {/* https://xsgames.co/randomusers/
        {
          gender ? <img src={`https://xsgames.co/randomusers/avatar.php?g=${gender?.gender}`} /> : <Spinner/>
        } 
        <Typography variant="h2">{lecturer.name}</Typography>
        {
          gender ?  <Typography variant="h2">{gender.gender} Duration: {gender.details.duration}</Typography> : <Spinner/>
        }  */}
        <img src={`https://xsgames.co/randomusers/avatar.php?g=female`} />
        <Typography variant="h5">Name: {lecturer.name}</Typography>
        <Typography variant="h5">Address: {lecturer.address}</Typography>
        <Typography variant="h5">Email: {lecturer.email}</Typography>
        <Typography variant="h5">Phone: {lecturer.phone}</Typography>
      </div>

      <div className="mt-3">
        <Link to={`/lecturers/${id}/edit`}>
          <Button>Edit</Button>
        </Link>

        {/* Passing the resource type to use in end point, 'data' to pass entire object */}
        <DeleteModal
          resource="lecturers"
          data={lecturer}
          enrolments={enrolments}
          title="Lecturer"
        />
      </div>

      {enrolments ? (
        <Table
          data={enrolmentData}
          tableHead={tableHead}
          tableRows={tableRows}
          resource={"courses"}
          nestedResource={"lecturers"}
          title={"Course"}
        />
      ) : (
        <Typography variant="h5">No enrolments yet</Typography>
      )}
    </>
  );
};

export default Show;
