import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DetailsPanelComponent from "./DetailsPanelComponent";
import Button from "@material-ui/core/Button";
import { APPLCTN_STS_ARRY_PROPOSAL, OPERATION_FLAG } from "../../../constants";
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
  actionButton: {
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const initialValues = {
  visaApplnStatus: "",
  visaStatus: "",
  visaApplnPrcDate: null,
  visaApRjDate: null,
  travelDate: null,
};

const validationSchema = Yup.object().shape({});

export default function ProposalComponent(props) {
  const classes = useStyles();
  const { studentFound } = props;
  const [applicationDtl, setApplicationDtl] = React.useState([]);
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

  const handleSubmitFollowUp = (event) => {
    event.preventDefault();
    setOpenFollowUpPopup(false);
    let remarksCopy = followUpRemarks ? followUpRemarks : [];
    remarksCopy.push(event.target.followupremarks.value);
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
    let proposalInfo = { ...studentFound };
    proposalInfo.status = value;
    updateStatusOfStudent(proposalInfo, currentUser)
      .then((res) => {})
      .catch((err) => {});
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

  return (
    <div className={classes.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          let proposalInfo = {
            ...values,
            applicationDetails: applicationDtl,
            toDoRemarks: toDoRemarks,
            followUpRemarks: followUpRemarks,
          };
          console.log("Proposal Info");
          console.log(proposalInfo);
          saveProposalInfo(proposalInfo, currentUser)
            .then((res) => {})
            .catch((err) => {});
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
                className={classes.actionButton}
              >
                {` Follow Up `}
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.actionButton}
              >
                {` Save Proposal `}
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
    </div>
  );
}
