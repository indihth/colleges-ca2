import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../config/api";

// Import components
import { Card, Input, Textarea, Typography } from "@material-tailwind/react";

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
        .post(`/enrolments`, form, {
          // Put method with id in URL
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate(`/enrolments`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Create Enrolment
      </Typography>
      <form
        onSubmit={submitForm}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Course
          </Typography>

          <select name="course_id" onChange={handleForm}>
            {courses.map((course, i) => (
              <option value={course.id} key={i}>{course.title}</option>
            ))}
          </select>

          {/* ? will display if a name exists */}
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal text-red-600 dark:text-red-500"
          >
            {errors.name?.message}
          </Typography>
        </div>
        <div className="mb-3">
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Lecturer
          </Typography>

          <select name="lecturer_id" onChange={handleForm}>
            {lecturers.map((lecturer, i) => (
              <option value={lecturer.id} key={i}>{lecturer.name}</option>
            ))}
          </select>
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal text-red-600 dark:text-red-500"
          >
            {errors.address?.message}
          </Typography>
        </div>
        <div className="mb-3">
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Status
          </Typography>

          <select name="status" onChange={handleForm}>
            {statusOptions.map((option, i) => (
              <option value={option.value} key={i}>
                {option.label}
              </option>
            ))}
          </select>
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal text-red-600 dark:text-red-500"
          >
            {errors.email?.message}
          </Typography>
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Date
          </Typography>
          <Input
            type="date"
            onChange={handleForm}
            // value={form.phone}
            name="date"
            size="lg"
            variant="static"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal text-red-600 dark:text-red-500"
          >
            {errors.date?.message}
          </Typography>
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Time
          </Typography>

          <Input
            type="time"
            onChange={handleForm}
            // value={form.phone}
            name="time"
            size="lg"
            variant="static"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal text-red-600 dark:text-red-500"
          >
            {errors.time?.message}
          </Typography>
        </div>
        <Input type="submit" />
      </form>
    </Card>
  );
};

export default Create;
