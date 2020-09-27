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
  },
  outerDiv: {
    margin: theme.spacing(2, 0),
  },
}));

export default function RemarksComponent(props) {
  const classes = useStyles();

  const { formik, remarksStatus, openFollowUpPopupFn } = props;
  return (
    <div className={classes.outerDiv}>
      <Typography component={"span"} variant="h7">
        Remarks
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
            label="Follow Up Date"
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            value={formik.values.followUpDate}
            onChange={(value) => formik.setFieldValue("followUpDate", value)}
          />
        </MuiPickersUtilsProvider>
        <TextField
          id="currentState"
          label="Current State"
          name="currentState"
          {...formik.getFieldProps("currentState")}
        />
        <TextField
          id="standard-textarea"
          label="Remarks"
          placeholder="Remarks"
          name="remarks"
          multiline
          {...formik.getFieldProps("remarks")}
        />
        <Button
          variant="contained"
          id="remarksDoneButton"
          disabled={remarksStatus !== "N"}
          onClick={(e) => openFollowUpPopupFn(e, "remarksDoneButton")}
        >
          {remarksStatus === "N" ? "Mark as Done" : "Done"}
        </Button>
      </div>
    </div>
  );
}
