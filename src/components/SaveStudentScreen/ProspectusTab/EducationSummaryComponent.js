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
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { FieldArray, getIn } from "formik";

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
  innerDiv: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(1),
  },
  fieldDiv: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  addButton: {
    width: "250px",
    marginLeft: theme.spacing(1),
  },
  removeButton: {
    margin: theme.spacing(1),
  },
  educationDetailsDiv: {
    margin: theme.spacing(2, 0, 1, 1),
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      margin: theme.spacing(0, 1),
      width: 200,
    },
  },
}));

// export default function EducationSummaryComponent(props) {
//   const { formik } = props;
//   const classes = useStyles();

//   return (
//     <div className={classes.outerDiv}>
//       <Typography component={"span"} variant="h7">
//         Education Summary
//       </Typography>
//       <div className={classes.personalInfoDiv}>
//         <TextField
//           id="countryOfEducation"
//           label="Country Of Education"
//           name="countryOfEducation"
//           {...formik.getFieldProps("countryOfEducation")}
//         />
//         <FormControl className={classes.formControlSelect}>
//           <InputLabel id="demo-simple-select-label">
//             Highest Level Of Education
//           </InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="highestLevelOfEducation"
//             name="highestLevelOfEducation"
//             {...formik.getFieldProps("highestLevelOfEducation")}
//           >
//             <MenuItem value={"secSchool"}>Secondary School</MenuItem>
//             <MenuItem value={"higherSecondary"}>
//               Higher Secondary School
//             </MenuItem>
//             <MenuItem value={"1ydiploma"}>1 Year Diploma</MenuItem>
//             <MenuItem value={"2ydiploma"}>2 Year Diploma</MenuItem>
//             <MenuItem value={"3ydiploma"}>3 Year Diploma</MenuItem>
//             <MenuItem value={"bachelor"}>Bachelor</MenuItem>
//             <MenuItem value={"master"}>Master</MenuItem>
//             <MenuItem value={"phd"}>PhD</MenuItem>
//           </Select>
//         </FormControl>

//         <TextField
//           id="eduCourseType"
//           label="Course Major"
//           name="eduCourseType"
//           {...formik.getFieldProps("eduCourseType")}
//         />

//         <FormControl className={classes.formControlSelect}>
//           <InputLabel id="demo-simple-select-label">Grading Scheme</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="gradingScheme"
//             name="gradingScheme"
//             {...formik.getFieldProps("gradingScheme")}
//           >
//             <MenuItem value={"gpa4"}>GPA out of 4</MenuItem>
//             <MenuItem value={"gpa5"}>GPA out of 5</MenuItem>
//             <MenuItem value={"gpa10"}>GPA out of 10</MenuItem>
//             <MenuItem value={"percent"}>Percentage</MenuItem>
//             <MenuItem value={"grade"}>Grade</MenuItem>
//           </Select>
//         </FormControl>

//         <TextField
//           id="gradeAverage"
//           label="Grade Average"
//           name="gradeAverage"
//           {...formik.getFieldProps("gradeAverage")}
//         />

//         <MuiPickersUtilsProvider utils={DateFnsUtils}>
//           <KeyboardDatePicker
//             autoOk
//             openTo="year"
//             variant="inline"
//             views={["year", "month"]}
//             margin="normal"
//             id="graduatedYear"
//             name="graduatedYear"
//             label="Graduated Year"
//             KeyboardButtonProps={{
//               "aria-label": "change date",
//             }}
//             value={formik.values.graduatedYear}
//             onChange={(value) => formik.setFieldValue("graduatedYear", value)}
//           />
//         </MuiPickersUtilsProvider>
//       </div>
//       <EducationDetails formik={formik} />
//     </div>
//   );
// }

