import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CaptureApplicationDetailsComponent from "./Popup/CaptureApplicationDetailsComponent";
import ApplicationDetailCardComponent from "./ApplicationDetailCardComponent";
import Divider from "@material-ui/core/Divider";
import VisaDetailsComponent from "./VisaDetailsComponent";
import FollowUpComponent from "../Common/FollowUpComponent";
import ToDoComponent from "../Common/ToDoComponent";
import ProspectusSummaryComponent from "../Common/ProspectusSummaryComponent";
import RemarksComponent from "../Common/RemarksComponent";

const useStyles = makeStyles((theme) => ({
  detailsPanelDiv: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
  },
  mainDetailsDiv: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  applicationDetailsDiv: {
    display: "flex",
    flexDirection: "column",
  },
  captureApplicationBtn: {},
  applicationTopDiv: {
    padding: theme.spacing(1),
  },
  applicationBottomDiv: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  remarksDiv: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

export default function DetailsPanelComponent(props) {
  const classes = useStyles();
  const {
    formik,
    applicationDtl,
    setApplicationDtl,
    followUpRemarks,
    toDoRemarks,
    studentFound,
  } = props;
  const [openApplicationDtlPopup, setOpenApplicationDtlPopup] = React.useState(
    false
  );

  const [application, setApplication] = React.useState(null);
  const [index, setIndex] = React.useState(null);

  const openCaptureApplicationDetailsPopup = (value) => {
    setOpenApplicationDtlPopup(value);
    setApplication(null);
    setIndex(null);
  };

  const viewApplicationDetailsPopup = (value, application, index) => {
    setApplication(application);
    setIndex(index);
    setOpenApplicationDtlPopup(value);
  };

  const submitApplicationDtls = (values, setSubmitting) => {
    let applicationDtlCopy = [...applicationDtl];
    if (index != null) {
      applicationDtlCopy[index] = values;
    } else {
      applicationDtlCopy.push(values);
    }
    setApplicationDtl(applicationDtlCopy);
    openCaptureApplicationDetailsPopup(false);
    setApplication(null);
    setIndex(null);
  };

  const deleteApplication = () => {
    let applicationDtlCopy = [...applicationDtl];
    applicationDtlCopy.splice(index, 1);
    setApplicationDtl(applicationDtlCopy);
    openCaptureApplicationDetailsPopup(false);
    setApplication(null);
    setIndex(null);
  };

  return (
    <div className={classes.detailsPanelDiv}>
      <CaptureApplicationDetailsComponent
        openApplicationDtlPopup={openApplicationDtlPopup}
        handleCloseApplicationDtlPopup={openCaptureApplicationDetailsPopup}
        submitApplicationDtls={submitApplicationDtls}
        application={application}
        deleteApplication={deleteApplication}
      />
      <div className={classes.applicationDetailsDiv}>
        <div className={classes.applicationTopDiv}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => openCaptureApplicationDetailsPopup(true)}
            className={classes.captureApplicationBtn}
          >
            Add Course Details
          </Button>
        </div>
        <div className={classes.applicationBottomDiv}>
          {applicationDtl.length > 0 &&
            applicationDtl.map((application, index) => {
              return (
                <ApplicationDetailCardComponent
                  application={application}
                  viewApplicationDetailsPopup={viewApplicationDetailsPopup}
                  index={index}
                />
              );
            })}
        </div>
        <Divider />
      </div>
      <div className={classes.mainDetailsDiv}>
        {/* <ProspectusSummaryComponent studentFound={studentFound} /> */}
        <VisaDetailsComponent formik={formik} />
        <Divider />
      </div>
      <div className={classes.remarksDiv}>
        <RemarksComponent
          formik={formik}
          remarksStatus={props.remarksStatus}
          openFollowUpPopupFn={props.openFollowUpPopupFn}
        />
      </div>
      <Divider />
      <FollowUpComponent followUpRemarks={followUpRemarks} />
      <ToDoComponent toDoRemarks={toDoRemarks} />
    </div>
  );
}
