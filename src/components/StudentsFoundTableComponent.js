import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    tableContainer:{
        boxShadow:'0 3px 5px 2px rgba(201, 202, 177, .3)'
    },
    table: {
      minWidth: 650,
    },
  });

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export function StudentsFoundTableComponent(props){

    const classes = useStyles();
    return(
        <div>
           <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Student Name</TableCell>
                    <TableCell align="right">Phone Number</TableCell>
                    <TableCell align="right">Course Interested</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">FollowUp Remark</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {props.studentsFound.map(row => (
                    <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                        {row.firstName.capitalize()} {row.lastName}
                    </TableCell>
                    <TableCell align="right">{row.phoneNumber}</TableCell>
                    <TableCell align="right">{row.courseInterested}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">
                        {row.followUpRemarks?
                            row.followUpRemarks[row.followUpRemarks.length-1]:<span></span>}
                    </TableCell>
                    <TableCell align="right">
                    <Button color="primary" component={Link} to={{
                        pathname: "/home/add",
                        state: { studentFound: row }
                    }}>View</Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer> 
        </div>
    );

}