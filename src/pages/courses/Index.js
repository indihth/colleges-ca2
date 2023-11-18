import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Index = ({authenticated}) => {

  const [courses, setCourses] = useState([]);

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios.get('https://colleges-api.vercel.app/api/courses', {
      headers: {
        "Authorization": `Bearer ${token}`
        // "Authorization": `Bearer ${token}`
      }
    })
        .then(response => {
            console.log(response)
            setCourses(response.data)     // Puts data in 'course' state
        })
        .catch(err => {
            console.error(err)
        })
}, [])

if(courses.length === 0) return <h3>There are no courses</h3>

const courseList = courses.map(course => {
    return (
        <div key={course._id}>
            {(authenticated) ?
            <p><b>Title: </b> <Link to={`/courses/${course._id}`}>{course.title}</Link></p>
            : <p><b>Title: </b> {course.title}</p>
            }
            {/* <p><b>Title: </b> <Link to={`/courses/${course._id}`}>{course.title}</Link></p> */}
            <p><b>Description: </b> {course.description}</p>
        </div>
    )
})


  return (
    <>
    <div>Courses Index</div>
    {courseList}
    </>
  )
}

export default Index