import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { GENDER, MARITAL_STATUS, MONTHS } from "../../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
  },
  sectionDiv: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTypography-root": {
      margin: theme.spacing(0, 1),
    },
    padding: theme.spacing(1, 0),
  },
  innerDiv: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

export default function ProspectusSummaryComponent(props) {
  const { studentFound } = props;
  const classes = useStyles();
  let graduatedYear = new Date(studentFound.graduatedYear);
  return (
    <div>
      <Paper className={classes.root}>
        <div className={classes.sectionDiv}>
          <Typography component={"span"} variant="body1">
            Personal Information
          </Typography>
          <div className={classes.innerDiv}>
            <Typography component={"span"} variant="body2">
              Email : {studentFound.email}
            </Typography>
            <Typography component={"span"} variant="body2">
              Phone Number : {studentFound.phoneNumber}
            </Typography>
            {studentFound.additionalPhNo && (
              <Typography component={"span"} variant="body2">
                Additional Ph No : {studentFound.additionalPhNo}
              </Typography>
            )}
            {studentFound.dateOfBirth && (
              <Typography component={"span"} variant="body2">
                DOB: {new Date(studentFound.dateOfBirth).toDateString()}
              </Typography>
            )}
            {studentFound.gender && (
              <Typography component={"span"} variant="body2">
                Gender : {GENDER[studentFound.gender]}
              </Typography>
            )}
            {studentFound.maritalStatus && (
              <Typography component={"span"} variant="body2">
                Marital Status : {MARITAL_STATUS[studentFound.maritalStatus]}
              </Typography>
            )}
          </div>
        </div>
        <div className={classes.sectionDiv}>
          <Typography component={"span"} variant="body1">
            English Exam Type
          </Typography>
          <div className={classes.innerDiv}>
            <Typography component={"span"} variant="body2">
              English Exam Type : {studentFound.englishExamType}
            </Typography>
            {studentFound.examDate && (
              <Typography component={"span"} variant="body2">
                Exam Date : {new Date(studentFound.examDate).toDateString()}
              </Typography>
            )}
            {studentFound.overall && (
              <Typography component={"span"} variant="body2">
                Overall : {studentFound.overall}
              </Typography>
            )}
            {studentFound.listening && (
              <Typography component={"span"} variant="body2">
                Listening: {studentFound.listening}
              </Typography>
            )}
            {studentFound.reading && (
              <Typography component={"span"} variant="body2">
                Reading : {studentFound.reading}
              </Typography>
            )}
            {studentFound.writing && (
              <Typography component={"span"} variant="body2">
                Writing : {studentFound.writing}
              </Typography>
            )}
            {studentFound.writing && (
              <Typography component={"span"} variant="body2">
                Speaking : {studentFound.speaking}
              </Typography>
            )}
          </div>
        </div>
        <div className={classes.sectionDiv}>
          <Typography component={"span"} variant="body1">
            Education Summary
          </Typography>
          <div className={classes.innerDiv}>
            <Typography component={"span"} variant="body2">
              Country Of Education : {studentFound.countryOfEducation}
            </Typography>
            <Typography component={"span"} variant="body2">
              Highest Level Of Education :{" "}
              {studentFound.highestLevelOfEducation}
            </Typography>
            {studentFound.gradingScheme && (
              <Typography component={"span"} variant="body2">
                Grading Scheme : {studentFound.gradingScheme}
              </Typography>
            )}
            {studentFound.gradeAverage && (
              <Typography component={"span"} variant="body2">
                Grade Average: {studentFound.gradeAverage}
              </Typography>
            )}
            {studentFound.graduatedYear && (
              <Typography component={"span"} variant="body2">
                Graduated Year :
                {`${
                  MONTHS[graduatedYear.getMonth()]
                } ${graduatedYear.getFullYear()}`}
              </Typography>
            )}
          </div>
        </div>
        <div className={classes.sectionDiv}>
          <Typography component={"span"} variant="body1">
            Work Experience
          </Typography>
          <div className={classes.innerDiv}>
            <Typography component={"span"} variant="body2">
              Company Name : {studentFound.companyName}
            </Typography>
            <Typography component={"span"} variant="body2">
              Position : {studentFound.position}
            </Typography>
            {studentFound.startDate && (
              <Typography component={"span"} variant="body2">
                Start Date : {new Date(studentFound.startDate).toDateString()}
              </Typography>
            )}
            {studentFound.endDate && (
              <Typography component={"span"} variant="body2">
                End Date: {new Date(studentFound.endDate).toDateString()}
              </Typography>
            )}
            {studentFound.workAddress && (
              <Typography component={"span"} variant="body2">
                Work Address : {studentFound.workAddress}
              </Typography>
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
}
