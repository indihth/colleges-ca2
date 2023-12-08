import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../config/api";

// Import components
import {
  Card,
  Input,
  Textarea,
  Typography
} from "@material-tailwind/react";

const Create = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState({});
 
  const [form, setForm] = useState({
    title: "",
    description: "",
    code: "",
    points: "",
    level: "",
  });
  
  const navigate = useNavigate();

  const fieldText = ["title", "description", "code", "points", "level"];
  const levelOptions = [7, 8, 9, 10];


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
        .post(`/courses`, form, {
          // Put method with id in URL
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate(`/courses`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Create Course
      </Typography>
      <form
        onSubmit={submitForm}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-5">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Title
          </Typography>

          <Input
            type="text"
            onChange={handleForm}
            // value={form.title}
            name="title"
            size="lg"
            variant="static"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          {/* ? will display if a title exists */}
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal text-red-600 dark:text-red-500"
          >
            {errors.title?.message ? errors.title?.message  : ""}
          </Typography>
        </div>
        <div className="mb-5">
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Description
          </Typography>
          <Textarea
            type="text"
            onChange={handleForm}
            // value={form.description}
            name="description"
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
            {errors.description?.message ? errors.description?.message  : ""}

          </Typography>
        </div>
        <div className="mb-5">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Code
          </Typography>
          <Input
            type="text"
            onChange={handleForm}
            // value={form.code}
            name="code"
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
            {errors.code?.message ? errors.code?.message  : ""}
          </Typography>
        </div>
        <div className="mb-5">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Points
          </Typography>
          <Input
            type="number"
            onChange={handleForm}
            // value={form.points}
            name="points"
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
            {errors.points?.message ? errors.points?.message  : ""}

          </Typography>
        </div>
        <div className="mb-5">
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Level
          </Typography>

          <select name="level" onChange={handleForm}>
            
            {levelOptions.map((level, i) => (
              <option value={level} key={i}> 
              {level}              
              </option>
            ))
            }
          </select>
          {/* <Select
            variant="static"
            onChange={handleForm}
            name="level"
            value={form.level}
          >
            <Option value="7">7</Option>
            <Option value="8">8</Option>
            <Option value="9">9</Option>
            <Option value="10">10</Option>
          </Select> */}
          {/* <Input
            type="text"
            onChange={handleForm}
            value={form.level}
            name="level"
            size="lg"
            variant="static"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          /> */}
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal text-red-600 dark:text-red-500"
          >
            {errors.level?.message ? errors.level?.message  : ""}
          </Typography>
        </div>
        <Input type="submit" />
      </form>
    </Card>
  );
};

export default Create;
