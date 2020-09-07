import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { FieldArray, getIn } from "formik";

const useStyles = makeStyles((theme) => ({
  areasOfInterestDiv: {
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  innerDiv: {
    display: "flex",
    flexDirection: "row",
    marginBottom: theme.spacing(1),
  },
  formControlSelect: {
    margin: theme.spacing(1),
    width: 200,
  },
  addButton: {
    width: "100px",
    marginLeft: theme.spacing(1),
    backgroundColor: "#fff",
  },
  removeButton: {
    margin: theme.spacing(1),
  },
}));

export default function AreasOfInterestComponent(props) {
  const classes = useStyles();
  const { countries, formik } = props;

  return (
    <Fragment>
      <Typography component="h6" variant="h6">
        Areas of Interest
      </Typography>
      <FieldArray name="requestedCourseDetails">
        {({ push, remove }) => (
          <div className={classes.areasOfInterestDiv}>
            {formik.values.requestedCourseDetails &&
            formik.values.requestedCourseDetails.length > 0
              ? formik.values.requestedCourseDetails.map((p, index) => {
                  const requestedCourse = `requestedCourseDetails[${index}].requestedCourse`;
                  const preferredCountry = `requestedCourseDetails[${index}].preferredCountry`;
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
                          Preferred Country
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
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
                        >
                          {countries.map((country) => {
                            return (
                              <MenuItem value={country.name}>
                                {country.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
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
              type="button"
              variant="outlined"
              onClick={() =>
                push({ requestedCourse: "", preferredCountry: "" })
              }
              className={classes.addButton}
            >
              Add
            </Button>
          </div>
        )}
      </FieldArray>
    </Fragment>
  );
}
