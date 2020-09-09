import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  personalInfoDiv: {
    margin: theme.spacing(0, 1),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  formControlSelect: {
    margin: theme.spacing(0, 1),
    width: 200,
  },
  outerDiv: {
    margin: theme.spacing(2, 0),
  },
}));

export default function MarketingPurposeComponent(props) {
  const { formik } = props;
  const classes = useStyles();
  return (
    <div className={classes.outerDiv}>
      <Typography component={"span"} variant="h7">
        Marketing Purpose
      </Typography>
      <div className={classes.personalInfoDiv}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="dateOfRequest"
            name="dateOfRequest"
            label="Date Of Request"
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            value={formik.values.dateOfRequest}
            onChange={(value) => formik.setFieldValue("dateOfRequest", value)}
          />
        </MuiPickersUtilsProvider>
        <TextField
          id="source"
          label="Source"
          name="source"
          {...formik.getFieldProps("source")}
        />
        <TextField
          id="wayOfContact"
          label="Way Of Contact"
          name="wayOfContact"
          {...formik.getFieldProps("wayOfContact")}
        />
        <TextField
          id="counselor"
          label="Counselor"
          name="counselor"
          {...formik.getFieldProps("counselor")}
        />
        <FormControl className={classes.formControlSelect}>
          <InputLabel id="demo-simple-select-label">Priority</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="priority"
            name="priority"
            {...formik.getFieldProps("priority")}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
