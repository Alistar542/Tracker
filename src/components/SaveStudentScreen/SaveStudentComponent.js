import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TabComponent from "./TabComponent";
import SummaryPanelComponent from "./SummaryPanel/SummaryPanelComponent";
import { useLocation } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(2),
      width: "100%",
    },
  },
}));

export default function SaveStudentComponent(props) {
  const classes = useStyles();
  let locationFound = useLocation();
  let { studentFound } = locationFound.state ? locationFound.state : {};
  let courseDetails = studentFound
    ? studentFound.proposalInfo
      ? studentFound.proposalInfo.applicationDetails
        ? studentFound.proposalInfo.applicationDetails
        : []
      : []
    : [];
  let selectedCourse = courseDetails.filter((course) => {
    return course.applStatus === "Y";
  });

  let enrolledInfo = studentFound
    ? studentFound.enrolledInfo
      ? studentFound.enrolledInfo
      : {}
    : {};
  enrolledInfo.selectedCourse = { ...selectedCourse };
  studentFound.enrolledInfo = enrolledInfo;
  console.log("------------------------------");
  console.log(studentFound);
  const [studentFoundForSummary, setStudentFoundForSummary] = React.useState(
    locationFound.state ? locationFound.state : {}
  );
  const updateStudentFoundForSummary = (student) => {
    setStudentFoundForSummary({ studentFound: student });
  };

  return (
    <div className={classes.root}>
      <Paper>
        <SummaryPanelComponent
          studentFound={
            studentFoundForSummary && studentFoundForSummary.studentFound
          }
        />
        <TabComponent
          updateStudentFoundForSummary={updateStudentFoundForSummary}
          studentFound={
            studentFoundForSummary && studentFoundForSummary.studentFound
          }
        />
      </Paper>
    </div>
  );
}
