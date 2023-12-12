import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import DeletePopup from "./DeletePopup";
import DeleteModal from "./DeleteModal";

const TABLE_HEAD = [
  "Lecturer",
  "Address",
  "Phone",
  "Assigned | Associate | Interested",
  "Employed",
  "",
];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
  },
];

const Table = ({ data }) => {


  let enrolments = false;

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Members list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Link to="/lecturers/create">
              <Button className="flex items-center gap-3" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                lecturer
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((lecturer, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              enrolments =
                lecturer.enrolments.length > 0
                  ? (enrolments = true)
                  : (enrolments = false);

              return (
                <tr key={lecturer.name}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {lecturer.name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {lecturer.email}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {lecturer.address}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {lecturer.phone}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>{lecturer.phone}</td>
                  <td className={classes}>
                    <div className="mt-4 flex text-center w-2/3">
                      {/* Calculate number of enrolments for each option */}
                      <div className="w-1/3 rounded-tl-lg rounded-bl-lg py-1 text-white bg-blue-200">
                        {
                          lecturer.enrolments.filter(
                            (obj) => obj.status === "assigned"
                          ).length
                        }
                      </div>
                      <div className="w-1/3 py-1 text-white bg-gray-400">
                        {
                          lecturer.enrolments.filter(
                            (obj) => obj.status === "associate"
                          ).length
                        }
                      </div>
                      <div className="w-1/3 rounded-tr-lg rounded-br-lg py-1 text-white bg-blue-200">
                        {
                          lecturer.enrolments.filter(
                            (obj) => obj.status === "interested"
                          ).length
                        }
                      </div>
                    </div>
                  </td>
                  <td className={classes}></td>
                  <td className={classes}>
                    <div className="flex">
                      <Tooltip content="Edit Lecturer">
                        <Link to={`/lecturers/${lecturer.id}/edit`}>
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <DeleteModal
                        resource="lecturers"
                        data={lecturer}
                        enrolments={enrolments}
                        title="Lecturer"
                        type="icon"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Table;
