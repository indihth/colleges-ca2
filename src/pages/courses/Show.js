import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import {
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
// import DeleteBtn from "../../components/DeleteBtn";
import DeletePopup from "../../components/DeletePopup";

const Show = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [enrolment, setEnrolment] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  useEffect(() => {
    //
    axios
      .get(`https://college-api.vercel.app/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Authorization": `Bearer ${token}`
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setCourse(response.data.data); // Puts data in 'course' state
        response.data.data.enrolments.length > 0 ? setEnrolment(true) : setEnrolment(false);
        // setEnrolment(response.data.data.enrolments)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  // If course does not exist, show text. Or while loading
  if (!course) return <h3>Course not found</h3>;

  // If no enrolment, show delete button normal
  // If enrolment, show warning that all enrolments will be deleted

  // const showDeleteAll = () => {
  //   return (
  //     <>
  //       <Button onClick={handleOpen} color="red">Delete</Button>

  //       <Dialog
  //         open={open}
  //         handler={handleOpen}
  //         // Default component animations were lagging in Chrom, reset to no movement (not working)
  //         animate={{
  //           mount: { scale: 1, y: 0 },
  //           unmount: { scale: 1, y: 0 },
  //         }}
  //       >
  //         <DialogHeader>Delete Course?</DialogHeader>
  //         <DialogBody>
  //           This course has enrolments. Are you sure you want to delete
  //           all enrol associated with this course?
  //         </DialogBody>
  //         <DialogFooter>
  //           <Button
  //             variant="text"
  //             color="blue"
  //             onClick={handleOpen}
  //             className="mr-1"
  //           >
  //             <span>Cancel</span>
  //           </Button>

  //           <DeleteBtn
  //             id={id}
  //             resource="courses"
  //             relatedResource="enrolments"
  //             data={course}
  //             titleText={"Delete All"}
  //             deleteCallback={() => navigate("/courses")}
  //           />
  //         </DialogFooter> 
  //       </Dialog>
  //     </>
  //   );
  // };

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <div>
        <Typography variant="h2">{course.title}</Typography>
        <Typography variant="paragraph">{course.description}</Typography>
        <Typography variant="h5">Code: {course.code}</Typography>
        <Typography variant="h5">Points: {course.points}</Typography>
        <Typography variant="h5">Level: {course.level}</Typography>
      </div>

      <div className="mt-3">
        <Link to={`/courses/${id}/edit`}>
          <Button>Edit</Button>
        </Link>

      <DeletePopup  />

        {/* {showDeleteAll()} */}
        {/* Can't pass function declaration i.e navigate() - must pass a function
          If enrolments, show */}
        {/* {enrolment == true ? (
          showDeleteAll()
        ) : (
          <DeleteBtn
            id={id}
            resource="courses"
            relatedResource="enrolments"
            data={course}
            titleText="test"
            deleteCallback={() => navigate("/courses")}
          />
        )} */}
      </div>
    </>
  );
};

export default Show;
