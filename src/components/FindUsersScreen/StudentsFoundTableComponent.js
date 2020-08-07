import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import { green, cyan, red, indigo } from "@material-ui/core/colors";
import clsx from "clsx";
import { STATUS, STATUS_DESCRIPTION } from "../../constants";

const useStyles = makeStyles({
  tableContainer: {
    borderRadius: "6px",
    boxShadow: "0 1px 15px rgba(27,31,35,.15),0 0 1px rgba(106,115,125,.35)",
  },
  table: {
    minWidth: 650,
  },
  statusChip: {
    color: "white",
    width: "50%",
  },
  newStatus: {
    backgroundColor: cyan[500],
  },
  doneStatus: {
    backgroundColor: green[600],
  },
  rejectedStatus: {
    backgroundColor: red[500],
  },
  proposedStatus: {
    backgroundColor: indigo[500],
  },
});

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export function StudentsFoundTableComponent(props) {
  const classes = useStyles();
  return (
    <div>
      {props.studentsFound && props.studentsFound.length > 0 ? (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell align="right">Phone Number</TableCell>
                <TableCell align="right">Course Interested</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">FollowUp Remark</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.studentsFound.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.firstName.capitalize()} {row.lastName}
                  </TableCell>
                  <TableCell align="right">{row.phoneNumber}</TableCell>
                  <TableCell align="right">{row.courseInterested}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">
                    {row.followUpRemarks ? (
                      row.followUpRemarks[row.followUpRemarks.length - 1]
                    ) : (
                      <span></span>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      className={clsx(classes.statusChip, {
                        [classes.newStatus]: row.status === STATUS.NEW,
                        [classes.doneStatus]: row.status === STATUS.DONE,
                        [classes.rejectedStatus]:
                          row.status === STATUS.REJECTED,
                        [classes.proposedStatus]:
                          row.status === STATUS.PROPOSED,
                      })}
                      label={STATUS_DESCRIPTION[row.status]}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      color="primary"
                      component={Link}
                      to={{
                        pathname: "/home/add",
                        state: { studentFound: row },
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        ""
      )}
    </div>
  );
}
