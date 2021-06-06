import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TabComponent from "./TabComponent";
import SummaryPanelComponent from "./SummaryPanel/SummaryPanelComponent";
import { useLocation } from "react-router";
import { findStudent } from "../../actions/studentactions";
import { AuthContext } from "../LoginScreen/context/auth";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(2),
      width: "100%",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function SaveStudentComponent(props) {

  let locationFound = useLocation();
  const { currentUser } = useContext(AuthContext);
  const [studentFoundForSummary, setStudentFoundForSummary] = React.useState(
    {}
  );
  const [backDropState, setBackDropState] = React.useState(false);

  React.useEffect(() => {
    if(locationFound){
      const fetchObject = {
        studentId : locationFound.state.studentFound.studentId
      };
      setBackDropState(true);
      findStudent(fetchObject,currentUser)
        .then(res => 
          { 
            console.log("FOUND .. "+res)
            setStudentFoundForSummary({studentFound : res.data[0]});
            setBackDropState(false);
          })
        .catch(err => {
            console.log('error ...')
            setBackDropState(false);
          })
    }
  },[]);

  const classes = useStyles();
  //let locationFound = useLocation();
  
  let studentFound = studentFoundForSummary.studentFound
    ? studentFoundForSummary.studentFound
    : {};
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

  // let enrolledInfo = studentFound
  //   ? studentFound.enrolledInfo
  //     ? studentFound.enrolledInfo
  //     : {}
  //   : {};
  //enrolledInfo.selectedCourse = selectedCourse;
  studentFound.selectedCourse = selectedCourse;
  console.log("------------------------------");
  console.log(studentFound);

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
        <Backdrop className={classes.backdrop} open={backDropState}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Paper>
      
    </div>
  );
}
