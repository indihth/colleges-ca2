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

const DeletePopup = ({ resource, data }) => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(!open);
  console.log(resource)

  if (resource === "enrolments") {}
  // const relatedResource = 

  return (
    <>
      <Button onClick={handleOpen} color="red">
        Delete (popup)
      </Button>

      <Dialog
        open={open}
        handler={handleOpen}
        // Default component animations were lagging in Chrom, reset to no movement (not working)
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 1, y: 0 },
        }}
      >
        <DialogHeader>Delete Course?</DialogHeader>
        <DialogBody>
          This course has enrolments. Are you sure you want to delete all enrol
          associated with this course?
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
            titleText={"Delete All"}
            deleteCallback={() => navigate("/courses")}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DeletePopup;
