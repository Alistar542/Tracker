import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { FieldArray, getIn } from "formik";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  areasOfInterestDiv: {
    margin: theme.spacing(0, 1),
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      margin: theme.spacing(0, 1),
      width: 200,
    },
  },
  formControlSelect: {
    margin: theme.spacing(0, 1),
    width: 200,
  },
  innerDiv: {
    display: "flex",
    flexDirection: "row",
    marginBottom: theme.spacing(1),
  },
  formControlSelect: {
    margin: theme.spacing(0, 1),
    width: 200,
  },
  addButton: {
    width: "180px",
    marginLeft: theme.spacing(1),
  },
  removeButton: {
    margin: theme.spacing(1),
  },
  outerDiv: {
    margin: theme.spacing(2, 0),
  },
}));

export default function AreasOfInterestComponent(props) {
  const classes = useStyles();
  const { formik } = props;

  return (
    <div className={classes.outerDiv}>
      <Typography component={"span"} variant="h7">
        Interested Courses
      </Typography>
      <FieldArray name="requestedCourseDetails">
        {({ push, remove }) => (
          <div className={classes.areasOfInterestDiv}>
            {formik.values.requestedCourseDetails &&
            formik.values.requestedCourseDetails.length > 0
              ? formik.values.requestedCourseDetails.map((p, index) => {
                  const requestedCourse = `requestedCourseDetails[${index}].requestedCourse`;
                  const preferredCountry = `requestedCourseDetails[${index}].preferredCountry`;
                  const intEduLevel = `requestedCourseDetails[${index}].intEduLevel`;
                  const touchedRequestedCourse = getIn(
                    formik.touched,
                    requestedCourse
                  );
                  const errorRequestedCourse = getIn(
                    formik.errors,
                    requestedCourse
                  );
                  const touchedPreferredCountry = getIn(
                    formik.touched,
                    preferredCountry
                  );
                  const errorPreferredCountry = getIn(
                    formik.errors,
                    preferredCountry
                  );
                  const touchedintEduLevel = getIn(
                    formik.touched,
                    intEduLevel
                  );
                  const errorintEduLevel = getIn(
                    formik.errors,
                    intEduLevel
                  );
                  return (
                    <div key={index} className={classes.innerDiv}>
                      <TextField
                        label="Requested Course"
                        name={requestedCourse}
                        value={p.requestedCourse}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        helperText={
                          touchedRequestedCourse && errorRequestedCourse
                            ? errorRequestedCourse
                            : ""
                        }
                        error={Boolean(
                          touchedRequestedCourse && errorRequestedCourse
                        )}
                      />
                      <FormControl className={classes.formControlSelect}>
                        <InputLabel id="demo-simple-select-label">
                          Level Of Education
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          name={intEduLevel}
                          value={p.intEduLevel}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          
                        >
                          <MenuItem value={"secSchool"}>
                            Secondary School
                          </MenuItem>
                          <MenuItem value={"higherSecondary"}>
                            Higher Secondary School
                          </MenuItem>
                          <MenuItem value={"1ydiploma"}>
                            1 Year Diploma
                          </MenuItem>
                          <MenuItem value={"2ydiploma"}>
                            2 Year Diploma
                          </MenuItem>
                          <MenuItem value={"3ydiploma"}>
                            3 Year Diploma
                          </MenuItem>
                          <MenuItem value={"bachelor"}>Bachelor</MenuItem>
                          <MenuItem value={"master"}>Master</MenuItem>
                          <MenuItem value={"phd"}>PhD</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        label="Preferred Country"
                        name={preferredCountry}
                        value={p.preferredCountry}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        helperText={
                          touchedPreferredCountry && errorPreferredCountry
                            ? errorPreferredCountry
                            : ""
                        }
                        error={Boolean(
                          touchedPreferredCountry && errorPreferredCountry
                        )}
                      />

                      {formik.values.requestedCourseDetails.length !== 1 ? (
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
                  );
                })
              : ""}
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                push({ requestedCourse: "", preferredCountry: "",intEduLevel:"" })
              }
              className={classes.addButton}
            >
              Add Course
            </Button>
          </div>
        )}
      </FieldArray>
    </div>
  );
}
