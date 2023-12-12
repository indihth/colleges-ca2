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
import DeleteBtn from "../components/DeleteBtn";

const DeletePopup = ({
  resource,
  data,
  enrolments = false,
  title,
  type = "button",
}) => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(!open);
  // console.log(resource)
  // console.log(enrolments)

  return (
    <>
    {/* Different button styling set through props */}
      {type === "button" ? (
        // Red button
        <Button onClick={handleOpen} color="red">
          Delete (popup)
        </Button>
      ) : (
        // White button with 'trash' icon
        <Button onClick={handleOpen} variant="text" className="flex items-center">
          <div>
            {/* Heroicons - Trash with outline */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
          <p className="ms-3">Delete</p>
        </Button>
      )}

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 100, opacity: 1 },
          unmount: { scale: 1, y: 100, opacity: 1 },
          transition: { duration: 0 },
        }}
        // Default component animations were lagging in Chrom, reset to no movement (not working)
        style={{ transition: "none !important" }}
      >
        <DialogHeader>Delete {title}?</DialogHeader>
        <DialogBody>
          {enrolments == true
            ? "This course has enrolments. Are you sure you want to delete all enrol associated with this course?"
            : "Deleting is permenent. Do you want to continue?"}
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
            titleText={enrolments == true ? "Delete All" : `Delete ${title}`}
            deleteCallback={() => navigate("/courses")}
            enrolements={enrolments}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DeletePopup;
