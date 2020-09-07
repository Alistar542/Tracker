import "date-fns";
import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import clsx from "clsx";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import axios from "axios";
import SuccessDialog from "../../Dialogs/SuccessDialog";
import FailDialog from "../../Dialogs/FailDialog";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useLocation } from "react-router";
import { FollowUpComponent } from "./FollowUpComponent";
import { Formik } from "formik";
import * as Yup from "yup";
import { PersonalInformationComponent } from "./PersonalInformationComponent";
import { EnglishExamTypeComponent } from "./EnglishExamTypeComponent";
import { green, indigo, red } from "@material-ui/core/colors";
import { STATUS } from "../../../constants";
import { updateStudent, saveStudent } from "../../../actions/studentactions";
import { AuthContext } from "../../LoginScreen/context/auth";
import SnackbarCommon from "../../Common/SnackbarCommon";
import ToDoPopupComponent from "./Popups/ToDoPopupComponent";
import { ToDoComponent } from "./ToDoComponent";
import BlockRoundedIcon from "@material-ui/icons/BlockRounded";
import UndoRoundedIcon from "@material-ui/icons/UndoRounded";
import AreasOfInterestComponent from "./AreasOfInterestComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  rootDiv: {
    margin: theme.spacing(3),
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
    height: `calc(100vh - 335px)`,
    overflow: "auto",
  },
  formDiv: {
    margin: 0,
    //marginBottom: theme.spacing(8),
  },
  personalInfoDiv: {
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  formControlSelect: {
    margin: theme.spacing(1),
    width: 200,
  },
  appBar: {
    //top: "auto",
    //bottom: 0,
    background: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: theme.spacing(1),
    "& .MuiButton-root": {
      margin: theme.spacing(1),
    },
    //width: `calc(100% - ${theme.spacing(7) + 1}px)`,
    width: "100%",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  rejectButton: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
  acceptButton: {
    backgroundColor: green[600],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  doneButton: {
    backgroundColor: green[600],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  proposedButton: {
    backgroundColor: indigo[600],
    "&:hover": {
      backgroundColor: indigo[700],
    },
  },
}));

export const ProspectusComponent = (props) => {
  let locationFound = useLocation();
  let { studentFound } = locationFound.state ? locationFound.state : {};
  const classes = useStyles();
  const [dialogState, setDialogState] = React.useState(false);
  const [successOrFail, setSuccessOrFail] = React.useState(false);
  const [openFollowUpPopup, setOpenFollowUpPopup] = React.useState(false);
  const [openToDoPopup, setOpenToDoPopup] = React.useState(false);
  const [backDropState, setBackDropState] = React.useState(false);
  const [followUpRemarks, setFollowUpRemarks] = React.useState(
    studentFound ? studentFound.followUpRemarks : null
  );
  const [toDoRemarks, setToDoRemarks] = React.useState(
    studentFound ? studentFound.toDoRemarks : null
  );
  const [errorData, setErrorData] = React.useState({});
  const countries = props.countries;
  const [status, setStatus] = React.useState(
    studentFound ? studentFound.status : STATUS.NEW
  );
  let isActionsDisabled = typeof studentFound === "undefined";
  const [openReject, setOpenReject] = React.useState(false);
  const { currentUser } = useContext(AuthContext);

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    additionalPhNo: "",
    dateOfBirth: null,
    gender: "",
    maritalStatus: "",
    followUpDate: null,
    englishExamType: "",
    examDate: null,
    overall: "",
    listening: "",
    reading: "",
    writing: "",
    speaking: "",
    countryOfEducation: "",
    highestLevelOfEducation: "",
    gradingScheme: "",
    gradeAverage: "",
    graduatedYear: null,
    companyName: "",
    position: "",
    endDate: null,
    startDate: null,
    workAddress: "",
    requestedCourseDetails: [{ requestedCourse: "", preferredCountry: "" }],
    dateOfRequest: new Date(),
    source: "",
    wayOfContact: "",
    counselor: "",
    priority: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .matches(/^[A-Za-z]+$/, {
        message: "Only alphabetic characters allowed",
      })
      .required("Required"),
    middleName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .matches(/^[A-Za-z]+$/, {
        message: "Only alphabetic characters allowed",
      }),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .matches(/^[A-Za-z]+$/, {
        message: "Only alphabetic characters allowed",
      })
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]*$/, { message: "Must be a number" })
      .required("Required"),
  });

  const [formData, setFormData] = React.useState(
    studentFound ? studentFound : initialValues
  );

  const [submitted, setSubmitted] = React.useState(false);
  const [snackbarMessage, setSnackBarMessage] = React.useState("");
  const [snackbarOpenState, setSnackbarOpenState] = React.useState(false);

  const handleStatusChange = () => {
    let studentToBeUpdated = { ...formData };
    if (formData.status === STATUS.NEW) {
      studentToBeUpdated.status = STATUS.PROPOSED;
      studentToBeUpdated.remarks = "Status Changed to Proposed";
    }
    // else if (formData.status === STATUS.PROPOSED) {
    //   studentToBeUpdated.status = STATUS.DONE;
    //   studentToBeUpdated.remarks = "Status Changed to Done";
    // } else if (formData.status === STATUS.DONE) {
    //   setSnackBarMessage("Already Marked as Done");
    //   setSnackbarOpenState(true);
    //   return;
    // }
    setBackDropState(true);
    updateStudent(studentToBeUpdated, currentUser)
      .then((res) => {
        setFormData((previousStudentData) => ({
          ...previousStudentData,
          status: studentToBeUpdated.status,
        }));
        props.updateStudentFoundForSummary(studentToBeUpdated);
        setBackDropState(false);
        return res;
      })
      .catch((err) => {
        setBackDropState(false);
        return err;
      });
  };

  const onFinalSubmit = (values, setSubmitting, resetForm) => {
    setBackDropState(true);
    setSubmitting(true);
    const userObject = {
      studentId: studentFound && studentFound.studentId,
      firstName: values.firstName,
      middleName: values.middleName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      additionalPhNo: values.additionalPhNo,
      dateOfBirth: values.dateOfBirth ? new Date(values.dateOfBirth) : null,
      gender: values.gender,
      maritalStatus: values.maritalStatus,
      followUpDate: values.followUpDate ? values.followUpDate : null,
      englishExamType: values.englishExamType,
      examDate: values.examDate ? new Date(values.examDate) : null,
      overall: values.overall,
      listening: values.listening,
      reading: values.reading,
      writing: values.writing,
      speaking: values.speaking,
      countryOfEducation: values.countryOfEducation,
      highestLevelOfEducation: values.highestLevelOfEducation,
      gradingScheme: values.gradingScheme,
      gradeAverage: values.gradeAverage,
      graduatedYear: values.graduatedYear
        ? new Date(values.graduatedYear)
        : null,
      companyName: values.companyName,
      position: values.position,
      endDate: values.endDate ? new Date(values.endDate) : null,
      startDate: values.startDate ? new Date(values.startDate) : null,
      workAddress: values.workAddress,
      requestedCourseDetails: values.requestedCourseDetails,
      preferredCountry: values.preferredCountry,
      dateOfRequest: values.dateOfRequest
        ? new Date(values.dateOfRequest)
        : null,
      source: values.source,
      wayOfContact: values.wayOfContact,
      counselor: values.counselor,
      priority: values.priority,
      lastUpdateUser: "",
      followUpRemarks: followUpRemarks,
      status: status,
    };

    if (typeof studentFound === "undefined") {
      console.log("add");
      saveStudent(userObject, currentUser)
        .then((res) => {
          console.log(res.data);
          setDialogState(true);
          setSuccessOrFail(true);
          setSubmitted(true);
          setSubmitting(false);
          setBackDropState(false);
          resetForm(initialValues);
          setFollowUpRemarks(null);
          setToDoRemarks(null);
          resetValues();
        })
        .catch((err) => {
          setDialogState(true);
          setSuccessOrFail(false);
          setBackDropState(false);
          setSubmitting(false);
        });
    } else {
      console.log("update");
      updateStudent(userObject, currentUser)
        .then((res) => {
          console.log(userObject);
          console.log("success in client side");
          setDialogState(true);
          setSuccessOrFail(true);
          setSubmitted(true);
          setSubmitting(true);
          setBackDropState(false);
        })
        .catch((err) => {
          console.log("failed in client side");
          setDialogState(true);
          setSuccessOrFail(false);
          setBackDropState(false);
          setSubmitting(true);
        });
    }
  };

  const resetValues = () => {
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      additionalPhNo: "",
      gender: "",
      maritalStatus: "",
      englishExamType: "",
      overall: "",
      listening: "",
      reading: "",
      writing: "",
      speaking: "",
      countryOfEducation: "",
      highestLevelOfEducation: "",
      gradingScheme: "",
      gradeAverage: "",
      companyName: "",
      position: "",
      workAddress: "",
      requestedCourseDetails: [{ requestedCourse: "", preferredCountry: "" }],
      preferredCountry: "",
      source: "",
      wayOfContact: "",
      counselor: "",
      priority: "",
    });
    setFollowUpRemarks(null);
    setToDoRemarks(null);
  };

  const openFollowUpPopupFn = (event) => {
    event.preventDefault();
    setOpenFollowUpPopup(true);
  };

  const closeFollowUpPopupFn = (event) => {
    setOpenFollowUpPopup(false);
  };

  const openToDoPopupFn = (event) => {
    event.preventDefault();
    setOpenToDoPopup(true);
  };

  const closeToDoPopupFn = (event) => {
    setOpenToDoPopup(false);
  };

  const handleRejectStatus = () => {
    setOpenReject(true);
  };

  const handleRejectClose = (event) => {
    setOpenReject(false);
    if (event.target.innerHTML === "Yes") {
      setBackDropState(true);
      setStatus(STATUS.REJECTED);
      let studentObjectToBeUpdated = { ...studentFound };
      studentObjectToBeUpdated.status = STATUS.REJECTED;
      studentObjectToBeUpdated.remarks = "Status changed to Rejected";
      updateStudent(studentObjectToBeUpdated, currentUser)
        .then((res) => {
          setFormData((previousStudent) => ({
            ...previousStudent,
            status: STATUS.REJECTED,
          }));
          setBackDropState(false);
          return res;
        })
        .catch((err) => {
          setBackDropState(false);
          return err;
        });
    }
  };

  const handleSubmitFollowUp = (event) => {
    event.preventDefault();
    setOpenFollowUpPopup(false);
    let remarksCopy = followUpRemarks ? followUpRemarks : [];
    remarksCopy.push(event.target.followupremarks.value);
    setFollowUpRemarks(remarksCopy);
  };

  const handleSubmitToDo = (remarks) => {
    setOpenToDoPopup(false);
    let remarksCopy = toDoRemarks ? toDoRemarks : [];
    remarksCopy.push(remarks);
    setToDoRemarks(remarksCopy);
  };

  const snackbarClose = () => {
    setSnackBarMessage("");
    setSnackbarOpenState(false);
  };

  return (
    <div>
      <Formik
        initialValues={studentFound ? studentFound : initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onFinalSubmit(values, setSubmitting, resetForm);
        }}
        validateOnBlur={false}
      >
        {(formik) => (
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <div id="rootDiv" className={classes.rootDiv}>
              <div id="formDiv" className={classes.formDiv}>
                <PersonalInformationComponent {...formik} />
                <br></br>
                <Divider />
                <br></br>
                <EnglishExamTypeComponent formik={formik} />
                <br></br>
                <br></br>
                <Divider />
                <br></br>
                <Typography component="h6" variant="h6">
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
                      {countries.map((country) => {
                        return (
                          <MenuItem value={country.name}>
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
                      <MenuItem value={"higherSecondary"}>
                        Higher Secondary
                      </MenuItem>
                      <MenuItem value={"diploma"}>Diploma</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl className={classes.formControlSelect}>
                    <InputLabel id="demo-simple-select-label">
                      Grading Scheme
                    </InputLabel>
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
                      onChange={(value) =>
                        formik.setFieldValue("graduatedYear", value)
                      }
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <br></br>
                <br></br>
                <Divider />
                <br></br>
                <Typography component="h6" variant="h6">
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
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="endDate"
                      name="endDate"
                      label="End Date"
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      value={formik.values.endDate}
                      onChange={(value) =>
                        formik.setFieldValue("endDate", value)
                      }
                    />
                  </MuiPickersUtilsProvider>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="startDate"
                      name="startDate"
                      label="Start Date"
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      value={formik.values.startDate}
                      onChange={(value) =>
                        formik.setFieldValue("startDate", value)
                      }
                    />
                  </MuiPickersUtilsProvider>

                  <TextField
                    id="workAddress"
                    label="Address"
                    name="workAddress"
                    {...formik.getFieldProps("workAddress")}
                  />
                </div>
                <br></br>
                <br></br>
                <Divider />
                <br></br>
                <AreasOfInterestComponent
                  formik={formik}
                  countries={countries}
                />
                <br></br>
                <br></br>
                <Divider />
                <br></br>

                <Typography component="h6" variant="h6">
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
                      onChange={(value) =>
                        formik.setFieldValue("dateOfRequest", value)
                      }
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
                    <InputLabel id="demo-simple-select-label">
                      Priority
                    </InputLabel>
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
                <br></br>
                <br></br>
                <Divider />
                <br></br>
                <FollowUpComponent followUpRemarks={followUpRemarks} />
                <br></br>
                <br></br>
                <Divider />
                <br></br>
                <ToDoComponent toDoRemarks={toDoRemarks} />
                {successOrFail ? (
                  <SuccessDialog
                    dialogState={dialogState}
                    setDialogStateFn={setDialogState}
                  />
                ) : (
                  <FailDialog
                    dialogState={dialogState}
                    setDialogStateFn={setDialogState}
                  />
                )}
              </div>
            </div>
            {/* <Toolbar position="fixed" className={classes.appBar}> */}
            <div className={classes.appBar}>
              <Button
                className={clsx(classes.rejectButton, {
                  [classes.acceptButton]: formData.status === STATUS.REJECTED,
                })}
                variant="contained"
                color="primary"
                onClick={handleRejectStatus}
                disabled={isActionsDisabled}
                startIcon={
                  status === STATUS.REJECTED ? (
                    <UndoRoundedIcon />
                  ) : (
                    <BlockRoundedIcon />
                  )
                }
              >
                {status === STATUS.REJECTED ? " Accept " : " Reject "}
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={clsx(classes.doneButton, {
                  [classes.proposedButton]: formData.status === STATUS.NEW,
                })}
                onClick={handleStatusChange}
                disabled={
                  isActionsDisabled ||
                  status === STATUS.PROPOSED ||
                  status === STATUS.DONE ||
                  status === STATUS.REJECTED
                }
              >
                {" Mark As Proposed "}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={openToDoPopupFn}
                disabled={isActionsDisabled || status === STATUS.REJECTED}
              >
                {" "}
                To Do{" "}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={openFollowUpPopupFn}
                disabled={isActionsDisabled || status === STATUS.REJECTED}
              >
                {" "}
                Follow Up{" "}
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={status === STATUS.REJECTED}
              >
                {typeof studentFound === "undefined" ? " SAVE " : " UPDATE "}
              </Button>
              {/* </Toolbar> */}
            </div>
          </form>
        )}
      </Formik>
      <ToDoPopupComponent
        openToDoPopup={openToDoPopup}
        handleToDoClose={closeToDoPopupFn}
        handleSubmitToDo={handleSubmitToDo}
      />
      <Dialog
        open={openFollowUpPopup}
        onClose={closeFollowUpPopupFn}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Follow Up</DialogTitle>
        <form id="followUpForm" onSubmit={handleSubmitFollowUp}>
          <DialogContent>
            <DialogContentText>
              Please enter the follow up details
            </DialogContentText>
            <TextField
              required
              autoFocus
              margin="dense"
              id="followupremarks"
              label="Remarks"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeFollowUpPopupFn} color="primary">
              Cancel
            </Button>
            <Button id="submitFollowUp" type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={openReject}
        onClose={handleRejectClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to reject this application ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to reject this application ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRejectClose} name="no" color="primary">
            No
          </Button>
          <Button
            onClick={handleRejectClose}
            name="yes"
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop className={classes.backdrop} open={backDropState}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <SnackbarCommon
        message={snackbarMessage}
        handleClose={snackbarClose}
        openState={snackbarOpenState}
      />
    </div>
  );
};
