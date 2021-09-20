import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles((theme) => ({
  personalInfoDiv: {
    margin: theme.spacing(0, 1),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
    "& .MuiButton-root": {
      margin: "10px",
      padding: "7px",
    },
  },
  outerDiv: {
    margin: theme.spacing(2, 0),
  },
  studentRemarksField: {
    margin: theme.spacing(0, 1),
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  doneButton: {
    margin: 0,
    height: "36px",
    padding: theme.spacing(0, 1),
  },
}));

export default function RemarksComponent(props) {
  const classes = useStyles();

  const {
    formik,
    remarksStatus,
    openFollowUpPopupFn,
    setRemarksStatus,
  } = props;
  return (
    <div className={classes.outerDiv}>
      <Typography component={"span"} variant="h7">
        Follow Up Reminder
      </Typography>
      <div className={classes.personalInfoDiv}>
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="followUpDate"
            name="followUpDate"
            label="Next Follow Up Date"
          />
        </MuiPickersUtilsProvider>
        <TextField
          id="currentState"
          label="What to do next?"
          name="currentState"
          {...formik.getFieldProps("currentState")}
        /> */}
        {/* <Button
          variant="contained"
          color="primary"
          id="remarksDoneButton"
          className={classes.doneButton}
          onClick={(e) => openFollowUpPopupFn(e, "remarksDoneButton")}
        >
          New Follow Up Comment
        </Button>  */}

      </div>
      <div className={classes.studentRemarksField}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="followUpDate"
              name="followUpDate"
              label="Next Follow Up Date"
            />
          </MuiPickersUtilsProvider>
        <TextField
          required
          id="standard-textarea"
          label="Current Status"
          placeholder="Remarks"
          name="studentRemarks"
          multiline
          {...formik.getFieldProps("studentRemarks")}
        />
      </div>
      <div className={classes.studentRemarksField}>
        
      <TextField
          id="currentState"
          label="Counsellor Remarks"
          name="currentState"
          placeholder=" Add counsellor comments"
          multiline
          {...formik.getFieldProps("currentState")}
        />
      </div>
    </div>
  );
}
