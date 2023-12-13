import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Chip,
} from "@material-tailwind/react";
import DeleteModal from "./DeleteModal";

const TableEnrolments = ({ data, tableHead, tableRows, resource, title }) => {
  // console.log(tableRows.field1)
  let enrolments = false;
  const resourceIsEnrolments = resource === "enrolments" ? true : false;

  // console.log(data);


  return (
    <Card shadow={false} className="h-full w-full mt-3">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              {title} list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all {resource}
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to={`/${resource}/create`}>
              <Button className="flex items-center gap-3" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                <p>Add {title}</p>
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
    <CardBody className="px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr key={"tableHead"}>
              {tableHead.map((head) => (
                <th
                  key={head}
                  className="border-y bg-blue-gray-50/50 p-4"
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
            {data.map((item, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              if (!resourceIsEnrolments) {
                enrolments =
                  item.enrolments.length > 0
                    ? (enrolments = true)
                    : (enrolments = false);
              }
              // console.log(item[tableRows.field1][tableRows.field1a])
              return (
                <tr key={index}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Link to={`/${resource}/${item.id}`} className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item[tableRows.field1][tableRows.field1a]}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {item[tableRows.field2][tableRows.field2a]}
                        </Typography>
                      </Link>
                    </div>
                  </td>
                  <td className={classes}>{item[tableRows.field3][tableRows.field3a]}</td>
                  <td className={classes}>
                      <div className="flex justify-center">
                        <Chip value={item[tableRows.field4]} variant="ghost" />
                      </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center">
                      <Tooltip content={`Edit ${title}`} className="">
                        <Link to={`/${resource}/${item.id}/edit`}>
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Link>    
                      </Tooltip>
                      <DeleteModal
                        resource={resource}
                        data={item}
                        title={title}
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

export default TableEnrolments;
