import React from "react";
import ReactExport from "react-export-excel";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
      height:40
    },
  }));

export default function ExportAsExcelComponent(props) {
    const dataSet1=props.studentsFound
    const classes = useStyles();
        return (
            <div>{dataSet1.length > 0 ? 
            <ExcelFile filename="Student List" element={
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Save as Excel
              </Button>}>
                <ExcelSheet data={dataSet1} name="Students">
                    <ExcelColumn label="First Name" value="firstName"/>
                    <ExcelColumn label="Last Name" value="lastName"/>
                    <ExcelColumn label="Phone Number" value="phoneNumber"/>
                    <ExcelColumn label="Course Interested" value="courseInterested"/>
                </ExcelSheet>
            </ExcelFile>:<span></span>}</div>
        );
    
}