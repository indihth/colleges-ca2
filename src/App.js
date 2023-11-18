import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Import Pages
import CoursesIndex from './pages/courses/Index'
import CoursesShow from './pages/courses/Show'
import CoursesCreate from './pages/courses/Create'
import CoursesEdit from './pages/courses/Edit'

// Import Components
import NavbarDefault from "./components/NavbarDefault";
import Home from "./pages/Home";


function App() {
  const [authenticated, setAuthenticated] = useState(false);

  let protectedRoutes;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthenticated(true);
    }
  }, []);

  const onAuthenticated = (auth, token) => {
    setAuthenticated(auth);

    // Only is authenticated, stores token in local storage so persists on page refresh
    if (auth) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };

   // Only show protected routes if user is authenticated
   if (authenticated) {
    protectedRoutes = (
      <>
       <Route path="/courses/create" element={<CoursesCreate  authenticated={authenticated} onAuthenticated={onAuthenticated} />} />
        <Route path="/courses/:id/edit" element={<CoursesEdit  authenticated={authenticated} onAuthenticated={onAuthenticated} />} />
        <Route path="/courses/:id" element={<CoursesShow  authenticated={authenticated} onAuthenticated={onAuthenticated} />} />
      </>
    );
  }

  return (
    <Router>
      <NavbarDefault  authenticated={authenticated} onAuthenticated={onAuthenticated} />
      <Routes>
        <Route path="/" element={<Home authenticated={authenticated} onAuthenticated={onAuthenticated} /> } />
        <Route path="/courses" element={<CoursesIndex  authenticated={authenticated} onAuthenticated={onAuthenticated} />} />

        {protectedRoutes}
      </Routes>
    </Router>
  );
}

export default App;
