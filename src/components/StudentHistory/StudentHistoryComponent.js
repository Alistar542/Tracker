import React, { useContext } from "react";
import FilterComponent from "./FilterComponent";
import DetailsComponent from "./DetailsComponent";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../LoginScreen/context/auth";
import { findStudentHistory } from "../../actions/studenthistoryactions";
import FailOnFetchingDailog from "../Dialogs/FailOnFetchingDailog";

const useStyles = makeStyles((theme) => ({
  formDiv: {
    margin: theme.spacing(3),
  },
}));

export default function StudentHistoryComponent() {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [studentFound, setStudentFound] = React.useState();
  const [failOnFetchingDailog, setFailOnFetchingDailog] = React.useState(false);

  const handleSubmit = (studentObject) => {
    findStudentHistory(studentObject, currentUser)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          console.log(res.data);
          setStudentFound(res.data);
        } else {
          setFailOnFetchingDailog(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clearValues = () => {
    setStudentFound([]);
  };

  return (
    <div className={classes.formDiv}>
      <FilterComponent handleSubmit={handleSubmit} clearValues={clearValues} />
      <br></br>
      {studentFound && studentFound.length > 0 ? (
        <DetailsComponent studentFound={studentFound} />
      ) : (
        ""
      )}
      <FailOnFetchingDailog
        dialogState={failOnFetchingDailog}
        setDialogStateFn={(dialogState) => {
          setFailOnFetchingDailog(dialogState);
        }}
      />
    </div>
  );
}
