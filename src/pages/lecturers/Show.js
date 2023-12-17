import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEYS } from "../../config/ApiKeys";

// Components
import {
  Typography,
  Button,
  Spinner,
  Avatar
} from "@material-tailwind/react";
import DeleteModal from "../../components/DeleteModal";
import BackButton from "../../components/BackButton";
import Table from "../../components/Table";

// Image assets
import Educator from "../../assets/educator.svg";

const Show = () => {
  const { id } = useParams();
  const [lecturer, setLecture] = useState(null);
  const [enrolments, setEnrolments] = useState("");
  const [enrolmentData, setEnrolmentData] = useState([]);
  const [gender, setGender] = useState("pixel");
  const [imageURL, setImageURL] = useState("");

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
    // imageAPICall()

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

          // Need to move to genderAPICall()
          // useEffect forces new image on each page change, otherwise page reload needed
          // https://xsgames.co/randomusers/
          // setImageURL("https://xsgames.co/randomusers/avatar.php?g=male");
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

        if (response.data.result_found) {
          // setImageURL(`https://xsgames.co/randomusers/avatar.php?g=${response.data.gender}`)
          setGender(response.data.gender);
        } else {
          // setImageURL(`https://xsgames.co/randomusers/avatar.php?g=pixel`)
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // console.log(gender)
  // console.log(imageURL)

  const makeImageURL = () => {
    // Capping
    let randNum = Math.floor(Math.random() * 50) + 1;

    return `https://xsgames.co/randomusers/assets/avatars/${gender}/${randNum}.jpg`;

    // Using setImage causes 'too many rerenders' but using this function makes it run twice
    // setImageURL(`https://xsgames.co/randomusers/assets/avatars/${gender}/${randNum}.jpg`)
  };

  // console.log(makeImageURL())

  const locationIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    );
  };
  const emailIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    );
  };

  const phoneIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        />
      </svg>
    );
  };

  const profileImage = () => {
    // let randNum = Math.floor(Math.random() * 78) + 1;
    // setImageURL(`https://xsgames.co/randomusers/assets/avatars/${gender}/${randNum}.jpg`)

    // Conditional render spinner until image loads
    return !gender ? (
      // Temp disable until API key renewed
      // <Spinner />
      <Avatar
        size="xxl"
        variant="circular"
        withBorder={true}
        color="gray"
        className="p-0.5"
        src={`https://xsgames.co/randomusers/avatar.php?g=${gender}`} // Update with gender api result
        alt={`${lecturer.name} profile image`}
      />
    ) : (
      // <img src={imageURL}/>
      <Avatar
        size="xxl"
        variant="circular"
        withBorder={true}
        color="gray"
        className="p-0.5"
        src={makeImageURL()} // Update with gender api result
        // src={`https://xsgames.co/randomusers/avatar.php?g=${gender}`} // Update with gender api result
        alt={`${lecturer.name} profile image`}
      />
    );
  };

  // If lecturer does not exist, show text. Or while loading
  if (!lecturer) return <Spinner className="mx-auto mt-10" />;

  // console.log(`enrolments is: ${enrolments}, ${lecturer.enrolments.length}`);

  return (
    <>
      <section className="bg-white pt-6">
        <div className="container mx-auto px-16">
          {/* Testing GenderAPI - only 100 free requests available per account. Testing in useEffect causes too many requests*/}
          <BackButton className="mt-3" />
          <div className="pb-20 pt-10">
            <div className="grid grid-cols-3 gap-4 items-center">
              {/* Left column - Details */}
              <div className="col-span-2 pe-28 grid gap-6">
                <div className="flex gap-4">
                  {profileImage()}
                  {/* <img src={imageURL}/> */}
                  <div className="grid content-center">
                    <Typography variant="h3" color="blue-gray">
                      {lecturer.name}
                    </Typography>
                    <Typography variant="paragraph" color="gray">
                      {enrolments
                        ? lecturer.enrolments[0].course.title + " /"
                        : "Lecturer"}
                      {/* {lecturer.enrolments[0].course.title} */}
                    </Typography>
                  </div>
                </div>
                <div className="flex grid gap-4">
                  <Typography>
                    Experienced IT lecturer with a passion for inspiring
                    students through engaging lectures, hands-on projects, and
                    real-world examples. Expertise in networking, cybersecurity,
                    and programming. Committed to fostering a dynamic learning
                    environment and preparing students for successful careers in
                    the ever-evolving field of technology.
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue"
                    className="flex gap-2.5 text-gray-700 items-center"
                  >
                    {locationIcon()} {lecturer.address}
                  </Typography>
                  <Typography
                    variant="small"
                    className="flex gap-2.5 text-gray-700 items-center"
                  >
                    {phoneIcon()} {lecturer.phone}
                  </Typography>
                  <Typography
                    variant="small"
                    className="flex gap-2.5 text-gray-700 items-center"
                  >
                    {emailIcon()} {lecturer.email}
                  </Typography>

                  <div className="mt-3 flex items-center gap-4">
                    <Link to={`/lecturers/${id}/edit`}>
                      <Button variant="outlined">Edit</Button>
                    </Link>
                    {/* Passing the resource type to use in end point, 'data' to pass entire object */}
                    <DeleteModal
                      resource="lecturers"
                      data={lecturer}
                      enrolments={enrolments}
                      title="Lecturer"
                      color="red"
                    />

                    {/* For testing only */}
                    <Button
                      onClick={() => {
                        genderAPICall(lecturer.name);
                      }}
                    >
                      Gender API Call
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src={Educator}
                  alt="Lecturer standing in front of whiteboard"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses information */}
      <section className="container mx-auto px-16">
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
      </section>
    </>
  );
};

export default Show;
