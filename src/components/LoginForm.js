import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useAuth } from "../contexts/AuthContext";

const LoginForm = () => {
  const { onAuthenticated } = useAuth();

  const navigate = useNavigate();

  // const validStyles = 
  const formStyles = {
    normal: " !border-t-blue-gray-200 focus:!border-t-gray-900",
    error: " !border-t-blue-red-200 focus:!border-t-red-900"
  };

  const [form, setForm] = useState({
    email: "sam@bloggs.com",
    password: "secret",
  });

  const [errors, setErrors] = useState("");
  const fieldText = ["email", "password"];

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

  const handleClick = (e) => {
    console.log("clicked", form);
    e.preventDefault(); // Prevents page reload on form submit

    if (isRequired(fieldText)) {
      // POST allows for 2nd param
      axios
        .post("https://college-api.vercel.app/api/login", {
          email: form.email, // data from form useState
          password: form.password,
        })
        .then((response) => {
          console.log(response.data);
          onAuthenticated(true, response.data.token);
          navigate("/courses")
        })
        .catch((err) => {
          console.error(err);
          console.log(err.response.data.message);
          setErrors(err.response.data.message);
        });
    }
  };

  return (
    <>
      {/* Email: <input onChange={handleForm} type='text' name='email' value={form.email}/> <br />
        Password: <input onChange={handleForm} type='password' name='password' value={form.password}/> */}

      {/* <button onClick={handleClick}>Login</button>
      {errorMessage ? <p style={errorStyle}>{errorMessage}</p> : ""} */}

      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Welcome back! Enter your details to login.
        </Typography>
        <form 
        onSubmit={handleClick}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              onChange={handleForm}
              size="lg"
              placeholder="name@email.com"
              className={(errors.email?.message) ? formStyles.error : formStyles.normal}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="email"
              value={form.email}
            />
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className={(errors.password?.message) ? formStyles.error : formStyles.normal}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleForm}
              name="password"
              value={form.password}
              error={errors.password?.message ? true : false}
            />
          </div>

          <Button type="submit" className="mt-6" fullWidth>Sign In</Button>
        </form>
      </Card>
    </>
  );
};

export default LoginForm;
