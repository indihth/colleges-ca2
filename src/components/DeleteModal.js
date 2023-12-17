import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

// Components
import {
  Button,
  Tooltip
} from "@material-tailwind/react";
import DeleteBtn from "./DeleteBtn";

const DeleteModal = ({
  resource,
  data,
  enrolments = false,
  title,
  type = "button",
  variant = "outlined",
  className = "",
  color = "black"
}) => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Don't check enrolments if already false
  // Need to refactor, enrolment status is already being passed but can't use straight in return()
  // console.log(enrolments);
  if (enrolments) {
    enrolments =
      data.enrolments.length > 0 ? (enrolments = true) : (enrolments = false);
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={className} >
      {/* Different button styling set through props */}
      {type === "button" ? (
        // Red button
        <Button onClick={toggleModal} variant={variant} color={color}>
          Delete {title}
        </Button>
      ) : (
        // White button with 'trash' icon
        <Tooltip content={`Delete ${title}`}>
        
        <Button
          onClick={toggleModal}
          variant="text"
          color={color}
          className="flex items-center"
        >
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
        </Tooltip>

      )}
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
                    onClick={toggleModal}
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
                  {enrolments == true ? (
                    <p>enrolements: {data.enrolments.length}</p>
                  ) : (
                    ""
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <Button onClick={toggleModal}>Close</Button>
                  {/* Can't pass function declaration i.e navigate() - must pass a function*/}
                  <DeleteBtn
                    id={data.id}
                    resource={resource}
                    relatedResource="enrolments"
                    data={data}
                    titleText={
                      enrolments == true ? "Delete All" : `Delete ${title}`
                    }
                    deleteCallback={() => navigate("/courses")}
                    enrolements={enrolments}
                    toggleModal={toggleModal}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default DeleteModal;
