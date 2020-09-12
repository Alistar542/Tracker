import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  radioComponent: {
    marginLeft: theme.spacing(2),
  },
}));

const initialValues = {
  applnId: "",
  appldUnvsty: "",
  appldCourse: "",
  appldCourseTyp: false,
  appldDate: null,
  offrLtrStatus: false,
  offrLtrDate: null,
  visaLtrStatus: false,
  visaLtrDate: null,
  feesPaid: false,
  courseStrtDate: null,
  stdUsrName: "",
  stdPwd: "",
  applStatus: false,
};

const validationSchema = Yup.object().shape({});

export default function CaptureApplicationDetailsComponent(props) {
  const classes = useStyles();
  const {
    openApplicationDtlPopup,
    handleCloseApplicationDtlPopup,
    submitApplicationDtls,
  } = props;
  return (
    <div className={classes.root}>
      <Dialog
        open={openApplicationDtlPopup}
        onClose={() => handleCloseApplicationDtlPopup(false)}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">
          Capture Application Details
        </DialogTitle>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            submitApplicationDtls(values, setSubmitting, resetForm);
          }}
          validateOnBlur={false}
        >
          {(formik) => (
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="applnId"
                  label="Application Id"
                  size="small"
                  name="applnId"
                  {...formik.getFieldProps("applnId")}
                />
                <TextField
                  margin="dense"
                  id="appldUnvsty"
                  label="Applied University"
                  size="small"
                  name="appldUnvsty"
                  {...formik.getFieldProps("appldUnvsty")}
                />
                <TextField
                  margin="dense"
                  id="appldCourse"
                  label="Applied Course"
                  size="small"
                  name="appldCourse"
                  {...formik.getFieldProps("appldCourse")}
                />
                <FormControlLabel
                  value="appliedMajor"
                  control={<Switch color="primary" />}
                  label="Applied Major"
                  labelPlacement="top"
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    openTo="year"
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="dense"
                    id="applicationDate"
                    name="applicationDate"
                    label="Application Date"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
                <FormControlLabel
                  value="top"
                  control={<Switch color="primary" />}
                  label="Offer Letter Status"
                  labelPlacement="top"
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    openTo="year"
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="dense"
                    id="applicationDate"
                    name="applicationDate"
                    label="Offer Letter Received Date"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
                <FormControlLabel
                  value="top"
                  control={<Switch color="primary" />}
                  label="Visa Letter Status"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="top"
                  control={<Switch color="primary" />}
                  label="Tution Fees Paid"
                  labelPlacement="top"
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    openTo="year"
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="dense"
                    id="applicationDate"
                    name="applicationDate"
                    label="Course Starting Date"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
                <TextField
                  margin="dense"
                  id="name"
                  label="Student Username"
                  size="small"
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="Student Password"
                  size="small"
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => handleCloseApplicationDtlPopup(false)}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Save
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
