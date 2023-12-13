import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../config/api";

// Import components
import { Card, Input, Textarea, Typography } from "@material-tailwind/react";

const Edit = () => {
  const { id } = useParams();
  const [lecturer, setLecturer] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    enrolments: "",
  });

  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  const fieldText = ["name", "address", "email", "phone", "enrolments"];

  useEffect(() => {
    axios
      .get(`/lecturers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setLecturer(response.data.data); // Puts data in 'lecturer' state
        setForm(response.data.data); // Fills form with existing data
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

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
    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

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

    // If email filled, check if it's a valid format
    if (!emailRegex.test(form.email) && form.email) {
      included = false;

      setErrors((prevState) => ({
        ...prevState,
        email: {
          message: `Not a valid email address`,
        },
      }));
    }
    return included;
  };


  const submitForm = (e) => {
    e.preventDefault(); // Prevents page reload on form submit

    // Only submits data is required fields are filled
    if (isRequired(fieldText)) {
      let token = localStorage.getItem("token");

      console.log("submitted", form);
      axios
        .put(`/lecturers/${id}`, form, {
          // Put method with id in URL
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate(-1);   // Back 1 page, either Show or Index
          // navigate(`/lecturers/${id}`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  if (!lecturer) return <h3>Lecturer not found</h3>;

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Edit Lecturer
      </Typography>
      <form
        onSubmit={submitForm}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Name
          </Typography>

          <Input
            type="text"
            onChange={handleForm}
            value={form.name}
            name="name"
            size="lg"
            variant="static"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          {/* ? will display if a name exists */}
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal text-red-600 dark:text-red-500"
          >
            {errors.level?.name ? errors.level?.name : ""}
          </Typography>
        </div>
        <div className="mb-3">
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Address
          </Typography>
          <Textarea
            type="text"
            onChange={handleForm}
            value={form.address}
            name="address"
            size="md"
            variant="outlined"
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
            {errors.address?.message ? errors.address?.message : ""}
          </Typography>
        </div>
        <div className="mb-3">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Email
          </Typography>
          <Input
            type="text"
            onChange={handleForm}
            value={form.email}
            name="email"
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
            {errors.email?.message ? errors.email?.message : ""}
          </Typography>
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Phone
          </Typography>
          <Input
            type="text"
            onChange={handleForm}
            value={form.phone}
            name="phone"
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
            {errors.phone?.message ? errors.phone?.message : ""}
          </Typography>
        </div>
        <Input type="submit" />
      </form>
    </Card>
  );
};

export default Edit;
