import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { OPERATION_FLAG, APPLCTN_STS_ARRY_ENROLLED } from "../../../constants";
import DetailsComponent from "./DetailsComponent";
import { Formik } from "formik";
import * as Yup from "yup";
import { saveEnrolledInfo } from "../../../actions/studentactions";
import { AuthContext } from "../../LoginScreen/context/auth";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
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
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const initialValues = {
  totalTutionFees: "",
  annualTutionFees: "",
  totalCommission: "",
  firstCommission: "",
  balanceCommission: "",
  courseStartingDate: null,
  nextInvoiceDate: null,
  invoiceDate: null,
  currency: "",
  operationFlag: OPERATION_FLAG.INSERT,
};
const validationSchema = Yup.object().shape({
  annualTutionFees: Yup.string().required("Required"),
});

export default function EnrolledComponent(props) {
  const classes = useStyles();
  const { studentFound, updateStudentFoundForSummary } = props;
  const [backDropState, setBackDropState] = React.useState(false);
  const { currentUser } = useContext(AuthContext);
  const [openFollowUpPopup, setOpenFollowUpPopup] = React.useState(false);
  const [openToDoPopup, setOpenToDoPopup] = React.useState(false);
  const [followUpRemarks, setFollowUpRemarks] = React.useState(
    studentFound
      ? studentFound.enrolledInfo
        ? studentFound.enrolledInfo.followUpRemarks
        : null
      : null
  );
  const [toDoRemarks, setToDoRemarks] = React.useState(
    studentFound
      ? studentFound.enrolledInfo
        ? studentFound.enrolledInfo.toDoRemarks
        : null
      : null
  );

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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

  const handleSubmitFollowUp = (remarks) => {
    setOpenFollowUpPopup(false);
    let remarksCopy = followUpRemarks ? followUpRemarks : [];
    let newRemarks = { remark: remarks, operationFlag: OPERATION_FLAG.INSERT };
    remarksCopy.push(newRemarks);
    setFollowUpRemarks(remarksCopy);
  };

  const closeToDoPopupFn = (event) => {
    setOpenToDoPopup(false);
  };

  const handleSubmitToDo = (remarks) => {
    setOpenToDoPopup(false);
    let remarksCopy = toDoRemarks ? toDoRemarks : [];
    let newRemarks = { remark: remarks, operationFlag: OPERATION_FLAG.INSERT };
    remarksCopy.push(newRemarks);
    setToDoRemarks(remarksCopy);
  };

  const handleMenuItemClick = (value, index) => {
    setOpen(false);
    setBackDropState(true);
    let enrolledInfo = { ...studentFound };
    enrolledInfo.status = value;
    updateStatusOfStudent(enrolledInfo, currentUser)
      .then((res) => {
        updateStudentFoundForSummary(enrolledInfo);
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
    ? studentFound.enrolledInfo
      ? true
      : false
    : false;

  return (
    <div className={classes.root}>
      <Formik
        initialValues={
          studentFound
            ? studentFound.enrolledInfo
              ? studentFound.enrolledInfo
              : initialValues
            : initialValues
        }
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setBackDropState(true);
          let enrolledInfo = {
            ...values,
            toDoRemarks: toDoRemarks,
            followUpRemarks: followUpRemarks,
          };
          let saveData = { ...studentFound };
          saveData.enrolledInfo = enrolledInfo;
          saveEnrolledInfo(saveData, currentUser)
            .then((res) => {
              let tempData = {
                ...saveData,
                enrolledInfo: {
                  ...enrolledInfo,
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
              <DetailsComponent
                formik={formik}
                followUpRemarks={followUpRemarks}
                toDoRemarks={toDoRemarks}
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
                          {APPLCTN_STS_ARRY_ENROLLED.map((option, index) => (
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
                className={classes.actionButton}
              >
                {` To Do `}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={openFollowUpPopupFn}
                className={classes.actionButton}
              >
                {` Follow Up `}
              </Button>
              <Button variant="contained" color="primary" type="submit">
                {isUpdate ? ` Update Enrolled ` : ` Save Enrolled `}
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
    </div>
  );
}
