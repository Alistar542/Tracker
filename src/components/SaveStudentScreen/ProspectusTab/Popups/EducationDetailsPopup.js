import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DateFnsUtils from "@date-io/date-fns";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Formik } from "formik";
import * as Yup from "yup";

const initialValues = {
  educationLevel: "",
  institutionCountry: "",
  institutionName: "",
  primaryLanguage: "",
  attendedFromDate: null,
  attendedToDate: null,
  degreeAwarded: "",
  degreeAwardedOn: null,
  address: "",
  city: "",
  province: "",
  zipCode: "",
};

const validationSchema = Yup.object().shape({
  institutionName: Yup.string().required("Required"),
  educationLevel: Yup.string().required("Required"),
  institutionCountry: Yup.string().required("Required"),
});

const useStyles = makeStyles((theme) => ({
  personalInfoDiv: {
    margin: theme.spacing(0, 1),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    "& .MuiTextField-root": {
      margin: theme.spacing(1, 1),
      width: 200,
    },
    "& .MuiIconButton-root": {
      marginRight: -theme.spacing(2),
    },
  },
}));

export default function EducationDetailsPopup(props) {
  const {
    openEducationDtlPopup,
    handleOpenEducationDtl,
    handleSubmitEducationDtl,
    currentEducationDtl,
  } = props;
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={openEducationDtlPopup}
        onClose={handleOpenEducationDtl}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">Education Details</DialogTitle>
        <Formik
          initialValues={
            currentEducationDtl ? currentEducationDtl : initialValues
          }
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmitEducationDtl(values);
            resetForm();
          }}
          validateOnBlur={false}
          enableReinitialize={true}
        >
          {(formik) => (
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <DialogContent>
                <div className={classes.personalInfoDiv}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    id="educationLevel"
                    label="Education Level"
                    name="educationLevel"
                    type="text"
                    error={
                      formik.errors.educationLevel &&
                      formik.touched.educationLevel
                    }
                    helperText={
                      formik.errors.educationLevel &&
                      formik.touched.educationLevel &&
                      formik.errors.educationLevel
                    }
                    {...formik.getFieldProps("educationLevel")}
                  />
                  <TextField
                    margin="dense"
                    variant="outlined"
                    id="institutionCountry"
                    name="institutionCountry"
                    label="Country Of Institution"
                    type="text"
                    error={
                      formik.errors.institutionCountry &&
                      formik.touched.institutionCountry
                    }
                    helperText={
                      formik.errors.institutionCountry &&
                      formik.touched.institutionCountry &&
                      formik.errors.institutionCountry
                    }
                    {...formik.getFieldProps("institutionCountry")}
                  />
                  <TextField
                    margin="dense"
                    variant="outlined"
                    id="institutionName"
                    name="institutionName"
                    label="Name Of Institution"
                    type="text"
                    error={
                      formik.errors.institutionName &&
                      formik.touched.institutionName
                    }
                    helperText={
                      formik.errors.institutionName &&
                      formik.touched.institutionName &&
                      formik.errors.institutionName
                    }
                    {...formik.getFieldProps("institutionName")}
                  />
                  <TextField
                    margin="dense"
                    variant="outlined"
                    id="primaryLanguage"
                    name="primaryLanguage"
                    label="Primary Language"
                    type="text"
                    {...formik.getFieldProps("primaryLanguage")}
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      openTo="year"
                      variant="inline"
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      margin="dense"
                      id="attendedFromDate"
                      name="attendedFromDate"
                      label="Attended From Date"
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      value={formik.values.attendedFromDate}
                      onChange={(value) =>
                        formik.setFieldValue("attendedFromDate", value)
                      }
                    />
                  </MuiPickersUtilsProvider>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      openTo="year"
                      variant="inline"
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      margin="dense"
                      id="attendedToDate"
                      name="attendedToDate"
                      label="Attended To Date"
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      value={formik.values.attendedToDate}
                      onChange={(value) =>
                        formik.setFieldValue("attendedToDate", value)
                      }
                    />
                  </MuiPickersUtilsProvider>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    id="degreeAwarded"
                    name="degreeAwarded"
                    label="Degree Awarded"
                    type="text"
                    {...formik.getFieldProps("degreeAwarded")}
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      openTo="year"
                      variant="inline"
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      margin="dense"
                      id="degreeAwardedOn"
                      name="degreeAwardedOn"
                      label="Degree Awarded On"
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      value={formik.values.degreeAwardedOn}
                      onChange={(value) =>
                        formik.setFieldValue("degreeAwardedOn", value)
                      }
                    />
                  </MuiPickersUtilsProvider>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    id="address"
                    name="address"
                    label="Address"
                    type="text"
                    {...formik.getFieldProps("address")}
                  />
                  <TextField
                    margin="dense"
                    variant="outlined"
                    id="city"
                    name="city"
                    label="City"
                    type="text"
                    {...formik.getFieldProps("city")}
                  />
                  <TextField
                    margin="dense"
                    variant="outlined"
                    id="province"
                    name="province"
                    label="Province"
                    type="text"
                    {...formik.getFieldProps("province")}
                  />
                  <TextField
                    margin="dense"
                    variant="outlined"
                    id="zipCode"
                    name="zipCode"
                    label="Zip Code"
                    type="text"
                    {...formik.getFieldProps("zipCode")}
                  />
                </div>
              </DialogContent>

              <DialogActions>
                <Button color="primary" onClick={handleOpenEducationDtl}>
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Ok
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
