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
import { Formik } from "formik";
import * as Yup from "yup";
import { PersonalInformationComponent } from "./PersonalInformationComponent";
import { EnglishExamTypeComponent } from "./EnglishExamTypeComponent";
import { green, indigo, red } from "@material-ui/core/colors";
import {
  STATUS,
  OPERATION_FLAG,
  APPLCTN_STS_ARRY_PROSPECTUS,
} from "../../../constants";
import {
  updateStudent,
  saveStudent,
  updateStatusOfStudent,
} from "../../../actions/studentactions";
import { AuthContext } from "../../LoginScreen/context/auth";
import SnackbarCommon from "../../Common/SnackbarCommon";
import ToDoPopupComponent from "../Popups/ToDoPopupComponent";
import BlockRoundedIcon from "@material-ui/icons/BlockRounded";
import UndoRoundedIcon from "@material-ui/icons/UndoRounded";
import AreasOfInterestComponent from "./AreasOfInterestComponent";
import MarketingPurposeComponent from "./MarketingPurposeComponent";
import EducationSummaryComponent from "./EducationSummaryComponent";
import WorkExperienceComponent from "./WorkExperienceComponent";
import FollowUpPopupComponent from "../Popups/FollowUpPopupComponent";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";
import DetailsPanelComponent from "./DetailsPanelComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  rootDiv: {
    "& .MuiTextField-root": {
      margin: theme.spacing(0, 1),
      width: 200,
    },
    "& .MuiFormLabel-root": {
      fontSize: "0.9rem",
    },
    height: `calc(100vh - 250px)`,
    overflow: "auto",
  },
  formDiv: {
    margin: theme.spacing(1),
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
    margin: theme.spacing(0, 1),
    width: 200,
  },
  appBar: {
    //top: "auto",
    //bottom: 0,
    background: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    "& .MuiButton-root": {
      margin: theme.spacing(1),
    },
    //width: `calc(100% - ${theme.spacing(7) + 1}px)`,
    minHeight: "53px",
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
  //let locationFound = useLocation();
  //let { studentFound } = locationFound.state ? locationFound.state : {};
  let { studentFound, updateStudentFoundForSummary } = props;
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
    operationFlag: OPERATION_FLAG.INSERT,
    proposalInfo: null,
    enrolledInfo: null,
  };

  const validationSchema = Yup.object().shape({
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
    requestedCourseDetails: Yup.array().of(
      Yup.object().shape({
        requestedCourse: Yup.string().required("Requested Course is required"),
        preferredCountry: Yup.string().required(
          "Preferred Country is required"
        ),
      })
    ),
  });

  const [formData, setFormData] = React.useState(
    studentFound ? studentFound : initialValues
  );

  const [submitted, setSubmitted] = React.useState(false);
  const [snackbarMessage, setSnackBarMessage] = React.useState("");
  const [snackbarOpenState, setSnackbarOpenState] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleMenuItemClick = (value, index) => {
    setOpen(false);
    setBackDropState(true);
    let updateStatusData = { ...studentFound };
    updateStatusData.status = value;
    updateStatusOfStudent(updateStatusData, currentUser)
      .then((res) => {
        updateStudentFoundForSummary(updateStatusData);
      })
      .catch((err) => {})
      .finally(() => setBackDropState(false));
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

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
      followUpRemarks: followUpRemarks,
      toDoRemarks: toDoRemarks,
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
          resetForm(initialValues);
          setFollowUpRemarks(null);
          setToDoRemarks(null);
          resetValues();
          //updateStudentFoundForSummary(userObject);
          setBackDropState(false);
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
          updateStudentFoundForSummary(userObject);
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

  const handleSubmitFollowUp = (remarks) => {
    setOpenFollowUpPopup(false);
    let remarksCopy = followUpRemarks ? followUpRemarks : [];
    let newRemarks = { remark: remarks, operationFlag: OPERATION_FLAG.INSERT };
    remarksCopy.push(newRemarks);
    setFollowUpRemarks(remarksCopy);
  };

  const handleSubmitToDo = (remarks) => {
    setOpenToDoPopup(false);
    let remarksCopy = toDoRemarks ? toDoRemarks : [];
    let newRemarks = { remark: remarks, operationFlag: OPERATION_FLAG.INSERT };
    remarksCopy.push(newRemarks);
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
              <DetailsPanelComponent
                formik={formik}
                followUpRemarks={followUpRemarks}
                toDoRemarks={toDoRemarks}
                countries={countries}
              />
            </div>
            {/* <Toolbar position="fixed" className={classes.appBar}> */}
            <div className={classes.appBar}>
              {/* <Button
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
              </Button> */}
              <Button
                variant="contained"
                color="primary"
                size="small"
                aria-controls={open ? "split-button-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                ref={anchorRef}
                onClick={handleToggle}
                className={classes.actionButton}
                disabled={isActionsDisabled}
                startIcon={<KeyboardArrowUpRoundedIcon />}
              >
                {`  Change Status to `}
              </Button>

              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu">
                          {APPLCTN_STS_ARRY_PROSPECTUS.map((option, index) => (
                            <MenuItem
                              key={index}
                              onClick={(event) =>
                                handleMenuItemClick(option.value)
                              }
                            >
                              {option.status}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              <Button
                variant="contained"
                color="primary"
                onClick={openToDoPopupFn}
                disabled={status === STATUS.REJECTED}
              >
                {" "}
                To Do{" "}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={openFollowUpPopupFn}
                disabled={status === STATUS.REJECTED}
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
                {typeof studentFound === "undefined"
                  ? " SAVE PROSPECTUS "
                  : " UPDATE PROSPECTUS "}
              </Button>
              {/* </Toolbar> */}
            </div>
          </form>
        )}
      </Formik>
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
      <ToDoPopupComponent
        openToDoPopup={openToDoPopup}
        handleToDoClose={closeToDoPopupFn}
        handleSubmitToDo={handleSubmitToDo}
      />
      <FollowUpPopupComponent
        openFollowUpPopup={openFollowUpPopup}
        handleFollowUpClose={closeFollowUpPopupFn}
        handleSubmitFollowUp={handleSubmitFollowUp}
      />

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
