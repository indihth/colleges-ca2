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
import Educator from "../assets/educator.svg";
import BackButton from "./BackButton";

const LecturerForm = ({ type }) => {
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

  let token = localStorage.getItem("token");

  const fieldText = ["name", "address", "email", "phone"];

  useEffect(() => {
    // Only run axios if on edit page - causes slight delay in text filling fields
    if (type === "edit") {
      axios
        .get(`/lecturers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // console.log(response);
          setLecturer(response.data.data); // Puts data in 'lecturer' state
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

    ////////////////////////
    // Address is max 100 characters
    if (form.address.length > 100) {
      included = false;

      setErrors((prevState) => ({
        ...prevState,
        address: {
          message: `The address may not be greater than 100 characters.`,
        },
      }));
    }
    ////////////////////////

    // If email filled, check if it's a valid format (xxx@xxx.xxx)
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
    console.log("in submit");

    // Only submits data is required fields are filled
    if (isRequired(fieldText)) {
      let token = localStorage.getItem("token");
      console.log("in submit after required checked");

      if (type === "edit") {
        axios
          .put(`/lecturers/${id}`, form, {
            // Put method with id in URL
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            navigate(-1); // Back 1 page, either Show or Index
            // navigate(`/lecturers/${id}`);
          })
          .catch((err) => {
            console.error(err);
            setErrors(err.response.data.errors);
          });
      } else {
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

  const inputValue = () => {
    if (type === "edit") {
    }
  };

  return (
    <div className="grid grid-cols-3">
      {/* Left - Form */}
      <section className="me-20">
        <BackButton />
        <div className="mt-6">
          <Typography variant="h2" color="blue-gray" className="mb-8">
            {type === "edit" ? "Edit Lecturer" : "Create Lecturer"}
          </Typography>
          <form onSubmit={submitForm} className="grid gap-10">
            <div className="flex mt-8 mb-2 gap-12">
              <div>
                {/* Title */}
                <div className="mb-5">
                  <Input
                    label="Name"
                    type="text"
                    onChange={handleForm}
                    // Only fills value if on edit page
                    value={type === "edit" ? form.name : null} // Warning on null but can't type in field with empty string
                    name="name"
                    size="lg"
                    variant="outlined"
                    className="w-72"
                  />
                  {validatingMessage("name", "Required field")}
                </div>
                {/* Address */}
                <div className="mb-5">
                  <Textarea
                    label="Address"
                    type="text"
                    onChange={handleForm}
                    value={type === "edit" ? form.address : null}
                    name="address"
                    size="md"
                    variant="outlined"
                  />
                  {validatingMessage(
                    "address",
                    "Required field - Max 100 characters"
                  )}
                </div>
              </div>
              <div>
                {/* Email */}
                <div className="mb-5">
                  <Input
                    label="Email"
                    type="text"
                    onChange={handleForm}
                    value={type === "edit" ? form.email : null}
                    name="email"
                    size="lg"
                    variant="outlined"
                  />
                  {validatingMessage("email", "Required field")}
                </div>
                {/* Phone */}
                <div className="mb-5">
                  <Input
                    label="Phone"
                    type="text"
                    onChange={handleForm}
                    value={type === "edit" ? form.phone : null}
                    name="phone"
                    size="lg"
                    variant="outlined"
                  />
                  {validatingMessage("phone", "Required field")}
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
        <img src={Educator} className="h-3/5 my-auto" />
      </section>
    </div>
  );
};

export default LecturerForm;
