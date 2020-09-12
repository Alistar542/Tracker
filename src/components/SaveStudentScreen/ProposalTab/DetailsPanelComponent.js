import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CaptureApplicationDetailsComponent from "./Popup/CaptureApplicationDetailsComponent";
import ApplicationDetailCardComponent from "./ApplicationDetailCardComponent";
import Divider from "@material-ui/core/Divider";
import VisaDetailsComponent from "./VisaDetailsComponent";

const useStyles = makeStyles((theme) => ({
  detailsPanelDiv: {
    display: "flex",
    flexDirection: "column",
  },
  mainDetailsDiv: {
    display: "flex",
    flexDirection: "row",
    minHeight: "100px",
    overflow: "auto",
    padding: theme.spacing(1),
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
}));

export default function DetailsPanelComponent(props) {
  const classes = useStyles();
  const { formik } = props;
  const [openApplicationDtlPopup, setOpenApplicationDtlPopup] = React.useState(
    false
  );

  const [applicationDtl, setApplicationDtl] = React.useState([]);

  const openCaptureApplicationDetailsPopup = (value) => {
    setOpenApplicationDtlPopup(value);
  };

  const submitApplicationDtls = (values, setSubmitting, resetForm) => {
    let applicationDtlCopy = [...applicationDtl];
    applicationDtlCopy.push(values);
    setApplicationDtl(applicationDtlCopy);
    openCaptureApplicationDetailsPopup(false);
  };

  return (
    <div className={classes.detailsPanelDiv}>
      <CaptureApplicationDetailsComponent
        openApplicationDtlPopup={openApplicationDtlPopup}
        handleCloseApplicationDtlPopup={openCaptureApplicationDetailsPopup}
        submitApplicationDtls={submitApplicationDtls}
      />
      <div className={classes.mainDetailsDiv}>
        <VisaDetailsComponent formik={formik} />
      </div>
      <Divider />
      <div className={classes.applicationDetailsDiv}>
        <div className={classes.applicationTopDiv}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => openCaptureApplicationDetailsPopup(true)}
            className={classes.captureApplicationBtn}
          >
            Capture Application Details
          </Button>
        </div>
        <div className={classes.applicationBottomDiv}>
          {applicationDtl.length > 0 &&
            applicationDtl.map((application) => {
              return (
                <ApplicationDetailCardComponent application={application} />
              );
            })}
        </div>
      </div>
    </div>
  );
}
