import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TablePaginationActions from "../../Common/TablePaginationActions";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  tableOuterContainer: {
    padding: theme.spacing(2),
    height: `calc(100vh - 250px)`,
  },
  staffTableDiv: {
    height: "100%",
  },
}));

export default function ListStaffComponent(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users,setUsers] = React.useState([]);
  const rows = users;
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, users.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };
  
  React.useEffect(() => {
    // To fetch all users from backend
    setUsers([{userId:1,userName:'abc',userType:'A',officeCode:'abc'},{userId:2,userName:'qwe',userType:'E',officeCode:'qwe'}]);
  },[]);

  const navigateToViewUser = (selectedUser) => {
    props.updateUserFound(selectedUser);
  }

  return (
    <div className={classes.tableOuterContainer}>
      <div>
      {users && users.length > 0 ? (
        <Paper className={classes.root}>
          <TableContainer className={classes.tableContainer}>
            <Table
              stickyHeader
              className={classes.table}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">User Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Type</TableCell>
                  <TableCell align="left">Office</TableCell>
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
                    <TableCell align="left">{row.userId}</TableCell>
                    <TableCell align="left">{row.userName}</TableCell>
                    <TableCell align="left">{row.userType === 'A' ? 'Administrator' : 'Employee'}</TableCell>
                    <TableCell align="left">{row.officeCode}</TableCell>
                    
                    <TableCell align="right">
                      <Button
                        color="primary"
                        onClick={() => navigateToViewUser(row)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 60 * emptyRows }}>
                    <TableCell colSpan={7} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, { label: "All", value: -1 }]}
            count={users.length}
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
    </div>
  );
}
