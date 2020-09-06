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
import TablePaginationActions from "../Common/TablePaginationActions";
import Tooltip from "@material-ui/core/Tooltip";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0 1px 15px rgba(27,31,35,.15),0 0 1px rgba(106,115,125,.35)",
  },
  tableContainer: {
    borderRadius: "6px",
    maxHeight: "670px",
  },
  table: {
    minWidth: 650,
  },
  statusChip: {
    color: "white",
    width: "50%",
    minWidth: "100px",
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
}));

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export function StudentsFoundTableComponent(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = props.studentsFound;
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.studentsFound.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      {props.studentsFound && props.studentsFound.length > 0 ? (
        <Paper className={classes.root}>
          <TableContainer className={classes.tableContainer}>
            <Table
              stickyHeader
              className={classes.table}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">Student Id</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell align="left">Phone Number</TableCell>
                  <TableCell align="left">Course Interested</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell align="left">{`# ${row.studentId}`}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.firstName.capitalize()} {row.lastName}
                    </TableCell>
                    <TableCell align="left">{row.phoneNumber}</TableCell>
                    <TableCell align="left">{row.courseInterested}</TableCell>
                    <TableCell align="center">
                      <Tooltip title={STATUS_DESCRIPTION[row.status]} arrow>
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
                      </Tooltip>
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
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={7} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            count={props.studentsFound.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { "aria-label": "rows per page" },
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </Paper>
      ) : (
        ""
      )}
    </div>
  );
}
