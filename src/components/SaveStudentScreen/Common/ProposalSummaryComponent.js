import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
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

export default function ProposalSummaryComponent(props) {
  const { studentFound } = props;
  const selectedCourse = studentFound
    ? studentFound.enrolledInfo
      ? studentFound.enrolledInfo.selectedCourse
      : null
    : null;
  const classes = useStyles();
  return (
    <div>
      {selectedCourse && selectedCourse.length > 0 && (
        <Paper className={classes.root}>
          <div className={classes.sectionDiv}>
            <Typography component={"span"} variant="body1">
              Selected Course
            </Typography>
            <div className={classes.innerDiv}>
              <Typography component={"span"} variant="body2">
                Application Id : {selectedCourse[0].applnId}
              </Typography>
              <Typography component={"span"} variant="body2">
                Applied University : {selectedCourse[0].appldUnvsty}
              </Typography>
              {selectedCourse[0].appldCourse && (
                <Typography component={"span"} variant="body2">
                  Applied Course : {selectedCourse[0].appldCourse}
                </Typography>
              )}
              {selectedCourse[0].appldCourseTyp && (
                <Typography component={"span"} variant="body2">
                  Applied Course Type : {selectedCourse[0].appldCourseTyp}
                </Typography>
              )}
              {selectedCourse[0].offrLtrStatus && (
                <Typography component={"span"} variant="body2">
                  Offer Letter Status : {selectedCourse[0].offrLtrStatus}
                </Typography>
              )}
              {selectedCourse[0].visaLtrStatus && (
                <Typography component={"span"} variant="body2">
                  Visa Letter Status : {selectedCourse[0].visaLtrStatus}
                </Typography>
              )}
              {selectedCourse[0].feesPaid && (
                <Typography component={"span"} variant="body2">
                  Fees Paid : {selectedCourse[0].feesPaid}
                </Typography>
              )}
              {selectedCourse[0].stdUsrName && (
                <Typography component={"span"} variant="body2">
                  Student User Name : {selectedCourse[0].stdUsrName}
                </Typography>
              )}
              {selectedCourse[0].stdPwd && (
                <Typography component={"span"} variant="body2">
                  Student Password : {selectedCourse[0].stdPwd}
                </Typography>
              )}
              {selectedCourse[0].appldDate && (
                <Typography component={"span"} variant="body2">
                  Application Date:{" "}
                  {new Date(selectedCourse[0].appldDate).toDateString()}
                </Typography>
              )}
              {selectedCourse[0].offrLtrDate && (
                <Typography component={"span"} variant="body2">
                  Offer Letter Date:{" "}
                  {new Date(selectedCourse[0].offrLtrDate).toDateString()}
                </Typography>
              )}
              {selectedCourse[0].visaLtrDate && (
                <Typography component={"span"} variant="body2">
                  Visa Letter Date:{" "}
                  {new Date(selectedCourse[0].visaLtrDate).toDateString()}
                </Typography>
              )}
              {selectedCourse[0].courseStrtDate && (
                <Typography component={"span"} variant="body2">
                  Course Start Date:{" "}
                  {new Date(selectedCourse[0].courseStrtDate).toDateString()}
                </Typography>
              )}
            </div>
          </div>
        </Paper>
      )}
    </div>
  );
}
