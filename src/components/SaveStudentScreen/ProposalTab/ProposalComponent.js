import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DetailsPanelComponent from "./DetailsPanelComponent";
import Button from "@material-ui/core/Button";
import { APPLCTN_STS_ARRY_PROPOSAL } from "../../../constants";
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
    padding: theme.spacing(1),
    width: "100%",
    minHeight: "70px",
    marginTop: "auto",
  },
  actionButton: {
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
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
  const { studentToUpdate } = props;
  const [applicationDtl, setApplicationDtl] = React.useState([]);
  const { currentUser } = useContext(AuthContext);
  // const handleStatusChange = () => {
  //   let studentToBeUpdated = { ...studentToUpdate };
  //   if (studentToUpdate.status === STATUS.DONE) {
  //     return;
  //   }
  //   setBackDropState(true);
  //   updateStudent(studentToBeUpdated, currentUser)
  //     .then((res) => {
  //       setFormData((previousStudentData) => ({
  //         ...previousStudentData,
  //         status: studentToBeUpdated.status,
  //       }));
  //       props.updateStudentFoundForSummary(studentToBeUpdated);
  //       setBackDropState(false);
  //       return res;
  //     })
  //     .catch((err) => {
  //       setBackDropState(false);
  //       return err;
  //     });
  // };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleMenuItemClick = (value, index) => {
    setOpen(false);
    let proposalInfo = { ...studentToUpdate };
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
          //submitApplicationDtls(values, setSubmitting, resetForm);
          console.log("Inside Proposal Component Submit");
          console.log(values);
          console.log(applicationDtl);
          let proposalInfo = { ...values, applicationDetails: applicationDtl };
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
                type="submit"
                className={classes.actionButton}
              >
                {` Save `}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
