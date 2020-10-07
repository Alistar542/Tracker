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
                    <ExcelColumn label="Application Stage" value="Test"/>
                    <ExcelColumn label="Current Status" value="currentState"/>
                    <ExcelColumn label="Phone Number" value="phoneNumber"/>
                    <ExcelColumn label="Additional Ph No" value="additionalPhNo"/>
                    <ExcelColumn label="Email" value="email"/>
                    <ExcelColumn label="DOB" value="dateOfBirth"/>
                    <ExcelColumn label="Gender" value="gender"/>
                    <ExcelColumn label="Marital Status" value="maritalStatus"/>
                    <ExcelColumn label="Country of Education" value="countryOfEducation"/>
                    <ExcelColumn label="Highest Level Of Education" value="highestLevelOfEducation"/>
                    <ExcelColumn label="Grading Scheme" value="gradingScheme"/>
                    <ExcelColumn label="Grade Average" value="gradeAverage"/>
                    <ExcelColumn label="Graduated Year" value="graduatedYear"/>
                    <ExcelColumn label="English Exam Type" value="englishExamType"/>
                    <ExcelColumn label="Exam Date" value="examDate"/>
                    <ExcelColumn label="Overall" value="overall"/>
                    <ExcelColumn label="Listening" value="listening"/>
                    <ExcelColumn label="Reading" value="reading"/>
                    <ExcelColumn label="Writing" value="writing"/>
                    <ExcelColumn label="Speaking" value="speaking"/>
                    <ExcelColumn label="Company Name" value="companyName"/>
                    <ExcelColumn label="Postion" value="position"/>
                    <ExcelColumn label="Start Date" value="startDate"/>
                    <ExcelColumn label="End Date" value="endDate"/>
                    <ExcelColumn label="Address" value="workAddress"/>
                    <ExcelColumn label="Date Of Request" value="dateOfRequest"/>
                    <ExcelColumn label="Source" value="source"/>
                    <ExcelColumn label="Way Of Contact" value="wayOfContact"/>
                    <ExcelColumn label="Counselor" value="counselor"/>
                    <ExcelColumn label="Priority" value="priority"/>
                    <ExcelColumn label="Proposal>>>>>>" value="********"/>
                    <ExcelColumn label="Visa Application Status" value="proposalInfo.visaApplnStatus"/>
                    <ExcelColumn label="Visa Process Date" value="proposalInfo.visaApplnPrcDate"/>
                    <ExcelColumn label="Visa Status" value="proposalInfo.visaStatus"/>
                    <ExcelColumn label="Visa Appr/Rej Date" value="proposalInfo.visaApRjDate"/>
                    <ExcelColumn label="Travel Date" value="proposalInfo.travelDate"/>
                    <ExcelColumn label="Enrolled>>>>>>" value="************"/>
                    <ExcelColumn label="Course Starting Date" value="enrolledInfo.courseStartingDate"/>
                    <ExcelColumn label="Currency" value={(enrolledInfo) => enrolledInfo.currency ? enrolledInfo.currency : ""}/>
                    <ExcelColumn label="Total Tution Fees" value={(enrolledInfo) => enrolledInfo.totalTutionFees ? enrolledInfo.totalTutionFees : ""}/>
                    <ExcelColumn label="Annual Tution Fees" value={(enrolledInfo) => enrolledInfo.annualTutionFees ? enrolledInfo.annualTutionFees : ""}/>
                    <ExcelColumn label="Total Commission" value={(enrolledInfo) => enrolledInfo.totalCommission ? enrolledInfo.totalCommission : ""}/>
                    <ExcelColumn label="First Commission" value={(enrolledInfo) => enrolledInfo.firstCommission ? enrolledInfo.firstCommission : ""}/>
                    <ExcelColumn label="Invoice Date" value={(enrolledInfo) => enrolledInfo.invoiceDate ? enrolledInfo.invoiceDate.slice(0, 19).replace("T", " ") : ""}/>
                    <ExcelColumn label="Next Invoice Date" value={(enrolledInfo) => enrolledInfo.nextInvoiceDate ? enrolledInfo.nextInvoiceDate.slice(0, 19).replace("T", " ") : ""}/>
                    <ExcelColumn label="Balance Commission" value={(enrolledInfo) => enrolledInfo.balanceCommission ? enrolledInfo.balanceCommission : ""}/>
                </ExcelSheet>
            </ExcelFile>:<span></span>}</div>
        );
    
}