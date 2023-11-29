import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from './contexts/AuthContext'


// Import Pages
import CoursesIndex from './pages/courses/Index'
import CoursesShow from './pages/courses/Show'
import CoursesCreate from './pages/courses/Create'
import CoursesEdit from './pages/courses/Edit'

import LecturersIndex from './pages/lecturers/Index'
import LecturersShow from './pages/lecturers/Show'
import LecturersCreate from './pages/lecturers/Create'
import LecturersEdit from './pages/lecturers/Edit'

// Import Components
import NavbarDefault from "./components/NavbarDefault";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";


function App() {
  const { authenticated, onAuthenticated} = useAuth();

  let protectedRoutes;

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     setAuthenticated(true);
  //   }
  // }, []);

  // const onAuthenticated = (auth, token) => {
  //   setAuthenticated(auth);

  //   // Only is authenticated, stores token in local storage so persists on page refresh
  //   if (auth) {
  //     localStorage.setItem("token", token);
  //   } else {
  //     localStorage.removeItem("token");
  //   }
  // };

   // Only show protected routes if user is authenticated
   if (authenticated) {
    protectedRoutes = (
      <>
       <Route path="/courses/create" element={<CoursesCreate />} />
        <Route path="/courses/:id/edit" element={<CoursesEdit />} />
        <Route path="/courses/:id" element={<CoursesShow />} />

       <Route path="/lecturers/create" element={<LecturersCreate />} />
        <Route path="/lecturers/:id/edit" element={<LecturersEdit />} />
        <Route path="/lecturers/:id" element={<LecturersShow />} />
      </>
    );
  }

  return (
    <Router>
      <NavbarDefault />
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/courses" element={<CoursesIndex />} />
        <Route path="/lecturers" element={<LecturersIndex />} />
        {protectedRoutes}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
