import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import { Typography, Button, Spinner } from "@material-tailwind/react";
import BackButton from "../../components/BackButton";
import DeleteModal from "../../components/DeleteModal";

// Image assets
import OnlineStudy from "../../assets/onlineLearning.svg";
import EnrolmentImage from "../../assets/enrolments.svg"
import CodeIcon from "../../components/CodeIcon";

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

  // Better to make icons own components
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

  return (
    <>
      <section className="bg-white pt-6">
        <div className="container mx-auto px-16">
          <BackButton className="pt-3" />
          {/* Course Info */}
          <div className="pb-20 pt-10">
            <div className="grid grid-cols-2 gap-16">
              {/* Left column - Course */}
              <div className="grid  gap-6">
                {/* Title and Description */}
                <div>
                  <Typography variant="h6" color="gray" className="mb-2">
                    Course
                  </Typography>
                  <Typography variant="h4" color="blue-gray" className="mb-6">
                    {enrolment.course.title}
                  </Typography>
                  <Typography variant="small">
                    {enrolment.course.description}
                  </Typography>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex gap-2 items-center">
                      {/* All icons should be own components */}
                      <CodeIcon />
                      <Typography variant="paragraph">
                        {enrolment.course.code}
                      </Typography>
                    </div>
                    <div className="flex gap-2 items-center">
                      {levelIcon()}
                      <Typography variant="paragraph">
                        Level {enrolment.course.level}
                      </Typography>
                    </div>
                    <div className="flex gap-2">
                      {pointsIcon()}
                      <Typography variant="paragraph">
                        {enrolment.course.points} Points
                      </Typography>
                    </div>
                  </div>
                </div>

                <hr />
                {/* Middle column - Lecturer */}
                <div>
                  <Typography variant="h6" color="gray" className="mb-2">
                    Lecturer
                  </Typography>
                  <Typography variant="h4" color="blue-gray" className="mb-6">
                    {enrolment.lecturer.name}
                  </Typography>
                  <Typography variant="small">
                    Experienced IT lecturer with a passion for inspiring
                    students through engaging lectures, hands-on projects, and
                    real-world examples. Expertise in networking, cybersecurity,
                    and programming. Committed to fostering a dynamic learning
                    environment and preparing students for successful careers in
                    the ever-evolving field of technology.
                  </Typography>
                </div>
                <div className="flex flex-col gap-4">
                  <Typography
                    variant="small"
                    color="blue"
                    className="flex gap-2.5 text-gray-700 items-center"
                  >
                    {locationIcon()} {enrolment.lecturer.address}
                  </Typography>
                  <Typography
                    variant="small"
                    className="flex gap-2.5 text-gray-700 items-center"
                  >
                    {phoneIcon()} {enrolment.lecturer.phone}
                  </Typography>
                  <Typography
                    variant="small"
                    className="flex gap-2.5 text-gray-700 items-center"
                  >
                    {emailIcon()} {enrolment.lecturer.email}
                  </Typography>
                </div>
              </div>
              {/* Right column - Image */}
              <div>
                <div className="flex items-center justify-end gap-4 mb-24">
                  <Link to={`/enrolments/${id}/edit`}>
                    <Button variant="outlined">Edit</Button>
                  </Link>
                  {/* Passing the resource type to use in end point, 'data' to pass entire object */}
                  <DeleteModal
                    className=""
                    resource="enrolments"
                    data={enrolment}
                    title="Enrolment"
                    color="red"
                    // variant="gradient"
                  />
                </div>
                <img
                  src={EnrolmentImage}
                  alt="Person studying at desk with laptop"
                />
              </div>
            </div>
            {/* Edit and Delete Buttons */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Show;
