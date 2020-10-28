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
import Button from "@material-ui/core/Button";
import EducationDetailsPopup from "./Popups/EducationDetailsPopup";
import { Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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
    "& .MuiButton-root": {
      margin: theme.spacing(1),
    },
  },
  educationDtlPaper: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: "6px",
    paddingRight: "2px",
    margin: theme.spacing(1),
    alignItems: "center",
  },
  actionButtonDiv: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
  },
}));

export default function EducationSummaryComponent(props) {
  const { formik, educationDetails, setEducationDetails } = props;
  const classes = useStyles();
  const [openEducationDtlPopup, setOpenEducationDtlPopup] = React.useState(
    false
  );
  const [currentEducationDtl, setCurrentEducationDtl] = React.useState(null);
  const [
    currentEducationDtlIndex,
    setCurrentEducationDtlIndex,
  ] = React.useState(null);

  const handleOpenEducationDtl = () => {
    setOpenEducationDtlPopup(!openEducationDtlPopup);
    setCurrentEducationDtl(null);
    setCurrentEducationDtlIndex(null);
  };

  const deleteAndUpdateEducationDtl = (index) => {
    let educationDetailsCopy = [...educationDetails];
    educationDetailsCopy.splice(index, 1);
    setEducationDetails(educationDetailsCopy);
    setCurrentEducationDtlIndex(null);
  };

  const handleSubmitEducationDtl = (values) => {
    let educationDetailsCopy = educationDetails ? educationDetails : [];
    if (currentEducationDtlIndex != null) {
      educationDetailsCopy[currentEducationDtlIndex] = values;
    } else {
      educationDetailsCopy.push(values);
    }
    setEducationDetails(educationDetailsCopy);
    setOpenEducationDtlPopup(false);
    setCurrentEducationDtlIndex(null);
    setCurrentEducationDtl(null);
  };

  return (
    <div className={classes.outerDiv}>
      <Typography component={"span"} variant="h7">
        Education Summary
      </Typography>
      <div className={classes.personalInfoDiv}>
        <TextField
          id="countryOfEducation"
          label="Country Of Education"
          name="countryOfEducation"
          {...formik.getFieldProps("countryOfEducation")}
        />
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
            <MenuItem value={"secSchool"}>Secondary School</MenuItem>
            <MenuItem value={"higherSecondary"}>
              Higher Secondary School
            </MenuItem>
            <MenuItem value={"1ydiploma"}>1 Year Diploma</MenuItem>
            <MenuItem value={"2ydiploma"}>2 Year Diploma</MenuItem>
            <MenuItem value={"3ydiploma"}>3 Year Diploma</MenuItem>
            <MenuItem value={"bachelor"}>Bachelor</MenuItem>
            <MenuItem value={"master"}>Master</MenuItem>
            <MenuItem value={"phd"}>PhD</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="eduCourseType"
          label="Course Type"
          name="eduCourseType"
          {...formik.getFieldProps("eduCourseType")}
        />

        <FormControl className={classes.formControlSelect}>
          <InputLabel id="demo-simple-select-label">Grading Scheme</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="gradingScheme"
            name="gradingScheme"
            {...formik.getFieldProps("gradingScheme")}
          >
            <MenuItem value={"gpa4"}>GPA out of 4</MenuItem>
            <MenuItem value={"gpa5"}>GPA out of 5</MenuItem>
            <MenuItem value={"gpa10"}>GPA out of 10</MenuItem>
            <MenuItem value={"percent"}>Percentage</MenuItem>
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
      <Button
        color="primary"
        variant="contained"
        onClick={handleOpenEducationDtl}
      >
        Add Education Detail
      </Button>
      <div>
        {educationDetails &&
          educationDetails.map((educationDtl, index) => {
            const openAndEditEducationDtl = () => {
              setCurrentEducationDtl(educationDtl);
              setCurrentEducationDtlIndex(index);
              setOpenEducationDtlPopup(true);
            };
            const deleteEducationDtl = () => {
              deleteAndUpdateEducationDtl(index);
            };

            return (
              <Paper className={classes.educationDtlPaper}>
                <div>
                  {educationDtl.educationLevel &&
                    educationDtl.educationLevel.length > 0 &&
                    `${educationDtl.educationLevel} - `}
                  {educationDtl.institutionCountry &&
                    educationDtl.institutionCountry.length > 0 &&
                    `${educationDtl.institutionCountry} - `}
                  {educationDtl.institutionName &&
                    educationDtl.institutionName.length > 0 &&
                    `${educationDtl.institutionName} - `}
                  {educationDtl.primaryLanguage &&
                    educationDtl.primaryLanguage.length > 0 &&
                    `${educationDtl.primaryLanguage} - `}
                  {educationDtl.attendedFromDate &&
                    `${new Date(
                      educationDtl.attendedFromDate
                    ).toDateString()} - `}
                  {educationDtl.attendedToDate > 0 &&
                    `${new Date(
                      educationDtl.attendedToDate
                    ).toDateString()} - `}
                  {educationDtl.degreeAwarded &&
                    educationDtl.degreeAwarded.length > 0 &&
                    `${educationDtl.degreeAwarded} - `}
                  {educationDtl.degreeAwardedOn &&
                    `${new Date(
                      educationDtl.degreeAwardedOn
                    ).toDateString()} - `}
                  {educationDtl.address &&
                    educationDtl.address.length > 0 &&
                    `${educationDtl.address} - `}
                  {educationDtl.city &&
                    educationDtl.city.length > 0 &&
                    `${educationDtl.city} - `}
                  {educationDtl.province.length > 0 &&
                    `${educationDtl.province} - `}
                  {educationDtl.zipCode &&
                    educationDtl.zipCode.length > 0 &&
                    `${educationDtl.zipCode}`}
                </div>
                <div className={classes.actionButtonDiv}>
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={openAndEditEducationDtl}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    aria-label="delete"
                    onClick={deleteEducationDtl}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Paper>
            );
          })}
      </div>
      <EducationDetailsPopup
        openEducationDtlPopup={openEducationDtlPopup}
        handleOpenEducationDtl={handleOpenEducationDtl}
        handleSubmitEducationDtl={handleSubmitEducationDtl}
        currentEducationDtl={currentEducationDtl}
      />
    </div>
  );
}
