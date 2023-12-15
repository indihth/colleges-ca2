import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../config/api";

// Import components
import { Card, Input, Textarea, Typography } from "@material-tailwind/react";

const Create = () => {
  const { id } = useParams();
  const [lecturer, setLecturer] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    // enrolments: "",
  });

  const navigate = useNavigate();

  const fieldText = ["name", "address", "email", "phone"];
  // const fieldText = ["name", "address", "email", "phone", "enrolments"];

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

      // Check if all field are filled
      if (!form[field]) {   // Square notation changes to value of
        included = false;
        // Remember the previous state
        setErrors((prevState) => ({
          ...prevState,
          [field]: `${field} is required`
          // [field]: {
          //   message: `${field} is required`,
          // },
        }));
      }
    });

    ////////////////////////
    // Address is max 100 characters
    if (form.address.length > 100 ) {
      included = false;

      setErrors((prevState) => ({
        ...prevState,
        address: `The address may not be greater than 100 characters.`
      }));
    }
    ////////////////////////

    // If email filled, check if it's a valid format (xxx@xxx.xxx)
    if (!emailRegex.test(form.email) && form.email) {
      included = false;

      setErrors((prevState) => ({
        ...prevState,
        email: `Not a valid email address`
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
        .post(`/lecturers`, form, {
          // Put method with id in URL
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate(`/lecturers`);
        })
        .catch((err) => {
          console.error(err);
          setErrors(err.response.data.errors)
        });
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Create Lecturer
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
            // value={form.name}
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
            {errors.level ? errors.level : ""}
          </Typography>
        </div>
        <div className="mb-3">
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Address
          </Typography>
          <Textarea
            type="text"
            onChange={handleForm}
            // value={form.address}
            placeholder="Max 100 characters"
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
            {errors.address ? errors.address : ""}
          </Typography>
        </div>
        <div className="mb-3">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Email
          </Typography>
          <Input
            type="text"
            onChange={handleForm}
            // value={form.email}
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
            {errors.email ? errors.email : ""}
          </Typography>
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Phone
          </Typography>
          <Input
            type="text"
            onChange={handleForm}
            // value={form.phone}
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
            {errors.phone ? errors.phone : ""}
          </Typography>
        </div>
        <Input type="submit" />
      </form>
    </Card>
  );
};

export default Create;
