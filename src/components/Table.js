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

const Table = ({
  data,
  tableHead,
  tableRows,
  resource,
  nestedResource = null,
  title,
}) => {
  // console.log(tableRows.field1)
  let enrolments = false;
  const resourceIsEnrolments = resource === "enrolments" ? true : false;

  return (
    <Card shadow={false} className="h-full w-full my-3 ">
      {/* Card header not displayed if nestedResource */}
      {!nestedResource ? (
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
      ) : (
        ""
      )}

      {/* Remove margin and padding above table if nestedResource */}
      <CardBody className={`px-0 ${nestedResource ? "pt-0" : ""}`}>
        <table
          className={`${
            nestedResource ? "" : "mt-4"
          } w-full min-w-full table-auto text-left`}
        >
          <thead>
            <tr>
              {tableHead.map((head) => (
                <th key={head} className="border-y bg-blue-gray-50/50 p-4">
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
              // fix for displaying enrolments From another resource
              if (!nestedResource && !resourceIsEnrolments) {
                // console.log(`resource is enrolments: ${resourceIsEnrolments}`);
                // console.log(`resource is nested: ${nestedResource}`);
                enrolments =
                  item.enrolments.length > 0
                    ? (enrolments = true)
                    : (enrolments = false);
              }

              return (
                <tr key={index}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      {/* Only nested resources need to reference field1 */}
                      <Link
                        to={
                          nestedResource
                            ? `/${resource}/${item[tableRows.field1].id}`
                            : `/${resource}/${item.id}`
                        }
                        className="flex flex-col"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {/* Only display sub field (a, b, c ) if exists in tableRows[] */}
                          {tableRows.field1a
                            ? item[tableRows.field1][tableRows.field1a]
                            : item[tableRows.field1]}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {tableRows.field2a
                            ? item[tableRows.field2][tableRows.field2a]
                            : item[tableRows.field2]}
                        </Typography>
                      </Link>
                    </div>
                  </td>
                  <td className={classes}>
                    {tableRows.field3a
                      ? item[tableRows.field3][tableRows.field3a]
                      : item[tableRows.field3]}
                  </td>
                  {/* Only display is not Enrolments */}
                  {!resourceIsEnrolments ? (
                    <td className={classes}>
                      <p className="max-w-sm line-clamp-2">
                        {tableRows.field4a
                          ? item[tableRows.field4][tableRows.field4a]
                          : item[tableRows.field4]}
                      </p>
                    </td>
                  ) : (
                    ""
                  )}
                  {/* Enrolments */}
                  <td className={classes}>
                    {!resourceIsEnrolments && !nestedResource ? (
                      <div className="flex items-center text-center w-4/5 ">
                        {/* Calculate number of enrolments for each option */}
                        <div className="w-1/3 rounded-tl-lg rounded-bl-lg py-1 text-white bg-blue-200">
                          {
                            item.enrolments.filter(
                              (obj) => obj.status === "assigned"
                            ).length
                          }
                        </div>
                        <div className="w-1/3 py-1 text-white bg-gray-400">
                          {
                            item.enrolments.filter(
                              (obj) => obj.status === "associate"
                            ).length
                          }
                        </div>
                        <div className="w-1/3 py-1 text-white bg-gray-400">
                          {
                            item.enrolments.filter(
                              (obj) => obj.status === "career_break"
                            ).length
                          }
                        </div>
                        <div className="w-1/3 rounded-tr-lg rounded-br-lg py-1 text-white bg-blue-200">
                          {
                            item.enrolments.filter(
                              (obj) => obj.status === "interested"
                            ).length
                          }
                        </div>
                      </div>
                    ) : (
                      <div className="flex">
                        <Chip value={item[tableRows.status]} variant="ghost" />
                      </div>
                    )}
                  </td>
                  {/* Edit and Delete Buttons */}
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
                        enrolments={resourceIsEnrolments ? enrolments : false}
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
      {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
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
      </CardFooter> */}
    </Card>
  );
};

export default Table;
