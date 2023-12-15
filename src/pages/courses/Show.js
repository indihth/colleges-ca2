import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import {
  Typography,
  Button,
  Spinner,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import DeleteModal from "../../components/DeleteModal";
import BackButton from "../../components/BackButton";
import Table from "../../components/Table";

// Image assets
import OnlineStudy from "../../assets/onlineLearning.svg";

const Show = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [enrolments, setEnrolments] = useState("");
  const [enrolmentData, setEnrolmentData] = useState([]);

  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  // Setup table with each col as own object inc. header
  // tableHead = [
  //   {
  //     "field1": 'course',
  //     "field2": '',
  //     "title": "Course"
  //   }
  // ]

  // Defining table header information
  const tableHead = ["Lecturer", "Phone", "Address", "Status ", "Actions"];

  // Assign value to each field in table. All fields are required, use empty string "" to leave blank
  // Two levels of dot notation need to access course and lecturer object, "course.name" doesn't work
  const tableRows = {
    field1: "lecturer",
    field1a: "name",
    field2: "lecturer",
    field2a: "email",
    field3: "lecturer",
    field3a: "phone",
    field4: "lecturer", // Field4 styling is suitable for longer texts
    field4a: "address", // Field4 styling is suitable for longer texts
    status: "status",
    // add field5 for conditional rendering of enrolment col?
  };

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

        // If enrolments exist, set to true and store in state
        if (response.data.data.enrolments.length > 0) {
          setEnrolments(true);
          setEnrolmentData(response.data.data.enrolments);
        } else {
          setEnrolments(false);
        }

        // setEnrolment(response.data.data.enrolments)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  // If course does not exist, show text. Or while loading
  if (!course) return <Spinner className="mx-auto mt-10" />;

  const codeIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
      </svg>
    );
  };

  const levelIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
        <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
        <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
      </svg>
    );
  };
  const pointsIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  // Code, Points, Level
  // Checking enrolments can be read
  // console.log(`Enrolments: ${course.enrolments.length}`)
  // console.log(`enrolments is: ${enrolments}, ${course.enrolments.length}`);

  return (
    <>
      <section className="bg-white pt-6">
        <div className="container mx-auto px-16">
          <BackButton className="pt-3" />
          {/* Course Info */}
          <div className="pb-20 pt-10">
            <div className="grid grid-cols-3 gap-4">
              {/* Left column - Details */}
              <div className="col-span-2 pe-28 grid gap-10">
                {/* Title and Description */}
                <div>
                  <Typography variant="h6" color="gray" className="mb-4">
                    Course
                  </Typography>
                  <Typography variant="h2" className="mb-4">
                    {course.title}
                  </Typography>
                  <Typography variant="paragraph" className="">
                    {course.description}
                  </Typography>
                </div>
                {/* Icon Details */}
                <div class="flex gap-16">
                  <div class="flex gap-2 items-center">
                    {codeIcon()}
                    <Typography variant="paragraph">{course.code}</Typography>
                  </div>
                  <div class="flex gap-2 items-center">
                    {levelIcon()}
                    <Typography variant="paragraph">
                      Level {course.level}
                    </Typography>
                  </div>
                  <div class="flex gap-2">
                    {pointsIcon()}
                    <Typography variant="paragraph">
                      {course.points} Points
                    </Typography>
                  </div>
                </div>
                {/* Edit and Delete Buttons */}
                <div className="flex items-center gap-4">
                  <Link to={`/courses/${id}/edit`}>
                    <Button variant="outlined">Edit</Button>
                  </Link>
                  {/* Passing the resource type to use in end point, 'data' to pass entire object */}
                  <DeleteModal
                    className=""
                    resource="courses"
                    data={course}
                    enrolments={enrolments}
                    title="Course"
                    color="red"
                    // variant="gradient"
                  />
                </div>
              </div>
              {/* Right column - Image */}
              <div>
                <img
                  src={OnlineStudy}
                  className=""
                  alt="Person studying at desk with laptop"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lecturer Info */}
      <section className="container mx-auto px-16">
        {/* 
    Table of lecturers with status, filter option (table component?) - Show lecturer name, phone, email */}
        <Table
          data={enrolmentData}
          tableHead={tableHead}
          tableRows={tableRows}
          resource={"lecturers"}
          nestedResource={"courses"}
          title={"Lecturer"}
        />
      </section>
    </>
  );
};

export default Show;
