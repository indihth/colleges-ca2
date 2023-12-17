import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../config/api";

// Import components
import { Card, Input, Typography } from "@material-tailwind/react";
import EnrolmentForm from "../../components/EnrolmentForm";

const Create = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    course_id: "",
    lecturer_id: "",
    date: "",
    time: "",
    status: "",
  });

  const [enrolment, setEnrolment] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  const fieldText = ["course_id", "lecturer_id", "status", "date", "time"];

  // Storing status options in object for easier use in select option mapping
  const statusOptions = [
    {
      label: "Interested",
      value: "interested",
    },
    {
      label: "Assigned",
      value: "assigned",
    },
    {
      label: "Associate",
      value: "associate",
    },
    {
      label: "Career Break",
      value: "career_break",
    },
  ];

  // Using seperate useEffect that has dependancy on id to get enrolment data
  useEffect(() => {
    axios
      .get(`/enrolments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setEnrolment(response.data.data); // Puts data in 'enrolment' state
        setForm(response.data.data); // Fills form with existing data
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);


  useEffect(() => {
    // Get all Courses
    axios
      .get("https://college-api.vercel.app/api/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCourses(response.data.data); // Puts data in 'courses' state
        // console.log(courses)
      })
      .catch((err) => {
        console.error(err);
      });

      // Get all Lecturers
    axios
    .get("https://college-api.vercel.app/api/lecturers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setLecturers(response.data.data); // Puts data in 'lecturers' state
      // console.log(lecturers)
    })
    .catch((err) => {
      console.error(err);
    });
  }, []);

  // Handles multiple form fields
  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      // Uses name="" and value="" from form to setForm []: ""
      [e.target.name]: e.target.value,
    }));
  };

  const isRequired = (fields) => {
    let included = true;
    setErrors({});

    fields.forEach((field) => {
      // Square notation changes to value of
      if (!form[field]) {
        // console.log(`${field} is required`)

        included = false;
        // Remember the previous state
        setErrors((prevState) => ({
          ...prevState,
          [field]: {
            message: `${field} is required`,
          },
        }));
      }
    });

    return included;
  };

  const submitForm = (e) => {
    e.preventDefault(); // Prevents page reload on form submit

    // Only submits data is required fields are filled
    if (isRequired(fieldText)) {
      let token = localStorage.getItem("token");

      console.log("submitted", form);
      axios
        .put(`/enrolments/${id}`, form, {
          // Put method with id in URL
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate(-1);   // Back 1 page to either Show or Index
          // navigate(`/enrolments/${id}`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
      <EnrolmentForm type={"edit"} />
  );
};

export default Create;
