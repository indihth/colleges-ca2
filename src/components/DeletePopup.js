import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Components
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import DeleteBtn from '../components/DeleteBtn';

const DeletePopup = ({ resource, data, enrolments = false, title }) => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(!open);
  // console.log(resource)
  // console.log(enrolments)  

  return (
    <>
      <Button onClick={handleOpen} color="red">
        Delete (popup)
      </Button>

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 100, opacity: 1},
          unmount: { scale: 1, y: 100, opacity: 1 },
          transition: {duration: 0} 
        }}
        // Default component animations were lagging in Chrom, reset to no movement (not working)
        style={{ transition: "none !important" }}
      >
        <DialogHeader>Delete {title}?</DialogHeader>
        <DialogBody>
       { (enrolments == true) ? ( "This course has enrolments. Are you sure you want to delete all enrol associated with this course?") : ("Deleting is permenent. Do you want to continue?")}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>

        {/* Can't pass function declaration i.e navigate() - must pass a function*/}
          <DeleteBtn
            id={id}
            resource={resource}
            relatedResource="enrolments"
            data={data}
            titleText= { (enrolments == true) ? ( "Delete All") : (`Delete ${title}`)}
            deleteCallback={() => navigate("/courses")}
            enrolements={enrolments}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DeletePopup;
