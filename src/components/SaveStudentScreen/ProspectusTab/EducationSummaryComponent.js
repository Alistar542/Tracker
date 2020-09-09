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

export default function EducationSummaryComponent(props) {
  const { formik, countries } = props;
  const classes = useStyles();
  return (
    <div className={classes.outerDiv}>
      <Typography component={"span"} variant="h7">
        Education Summary
      </Typography>
      <div className={classes.personalInfoDiv}>
        <FormControl className={classes.formControlSelect}>
          <InputLabel id="demo-simple-select-label">
            Country Of Education
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="countryOfEducation"
            name="countryOfEducation"
            {...formik.getFieldProps("countryOfEducation")}
          >
            {countries.map((country, index) => {
              return (
                <MenuItem value={country.name} key={index}>
                  {country.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl className={classes.formControlSelect}>
          <InputLabel id="demo-simple-select-label">
            Highest Level Of Education
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="highestLevelOfEducation"
            name="highestLevelOfEducation"
            {...formik.getFieldProps("highestLevelOfEducation")}
          >
            <MenuItem value={"sslc"}>SSLC</MenuItem>
            <MenuItem value={"higherSecondary"}>Higher Secondary</MenuItem>
            <MenuItem value={"diploma"}>Diploma</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControlSelect}>
          <InputLabel id="demo-simple-select-label">Grading Scheme</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="gradingScheme"
            name="gradingScheme"
            {...formik.getFieldProps("gradingScheme")}
          >
            <MenuItem value={"cgpa"}>CGPA out of 10</MenuItem>
            <MenuItem value={"percentage"}>Percentage</MenuItem>
            <MenuItem value={"grade"}>Grade</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="gradeAverage"
          label="Grade Average"
          name="gradeAverage"
          {...formik.getFieldProps("gradeAverage")}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            openTo="year"
            variant="inline"
            views={["year", "month"]}
            margin="normal"
            id="graduatedYear"
            name="graduatedYear"
            label="Graduated Year"
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            value={formik.values.graduatedYear}
            onChange={(value) => formik.setFieldValue("graduatedYear", value)}
          />
        </MuiPickersUtilsProvider>
      </div>
    </div>
  );
}
