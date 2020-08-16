import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { OPERATION_FLAG_DESC } from "../../constants";
import TablePaginationActions from "../Common/TablePaginationActions";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles({
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
});

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const getDateAndTime = (lastUpdateTime) => {
  let updateDateTime = new Date(lastUpdateTime);
  let updateDate = updateDateTime.toDateString();
  let hours = updateDateTime.getHours();
  let minutes = updateDateTime.getMinutes();
  return `${updateDate} ${hours}:${minutes}`;
};
export default function DetailsComponent(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = props.studentFound;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      {rows && rows.length > 0 ? (
        <Paper className={classes.root}>
          <TableContainer className={classes.tableContainer}>
            <Table
              stickyHeader
              className={classes.table}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">Operation</TableCell>
                  <TableCell align="left">Remarks</TableCell>
                  <TableCell align="left">Last Update User</TableCell>
                  <TableCell align="right">Last Update Time</TableCell>
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
                    <TableCell align="left">
                      {OPERATION_FLAG_DESC[row.operationFlag]}
                    </TableCell>
                    <TableCell align="left">{row.remarks}</TableCell>
                    <TableCell align="left">{row.lastUpdateUser}</TableCell>
                    <TableCell align="right">
                      {getDateAndTime(row.lastUpdateTime)}
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
            count={rows.length}
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
