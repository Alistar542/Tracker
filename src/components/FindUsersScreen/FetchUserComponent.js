import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { StudentsFoundTableComponent } from "./StudentsFoundTableComponent";
import FailOnFetchingDialog from "../Dialogs/FailOnFetchingDailog";
import { FilterComponent } from "./FilterComponent";
import { AuthContext } from "../LoginScreen/context/auth";
import { findStudentSummary } from "../../actions/studentactions";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
  formDiv: {
    margin: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const FetchUserComponent = () => {
  const classes = useStyles();
  const [studentsFound, setStudentsFound] = React.useState();
  const [loadingSpinner, setLoadingSpinner] = React.useState(false);
  const [dialogState, setDialogState] = React.useState(false);
  const [successOrFail, setSuccessOrFail] = React.useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSubmitForFetching = (objectFromFilterComponent) => {
    setLoadingSpinner(true);
    const fetchObject = objectFromFilterComponent;
    findStudentSummary(fetchObject, currentUser)
      .then((res) => {
        setLoadingSpinner(false);
        console.log(res.data);
        if (res.data.length > 0) {
          console.log("found");
          console.log(res.data);
          setDialogState(true);
          setSuccessOrFail(true);
          handleStudentChange(res.data);
          console.log(res.data.map((user) => user.firstName));
        } else {
          handleStudentChange([]);
          setDialogState(true);
          setSuccessOrFail(false);
        }
      })
      .catch((err) => {
        setLoadingSpinner(false);
        setDialogState(true);
        setSuccessOrFail(false);
      });
  };

  const handleStudentChange = (data) => {
    console.log("Inside handleClick method");
    //data.forEach(singleData => {
    //	singleData.followUpDate = new Date(singleData.followUpDate)
    //})
    setStudentsFound(data);
    console.log("final data");
    console.log(data);
  };

  const clearValues = () => {
    setStudentsFound();
  };

  return (
    <div>
      <div className={classes.formDiv}>
        <FilterComponent
          handleSubmitForFetching={handleSubmitForFetching}
          clearValues={clearValues}
          studentsFound={studentsFound}
        />
        <br></br>
        {studentsFound ? (
          <span>
            <StudentsFoundTableComponent
              studentsFound={studentsFound}
            ></StudentsFoundTableComponent>
          </span>
        ) : (
          <span></span>
        )}
        {!successOrFail ? (
          <FailOnFetchingDialog
            dialogState={dialogState}
            setDialogStateFn={setDialogState}
          />
        ) : (
          <span></span>
        )}
        <Backdrop className={classes.backdrop} open={loadingSpinner}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
};
