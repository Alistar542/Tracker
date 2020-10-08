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
}));

export default function RemarksComponent(props) {
  const classes = useStyles();

  const { formik, remarksStatus, openFollowUpPopupFn } = props;
  return (
    <div className={classes.outerDiv}>
      <Typography component={"span"} variant="h7">
        Follow Up Reminder
      </Typography>
      <div className={classes.personalInfoDiv}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="followUpDate"
            name="followUpDate"
            label="Next Follow Up Date"
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            value={formik.values.followUpDate}
            onChange={(value) => formik.setFieldValue("followUpDate", value)}
          />
        </MuiPickersUtilsProvider>
        <TextField
          id="currentState"
          label="Student Remarks"
          name="currentState"
          {...formik.getFieldProps("currentState")}
        />

        <Button
          variant="contained"
          id="remarksDoneButton"
          disabled={remarksStatus !== "N"}
          onClick={(e) => openFollowUpPopupFn(e, "remarksDoneButton")}
        >
          {remarksStatus === "N" ? "Mark Followup Done" : "Followup done"}
        </Button>
      </div>
      <div className={classes.studentRemarksField}>
        <TextField
          id="standard-textarea"
          label="Additional Info/Comments"
          placeholder="Remarks"
          name="studentRemarks"
          multiline
          {...formik.getFieldProps("studentRemarks")}
        />
      </div>
    </div>
  );
}
