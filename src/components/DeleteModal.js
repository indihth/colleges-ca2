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
import DeleteBtn from "./DeleteBtn";

const DeleteModal = ({ resource, data, enrolments = false, title }) => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // const handleOpen = () => showModal(!open);
  // // console.log(resource)
  // // console.log(enrolments)

  return (
    <>
      <Button color="red" onClick={() => setShowModal(true)}>
        Delete
      </Button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Delete {title}?</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    {enrolments == true
                      ? "This course has enrolments. Are you sure you want to delete all enrol associated with this course?"
                      : "Deleting is permenent. Do you want to continue?"}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <Button onClick={() => setShowModal(false)}>Close</Button>
                  {/* Can't pass function declaration i.e navigate() - must pass a function*/}
                  <DeleteBtn
                    id={id}
                    resource={resource}
                    relatedResource="enrolments"
                    data={data}
                    titleText={
                      enrolments == true ? "Delete All" : `Delete ${title}`
                    }
                    deleteCallback={() => navigate("/courses")}
                    enrolements={enrolments}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default DeleteModal;
