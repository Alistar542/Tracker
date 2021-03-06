import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DetailsPanelComponent from "./DetailsPanelComponent";
import Button from "@material-ui/core/Button";
import {
  APPLCTN_STS_ARRY_PROPOSAL,
  OPERATION_FLAG,
  APPLICATION_STATUS,
} from "../../../constants";
import { Formik } from "formik";
import * as Yup from "yup";
import { saveProposalInfo } from "../../../actions/studentactions";
import { AuthContext } from "../../LoginScreen/context/auth";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";
import { updateStatusOfStudent } from "../../../actions/studentactions";
import ToDoPopupComponent from "../Popups/ToDoPopupComponent";
import FollowUpPopupComponent from "../Popups/FollowUpPopupComponent";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import SnackbarCommon from "../../Common/SnackbarCommon";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  innerDiv: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - 200px)`,
  },
  detailsDiv: {
    overflow: "auto",
  },
  bottomBar: {
    bottom: 0,
    background: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    "& .MuiButton-root": {
      margin: theme.spacing(1),
    },
    width: "100%",
    minHeight: "53px",
    marginTop: "auto",
    backgroundColor: grey[200],
  },
  actionButton: {
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const initialValues = {
  visaApplnStatus: "",
  visaStatus: "",
  visaApplnPrcDate: null,
  visaApRjDate: null,
  travelDate: null,
  operationFlag: OPERATION_FLAG.INSERT,
  currentState: "",
  studentRemarks: "",
  remarksStatus: false,
  followUpDate: null,
};

const validationSchema = Yup.object().shape({});

export default function ProposalComponent(props) {
  const classes = useStyles();
  const { studentFound, updateStudentFoundForSummary } = props;
  const [backDropState, setBackDropState] = React.useState(false);
  const [applicationDtl, setApplicationDtl] = React.useState(
    studentFound
      ? studentFound.proposalInfo
        ? studentFound.proposalInfo.applicationDetails
        : []
      : []
  );
  const { currentUser } = useContext(AuthContext);
  const [openFollowUpPopup, setOpenFollowUpPopup] = React.useState(false);
  const [openToDoPopup, setOpenToDoPopup] = React.useState(false);
  const [followUpRemarks, setFollowUpRemarks] = React.useState(
    studentFound
      ? studentFound.proposalInfo
        ? studentFound.proposalInfo.followUpRemarks
        : null
      : null
  );
  const [toDoRemarks, setToDoRemarks] = React.useState(
    studentFound
      ? studentFound.proposalInfo
        ? studentFound.proposalInfo.toDoRemarks
        : null
      : null
  );
  const [remarksStatus, setRemarksStatus] = React.useState(
    studentFound ? studentFound.remarksStatus : "Y"
  );
  const [remarkTriggerPoint, setRemarkTriggerPoint] = React.useState();
  const [snackbarMessage, setSnackBarMessage] = React.useState("");
  const [snackbarOpenState, setSnackbarOpenState] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const snackbarClose = () => {
    setSnackBarMessage("");
    setSnackbarOpenState(false);
  };

  const openFollowUpPopupFn = (event, id) => {
    //event.preventDefault();
    setRemarkTriggerPoint(id);
    setOpenFollowUpPopup(true);
  };

  const closeFollowUpPopupFn = (event) => {
    setOpenFollowUpPopup(false);
  };

  const openToDoPopupFn = (event) => {
    event.preventDefault();
    setOpenToDoPopup(true);
  };

  const handleSubmitFollowUp = (remarks) => {
    setOpenFollowUpPopup(false);
    let remarksCopy = followUpRemarks ? followUpRemarks : [];
    let newRemarks = {
      remark: remarksCopy.length + 1 + "." + remarks,
      operationFlag: OPERATION_FLAG.INSERT,
    };
    remarksCopy.push(newRemarks);
    setFollowUpRemarks(remarksCopy);
    if (remarkTriggerPoint === "remarksDoneButton") {
      setRemarksStatus("Y");
    }
  };

  const closeToDoPopupFn = (event) => {
    setOpenToDoPopup(false);
  };

  const handleSubmitToDo = (remarks) => {
    setOpenToDoPopup(false);
    let remarksCopy = toDoRemarks ? toDoRemarks : [];
    let newRemarks = {
      remark: remarksCopy.length + 1 + "." + remarks,
      operationFlag: OPERATION_FLAG.INSERT,
    };
    remarksCopy.push(newRemarks);
    setToDoRemarks(remarksCopy);
    setRemarksStatus("N");
  };

  const handleMenuItemClick = (value, index) => {
    setOpen(false);
    setBackDropState(true);
    let saveData = { ...studentFound };
    let applicationDetailsData = saveData.proposalInfo
      ? saveData.proposalInfo.applicationDetails
      : null;
    let continueFlag = 0;
    if (value === APPLICATION_STATUS.ENROLLED) {
      if (!applicationDetailsData) {
        setSnackBarMessage("Please save atleast one course");
        setSnackbarOpenState(true);
        setBackDropState(false);
        return;
      }
      applicationDetailsData &&
        applicationDetailsData.length > 0 &&
        applicationDetailsData.forEach((course, index) => {
          if (course.applStatus === "Y") {
            continueFlag++;
            if (continueFlag > 1) {
              return;
            }
          }
        });
    }
    if (continueFlag !== 1) {
      setSnackBarMessage("Please select one course with status continue");
      setSnackbarOpenState(true);
      setBackDropState(false);
      return;
    }
    saveData.status = value;
    updateStatusOfStudent(saveData, currentUser)
      .then((res) => {
        updateStudentFoundForSummary(saveData);
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

  const isUpdate = studentFound
    ? studentFound.proposalInfo
      ? true
      : false
    : false;

  return (
    <div className={classes.root}>
      <Formik
        initialValues={
          studentFound
            ? studentFound.proposalInfo
              ? studentFound.proposalInfo
              : initialValues
            : initialValues
        }
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (applicationDtl.length <= 0) {
            setSnackBarMessage("Application Detail is Mandatory");
            setSnackbarOpenState(true);
            return;
          }
          setBackDropState(true);
          let proposalInfo = {
            ...values,
            applicationDetails: applicationDtl,
            toDoRemarks: toDoRemarks,
            followUpRemarks: followUpRemarks,
            remarksStatus: remarksStatus,
          };
          let saveData = { ...studentFound };
          saveData.proposalInfo = proposalInfo;
          console.log("Proposal Info");
          console.log(saveData);
          saveProposalInfo(saveData, currentUser)
            .then((res) => {
              let tempData = {
                ...saveData,
                proposalInfo: {
                  ...proposalInfo,
                  operationFlag: OPERATION_FLAG.UPDATE,
                },
              };
              updateStudentFoundForSummary(tempData);
            })
            .catch((err) => {})
            .finally(() => setBackDropState(false));
        }}
        validateOnBlur={false}
      >
        {(formik) => (
          <form
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            className={classes.innerDiv}
          >
            <div className={classes.detailsDiv}>
              <DetailsPanelComponent
                formik={formik}
                setApplicationDtl={setApplicationDtl}
                applicationDtl={applicationDtl}
                followUpRemarks={followUpRemarks}
                toDoRemarks={toDoRemarks}
                setToDoRemarks={setToDoRemarks}
                studentFound={studentFound}
                remarksStatus={remarksStatus}
                setRemarksStatus={setRemarksStatus}
                openFollowUpPopupFn={openFollowUpPopupFn}
              />
            </div>
            <div className={classes.bottomBar}>
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
                          {APPLCTN_STS_ARRY_PROPOSAL.map((option, index) => (
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
              {/* <Button
                variant="contained"
                color="primary"
                onClick={openToDoPopupFn}
                className={classes.actionButton}
              >
                {` To Do `}
              </Button>
              <Button
                variant="contained"
                color="primary"
                id="followUpButton"
                onClick={(e) => openFollowUpPopupFn(e, "followUpButton")}
                className={classes.actionButton}
              >
                {` Follow Up `}
              </Button> */}

              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.actionButton}
              >
                {isUpdate ? ` Save Proposal ` : ` Save Proposal `}
              </Button>
            </div>
          </form>
        )}
      </Formik>
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
}
