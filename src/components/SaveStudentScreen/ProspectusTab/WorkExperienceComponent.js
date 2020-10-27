import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  personalInfoDiv: {
    margin: theme.spacing(0, 1),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    "& .MuiTextField-root": {
      margin: theme.spacing(0, 1),
      width: 200,
    },
  },
  formControlSelect: {
    margin: theme.spacing(0, 1),
    width: 200,
  },
  outerDiv: {
    margin: theme.spacing(2, 0),
  },
}));

export default function WorkExperienceComponent(props) {
  const { formik } = props;
  const classes = useStyles();
  return (
    <div className={classes.outerDiv}>
      <Typography component={"span"} variant="h7">
        Work Experience
      </Typography>
      <div className={classes.personalInfoDiv}>
        <TextField
          id="companyName"
          label="Company Name"
          name="companyName"
          {...formik.getFieldProps("companyName")}
        />
        <TextField
          id="position"
          label="Postion"
          name="position"
          {...formik.getFieldProps("position")}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            openTo="year"
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="startDate"
            name="startDate"
            label="Start Date"
            views={["year", "month", "date"]}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            value={formik.values.startDate}
            onChange={(value) => formik.setFieldValue("startDate", value)}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            openTo="year"
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="endDate"
            name="endDate"
            label="End Date"
            views={["year", "month", "date"]}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            value={formik.values.endDate}
            onChange={(value) => formik.setFieldValue("endDate", value)}
          />
        </MuiPickersUtilsProvider>

        <TextField
          id="workAddress"
          label="Address"
          name="workAddress"
          {...formik.getFieldProps("workAddress")}
        />
      </div>
    </div>
  );
}