export default function EducationSummaryComponent(props) {
  const { formik } = props;
  const classes = useStyles();
  return (
    <FieldArray name="educationDetails">
      {({ push, remove }) => (
        <div className={classes.educationDetailsDiv}>
          {formik.values.educationDetails &&
          formik.values.educationDetails.length > 0
            ? formik.values.educationDetails.map((p, index) => {
                const educationLevel = `educationDetails[${index}].educationLevel`;
                const institutionCountry = `educationDetails[${index}].institutionCountry`;
                const courseMajor = `educationDetails[${index}].courseMajor`;
                const institutionName = `educationDetails[${index}].institutionName`;
                const primaryLanguage = `educationDetails[${index}].primaryLanguage`;
                const attendedFromDate = `educationDetails[${index}].attendedFromDate`;
                const attendedToDate = `educationDetails[${index}].attendedToDate`;
                const gradingScheme = `educationDetails[${index}].gradingScheme`;
                const gradeAvg = `educationDetails[${index}].gradeAvg`;
                const degreeAwardedOn = `educationDetails[${index}].degreeAwardedOn`;
                const address = `educationDetails[${index}].address`;
                const city = `educationDetails[${index}].city`;
                const province = `educationDetails[${index}].province`;
                const zipCode = `educationDetails[${index}].zipCode`;

                const touchedEducationLevel = getIn(
                  formik.touched,
                  educationLevel
                );
                const errorEducationLevel = getIn(
                  formik.errors,
                  educationLevel
                );
                const touchedInstitutionCountry = getIn(
                  formik.touched,
                  institutionCountry
                );
                const errorInstitutionCountry = getIn(
                  formik.errors,
                  institutionCountry
                );
                const touchedCourseMajor = getIn(
                  formik.touched,
                  courseMajor
                );
                const errorCourseMajor = getIn(
                  formik.errors,
                  courseMajor
                );
                return (
                  <div key={index} className={classes.innerDiv}>
                    <Typography component={"span"} variant="body2">
                      {`Education Details - ${index + 1}`}
                    </Typography>
                    <div className={classes.fieldDiv}>
                      
                      <FormControl className={classes.formControlSelect}>
                        <InputLabel id="demo-simple-select-label">
                         Level Of Education
                        </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        name={educationLevel}
                        value={p.educationLevel}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
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
                        margin="dense"
                        name={courseMajor}
                        label="Course Major"
                        type="text"
                        value={p.courseMajor}
                        onChange={formik.handleChange}
                        helperText={
                          touchedCourseMajor && errorCourseMajor
                            ? errorCourseMajor
                            : ""
                        }
                        error={Boolean(
                          touchedCourseMajor && errorCourseMajor
                        )}
                      />
                      <TextField
                        margin="dense"
                        name={institutionName}
                        label="Name Of Institution"
                        type="text"
                        value={p.institutionName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <TextField
                        margin="dense"
                        name={institutionCountry}
                        label="Country Of Institution"
                        type="text"
                        value={p.institutionCountry}
                        onChange={formik.handleChange}
                        helperText={
                          touchedInstitutionCountry && errorInstitutionCountry
                            ? errorInstitutionCountry
                            : ""
                        }
                        error={Boolean(
                          touchedInstitutionCountry && errorInstitutionCountry
                        )}
                      />
                      <TextField
                        id="primaryLanguage"
                        name={primaryLanguage}
                        label="Primary Language"
                        type="text"
                        value={p.primaryLanguage}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <FormControl className={classes.formControlSelect}>
          <InputLabel id="demo-simple-select-label">Grading Scheme</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="gradingScheme"
            name={gradingScheme}
            value={p.gradingScheme}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <MenuItem value={"gpa4"}>GPA out of 4</MenuItem>
            <MenuItem value={"gpa5"}>GPA out of 5</MenuItem>
            <MenuItem value={"gpa10"}>GPA out of 10</MenuItem>
            <MenuItem value={"percent"}>Percentage</MenuItem>
            <MenuItem value={"grade"}>Grade</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="gradeAvg"
          label="Grade Average"
          name={gradeAvg}
          type="text"
          value={p.gradeAvg}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          autoOk
                          openTo="year"
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="dense"
                          name={attendedFromDate}
                          label="Attended From Date"
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          value={p.attendedFromDate}
                          onChange={(value) =>
                            formik.setFieldValue(attendedFromDate, value)
                          }
                          onBlur={formik.handleBlur}
                        />
                      </MuiPickersUtilsProvider>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          autoOk
                          openTo="year"
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="dense"
                          name={attendedToDate}
                          label="Attended To Date"
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          value={p.attendedToDate}
                          onChange={(value) =>
                            formik.setFieldValue(attendedToDate, value)
                          }
                        />
                      </MuiPickersUtilsProvider>
                      {/* <TextField
                        margin="dense"
                        name={degreeAwarded}
                        label="Degree Awarded"
                        type="text"
                        value={p.degreeAwarded}
                        onChange={formik.handleChange}
                      /> */}
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          autoOk
                          openTo="year"
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="dense"
                          name={degreeAwardedOn}
                          label="Degree Awarded On"
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          value={p.degreeAwardedOn}
                          onChange={(value) =>
                            formik.setFieldValue(degreeAwardedOn, value)
                          }
                        />
                      </MuiPickersUtilsProvider>
                      <TextField
                        margin="dense"
                        name={address}
                        label="Address"
                        type="text"
                        value={p.address}
                        onChange={formik.handleChange}
                      />
                      <TextField
                        margin="dense"
                        name={city}
                        label="City"
                        type="text"
                        value={p.city}
                        onChange={formik.handleChange}
                      />
                      <TextField
                        margin="dense"
                        name={province}
                        label="Province"
                        type="text"
                        value={p.province}
                        onChange={formik.handleChange}
                      />
                      <TextField
                        margin="dense"
                        name={zipCode}
                        label="Zip Code"
                        type="text"
                        value={p.zipCode}
                        onChange={formik.handleChange}
                      />

                      {formik.values.educationDetails.length !== 1 ? (
                        <IconButton
                          aria-label="delete"
                          onClick={() => remove(index)}
                          className={classes.removeButton}
                        >
                          <DeleteIcon />
                        </IconButton>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })
            : ""}
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              push({
                educationLevel: "",
                institutionCountry: "",
                courseMajor:"",
                institutionName: "",
                primaryLanguage: "",
                gradingScheme: "",
                gradeAvg: "",
                attendedFromDate: null,
                attendedToDate: null,
                degreeAwarded: "",
                degreeAwardedOn: null,
                address: "",
                city: "",
                province: "",
                zipCode: "",
              })
            }
            className={classes.addButton}
          >
            Add Education Detail
          </Button>
        </div>
      )}
    </FieldArray>
  );
}
