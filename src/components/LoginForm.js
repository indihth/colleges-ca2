import axios from 'axios'
import { useState } from 'react'
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const LoginForm = ({ authenticated, onAuthenticated}) => {

  const errorStyle = {
    color: 'red'
  }

  const [form, setForm] = useState({
    email: "susan@email.com",
    password: "password123"
  })

  const [errorMessage, setErrorMessage] = useState("")

    const handleClick = () => {
        console.log("clicked", form)

        // POST allows for 2nd param
        axios.post('https://college-api.vercel.app/api/login', {
          email: form.email,        // data from form useState
          password: form.password
        })
        .then(response => {
          console.log(response.data)
          onAuthenticated(true, response.data.token)
        })
        .catch(err => {
          console.error(err)
          console.log(err.response.data.message)
          setErrorMessage(err.response.data.message)
        })

    }

    // Handles multiple form fields
    const handleForm = (e) => {
      setForm(prevState => ({ 
        ...prevState,
        // Uses name="" and value="" from form to setForm []: ""
        [e.target.name]: e.target.value
      }))
    }
  return (
    <>
        {/* Email: <input onChange={handleForm} type='text' name='email' value={form.email}/> <br />
        Password: <input onChange={handleForm} type='password' name='password' value={form.password}/> */}

        <button onClick={handleClick}>Login</button>
        {errorMessage ? <p style={errorStyle}>{errorMessage}</p> : ""} 

        <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Welcome back! Enter your details to login.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name='email' value={form.email}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleForm} 
              name='password' 
              value={form.password}
            />
          </div>
         
          <Button onClick={handleClick} className="mt-6" fullWidth>
            sign in
          </Button>
         
        </form>
      </Card>
    </>
  )
}

export default LoginForm