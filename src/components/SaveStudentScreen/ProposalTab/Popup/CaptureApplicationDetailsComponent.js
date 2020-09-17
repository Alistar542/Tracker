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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { red } from "@material-ui/core/colors";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import AlertDialog from "../../../Common/AlertDialog";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {},
  formDiv: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  innerDiv: {},
  radioComponent: {
    "& .MuiFormLabel-root": {
      marginLeft: theme.spacing(2),
    },
    marginTop: theme.spacing(1),
  },
  deleteButton: {
    color: "white",
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
}));

const initialValues = {
  applnId: "",
  appldUnvsty: "",
  appldCourse: "",
  appldCourseTyp: "",
  appldDate: null,
  offrLtrStatus: "",
  offrLtrDate: null,
  visaLtrStatus: "",
  visaLtrDate: null,
  feesPaid: "",
  courseStrtDate: null,
  stdUsrName: "",
  stdPwd: "",
  applStatus: "",
};

const validationSchema = Yup.object().shape({
  appldUnvsty: Yup.string().required("Required"),
  appldCourse: Yup.string().required("Required"),
  appldCourseTyp: Yup.string().required("Required"),
  offrLtrStatus: Yup.string().required("Required"),
});

export default function CaptureApplicationDetailsComponent(props) {
  const classes = useStyles();
  const {
    openApplicationDtlPopup,
    handleCloseApplicationDtlPopup,
    submitApplicationDtls,
    application,
    deleteApplication,
  } = props;
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);

  const handleClose = (value) => {
    handleCloseApplicationDtlPopup(value);
  };

  const openAlertDialog = () => {
    setShowAlertDialog(true);
  };

  const closeAlertDialog = (openDialog, submitValue) => {
    setShowAlertDialog(openDialog);
    if (submitValue) {
      deleteApplication();
    }
  };
  const isUpdate = application ? true : false;

  return (
    <div className={classes.root}>
      <Dialog
        open={openApplicationDtlPopup}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">
          Capture Application Details
        </DialogTitle>

        <Formik
          initialValues={application ? application : initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            submitApplicationDtls(values, setSubmitting);
            resetForm();
          }}
          validateOnBlur={false}
          enableReinitialize={true}
        >
          {(formik) => (
            <form
              autoComplete="off"
              onSubmit={formik.handleSubmit}
              className={classes.formDiv}
            >
              <DialogContent className={classes.innerDiv}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="applnId"
                  label="Application Id"
                  size="small"
                  name="applnId"
                  error={formik.errors.applnId && formik.touched.applnId}
                  helperText={
                    formik.errors.applnId &&
                    formik.touched.applnId &&
                    formik.errors.applnId
                  }
                  {...formik.getFieldProps("applnId")}
                />
                <TextField
                  margin="dense"
                  id="appldUnvsty"
                  label="Applied University"
                  size="small"
                  name="appldUnvsty"
                  error={
                    formik.errors.appldUnvsty && formik.touched.appldUnvsty
                  }
                  helperText={
                    formik.errors.appldUnvsty &&
                    formik.touched.appldUnvsty &&
                    formik.errors.appldUnvsty
                  }
                  {...formik.getFieldProps("appldUnvsty")}
                />
                <TextField
                  margin="dense"
                  id="appldCourse"
                  label="Applied Course"
                  size="small"
                  name="appldCourse"
                  error={
                    formik.errors.appldCourse && formik.touched.appldCourse
                  }
                  helperText={
                    formik.errors.appldCourse &&
                    formik.touched.appldCourse &&
                    formik.errors.appldCourse
                  }
                  {...formik.getFieldProps("appldCourse")}
                />
                <FormControl
                  component="fieldset"
                  error={Boolean(
                    formik.errors.appldCourseTyp &&
                      formik.touched.appldCourseTyp
                  )}
                  className={classes.radioComponent}
                >
                  <FormLabel>Applied Course Type</FormLabel>
                  <RadioGroup
                    row
                    aria-label="appldCourseTyp"
                    name="appldCourseTyp"
                    {...formik.getFieldProps("appldCourseTyp")}
                  >
                    <FormControlLabel
                      value="M"
                      labelPlacement="start"
                      control={<Radio color="primary" />}
                      label="Major"
                    />
                    <FormControlLabel
                      value="D"
                      labelPlacement="start"
                      control={<Radio color="primary" />}
                      label="Degree"
                    />
                  </RadioGroup>
                  <FormHelperText>
                    {formik.errors.appldCourseTyp &&
                      formik.touched.appldCourseTyp &&
                      formik.errors.appldCourseTyp}
                  </FormHelperText>
                </FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    openTo="year"
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="dense"
                    id="appldDate"
                    name="appldDate"
                    label="Application Date"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    value={formik.values.appldDate}
                    onChange={(value) =>
                      formik.setFieldValue("appldDate", value)
                    }
                  />
                </MuiPickersUtilsProvider>
                <FormControl
                  component="fieldset"
                  error={Boolean(
                    formik.errors.offrLtrStatus && formik.touched.offrLtrStatus
                  )}
                  className={classes.radioComponent}
                >
                  <FormLabel>Offer Letter Status</FormLabel>
                  <RadioGroup
                    row
                    aria-label="offrLtrStatus"
                    name="offrLtrStatus"
                    {...formik.getFieldProps("offrLtrStatus")}
                  >
                    <FormControlLabel
                      value="Y"
                      labelPlacement="start"
                      control={<Radio color="primary" />}
                      label="Received"
                    />
                    <FormControlLabel
                      value="N"
                      labelPlacement="start"
                      control={<Radio color="primary" />}
                      label="Not Received"
                    />
                  </RadioGroup>
                  <FormHelperText>
                    {formik.errors.offrLtrStatus &&
                      formik.touched.offrLtrStatus &&
                      formik.errors.offrLtrStatus}
                  </FormHelperText>
                </FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    openTo="year"
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="dense"
                    id="offrLtrDate"
                    name="offrLtrDate"
                    label="Offer Letter Rcvd Date"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    value={formik.values.offrLtrDate}
                    onChange={(value) =>
                      formik.setFieldValue("offrLtrDate", value)
                    }
                  />
                </MuiPickersUtilsProvider>
                <FormControl
                  component="fieldset"
                  className={classes.radioComponent}
                >
                  <FormLabel component="legend">Visa Letter Status</FormLabel>
                  <RadioGroup
                    row
                    aria-label="visaLtrStatus"
                    name="visaLtrStatus"
                    {...formik.getFieldProps("visaLtrStatus")}
                  >
                    <FormControlLabel
                      value="Y"
                      labelPlacement="start"
                      control={<Radio color="primary" />}
                      label="Received"
                    />
                    <FormControlLabel
                      value="N"
                      labelPlacement="start"
                      control={<Radio color="primary" />}
                      label="Not Received"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl
                  component="fieldset"
                  className={classes.radioComponent}
                >
                  <FormLabel component="legend">Tution Fees</FormLabel>
                  <RadioGroup
                    row
                    aria-label="feesPaid"
                    name="feesPaid"
                    {...formik.getFieldProps("feesPaid")}
                  >
                    <FormControlLabel
                      value="Y"
                      labelPlacement="start"
                      control={<Radio color="primary" />}
                      label="Paid"
                    />
                    <FormControlLabel
                      value="N"
                      labelPlacement="start"
                      control={<Radio color="primary" />}
                      label="Un Paid"
                    />
                  </RadioGroup>
                </FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    openTo="year"
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="dense"
                    id="courseStrtDate"
                    name="courseStrtDate"
                    label="Course Starting Date"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    value={formik.values.courseStrtDate}
                    onChange={(value) =>
                      formik.setFieldValue("courseStrtDate", value)
                    }
                  />
                </MuiPickersUtilsProvider>
                <TextField
                  margin="dense"
                  id="stdUsrName"
                  name="stdUsrName"
                  label="Student Username"
                  size="small"
                  {...formik.getFieldProps("stdUsrName")}
                />
                <TextField
                  margin="dense"
                  id="stdPwd"
                  name="stdPwd"
                  label="Student Password"
                  size="small"
                  {...formik.getFieldProps("stdPwd")}
                />
                <FormControl
                  component="fieldset"
                  className={classes.radioComponent}
                >
                  <FormLabel component="legend">Status</FormLabel>
                  <RadioGroup
                    row
                    aria-label="applStatus"
                    name="applStatus"
                    {...formik.getFieldProps("applStatus")}
                  >
                    <FormControlLabel
                      value="Y"
                      labelPlacement="start"
                      control={<Radio color="primary" />}
                      label="Continue"
                    />
                    <FormControlLabel
                      value="N"
                      labelPlacement="start"
                      control={<Radio color="primary" />}
                      label="Cancelled"
                    />
                  </RadioGroup>
                </FormControl>
              </DialogContent>
              <Divider />
              <DialogActions>
                <Button onClick={() => handleClose(false)} color="primary">
                  Cancel
                </Button>
                {isUpdate ? (
                  <Button
                    variant="contained"
                    className={classes.deleteButton}
                    onClick={() => openAlertDialog(true)}
                    startIcon={<DeleteRoundedIcon />}
                  >
                    Delete
                  </Button>
                ) : (
                  ""
                )}

                <Button variant="contained" color="primary" type="submit">
                  {isUpdate ? "Update" : "Save"}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
      <AlertDialog
        openDialog={showAlertDialog}
        dialogTitleText={"Are you sure to delete ?"}
        handleCloseDialog={closeAlertDialog}
      />
    </div>
  );
}
