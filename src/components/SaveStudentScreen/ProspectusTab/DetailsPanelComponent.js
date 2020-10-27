import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AreasOfInterestComponent from "./AreasOfInterestComponent";
import MarketingPurposeComponent from "./MarketingPurposeComponent";
import EducationSummaryComponent from "./EducationSummaryComponent";
import WorkExperienceComponent from "./WorkExperienceComponent";
import PersonalInformationComponent from "./PersonalInformationComponent";
import EnglishExamTypeComponent from "./EnglishExamTypeComponent";
import FollowUpComponent from "../Common/FollowUpComponent";
import ToDoComponent from "../Common/ToDoComponent";
import RemarksComponent from "../Common/RemarksComponent";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  formDiv: {
    margin: theme.spacing(1),
  },
}));
export default function DetailsPanelComponent(props) {
  const {
    formik,
    followUpRemarks,
    toDoRemarks,
    remarksStatus,
    openFollowUpPopupFn,
    educationDetails,
    setEducationDetails,
  } = props;
  const classes = useStyles();
  return (
    <div id="formDiv" className={classes.formDiv}>
      <PersonalInformationComponent {...formik} />
      <Divider />
      <EducationSummaryComponent
        formik={formik}
        educationDetails={educationDetails}
        setEducationDetails={setEducationDetails}
      />
      <Divider />
      <EnglishExamTypeComponent formik={formik} />
      <Divider />
      <WorkExperienceComponent formik={formik} />
      <Divider />
      <AreasOfInterestComponent formik={formik} />
      <Divider />
      <MarketingPurposeComponent formik={formik} />
      <Divider />
      <RemarksComponent
        formik={formik}
        remarksStatus={remarksStatus}
        openFollowUpPopupFn={openFollowUpPopupFn}
      />
      <Divider />
      <ToDoComponent toDoRemarks={toDoRemarks} />
      <FollowUpComponent followUpRemarks={followUpRemarks} />
    </div>
  );
}
