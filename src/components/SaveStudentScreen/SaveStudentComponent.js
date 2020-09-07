import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TabComponent from "./TabComponent";
import SummaryPanelComponent from "./SummaryPanel/SummaryPanelComponent";
import { useLocation } from "react-router";
import { findCountries } from "../../actions/commonactions";

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
  //let { studentFound } = locationFound.state ? locationFound.state : {};
  const [studentFoundForSummary, setStudentFoundForSummary] = React.useState(
    locationFound.state ? locationFound.state : {}
  );
  const updateStudentFoundForSummary = (student) => {
    setStudentFoundForSummary({ studentFound: student });
  };
  const [countries, setCountries] = React.useState([]);

  useEffect(() => {
    findCountries()
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => {
        console.log("Error while finding Countries " + err);
      });
  }, []);

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
          countries={countries}
        />
      </Paper>
    </div>
  );
}
