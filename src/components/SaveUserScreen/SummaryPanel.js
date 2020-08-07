import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { STATUS_DESCRIPTION, STATUS } from "../../constants";
import clsx from "clsx";
import { green, indigo, red, cyan } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  summaryPanelDiv: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
  },
  statusChip: {
    marginLeft: "auto",
    color: "white",
  },
  cardDiv: {
    width: "100%",
    borderWidth: "1px",
    borderRadius: "6px",
    boxShadow: "0 1px 15px rgba(27,31,35,.15),0 0 1px rgba(106,115,125,.35)",
  },
  cardContentDiv: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  namePanel: {
    display: "flex",
    flexWrap: "wrap",
  },
  newStatus: {
    backgroundColor: cyan[500],
  },
  doneStatus: {
    backgroundColor: green[600],
  },
  rejectedStatus: {
    backgroundColor: red[500],
  },
  proposedStatus: {
    backgroundColor: indigo[500],
  },
  avatarComponent: {
    color: "white",
  },
}));

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export default function SummaryPanel(props) {
  const classes = useStyles();
  const studentFound = props.studentFound;
  return (
    <div className={classes.summaryPanelDiv}>
      {studentFound && (
        <Card className={classes.cardDiv}>
          <CardContent className={classes.cardContentDiv}>
            <Typography
              component="h4"
              variant="h4"
              className={classes.namePanel}
            >
              {studentFound.firstName.capitalize() +
                " " +
                (studentFound.middleName
                  ? studentFound.middleName.capitalize()
                  : "") +
                " " +
                studentFound.lastName.capitalize()}
            </Typography>
            <Chip
              className={clsx(classes.statusChip, {
                [classes.newStatus]: studentFound.status === STATUS.NEW,
                [classes.doneStatus]: studentFound.status === STATUS.DONE,
                [classes.proposedStatus]:
                  studentFound.status === STATUS.PROPOSED,
                [classes.rejectedStatus]:
                  studentFound.status === STATUS.REJECTED,
              })}
              avatar={
                <Avatar className={classes.avatarComponent}>
                  {studentFound.status}
                </Avatar>
              }
              label={STATUS_DESCRIPTION[studentFound.status]}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
