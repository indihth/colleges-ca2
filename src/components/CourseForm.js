import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../config/api";

// Import components
import {
  Card,
  Input,
  Select,
  Option,
  Textarea,
  Typography,
  Button,
} from "@material-tailwind/react";

// Image assets
import OnlineStudy from "../assets/onlineLearning.svg";
import BackButton from "./BackButton";

const CourseForm = ({ type }) => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    title: "",
    description: "",
    code: "",
    points: "",
    level: "",
  });

  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  const fieldText = ["title", "description", "code", "points", "level"];
  const levelOptions = [7, 8, 9, 10];

  useEffect(() => {
    // Only run axios if on edit page - causes slight delay in text filling fields
    if (type === "edit") {
      axios
        .get(`/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // console.log(response);
          setCourse(response.data.data); // Puts data in 'course' state
          setForm(response.data.data); // Fills form with existing data
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
    // const emailRegex = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);

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

    // Validate that points are min of 100, give error if not
    if (form.points && form.points < 100) {
      included = false;

      setErrors((prevState) => ({
        ...prevState,
        points: {
          message: `Minimum points are 100`,
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

      if (type === "edit") {
        axios
          .put(`/courses/${id}`, form, {
            // Put method with id in URL
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            navigate(-1); // Back 1 page, either Show or Index
            // navigate(`/courses/${id}`);
          })
          .catch((err) => {
            console.error(err);
            setErrors(err.response.data.errors);
          });
      } else {
        axios
          .post(`/courses`, form, {
            // Put method with id in URL
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("submitted", form);
            navigate(`/courses`);
          })
          .catch((err) => {
            console.error(err);
            setErrors(err.response.data.errors);
          });
      }
    }
  };

  const validatingMessage = (type, message = "") => {
    //  ? will display if a title exists
    return errors[type]?.message ? (
      <Typography
        variant="small"
        color="gray"
        className="mt-2 ms-2 flex items-center gap-1 font-normal text-red-600 dark:text-red-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="-mt-px h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
        {errors[type]?.message}
      </Typography>
    ) : (
      <Typography
        variant="small"
        color="gray"
        className="mt-2 ms-2 flex items-center gap-1 font-normal"
      >
        {message}
      </Typography>
    );
  };

  return (
    <div className="grid grid-cols-3">
      {/* Left - Form */}
      <section className="me-20">
        <BackButton />
        <div className="mt-6">
          <Typography variant="h2" color="blue-gray" className="mb-8">
            {type === "edit" ? "Edit Course" : "Create Course"}
          </Typography>
          <form onSubmit={submitForm} className="grid gap-10">
            <div className="flex mt-8 mb-2 gap-12">
              <div className="">
                {/* Title */}
                <div className="mb-7">
                  <Input
                    label="Title"
                    type="text"
                    onChange={handleForm}
                    // Only fills value if on edit page
                    value={type === "edit" ? form.title : null}
                    name="title"
                    size="lg"
                    variant="outlined"
                    className="w-72"
                  />
                  {validatingMessage("title", "Required field")}
                </div>
                {/* Description */}
                <div className="mb-5">
                  <Textarea
                    label="Description"
                    type="text"
                    onChange={handleForm}
                    value={type === "edit" ? form.description : null}
                    name="description"
                    size="md"
                    variant="outlined"
                  />
                  {validatingMessage("description", "Required field")}
                </div>
              </div>
              <div className="grid gap-2">
                {/* Code */}
                <div className="mb-5">
                  <Input
                    label="Code"
                    type="text"
                    onChange={handleForm}
                    value={type === "edit" ? form.code : null}
                    name="code"
                    size="lg"
                    variant="outlined"
                  />
                  {validatingMessage("code", "Required field")}
                </div>
                {/* Points */}
                <div className="mb-5">
                  <Input
                    label="Points"
                    type="number"
                    onChange={handleForm}
                    value={type === "edit" ? form.points : null}
                    name="points"
                    size="lg"
                    variant="outlined"
                  />
                  {validatingMessage("points", "Required field - Minimum 100")}
                </div>
                {/* Level */}
                <div className="mb-5">
                  <div className="relative h-10 min-w-[200px]">
                    <select
                      name="level"
                      onChange={handleForm}
                      value={type === "edit" ? form.level : null}
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    >
                      <option hidden value="">
                        Select
                      </option>
                      {levelOptions.map((level, i) => (
                        <option value={level} key={i}>
                          {level}
                        </option>
                      ))}
                    </select>
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Select a level
                    </label>
                  </div>
                  {validatingMessage("level", "Required field")}
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </section>
      {/* Right - Image */}
      <section className="col-span-2 flex justify-end ">
        <img src={OnlineStudy} className="h-3/5 my-auto" />
      </section>
    </div>
  );
};

export default CourseForm;
