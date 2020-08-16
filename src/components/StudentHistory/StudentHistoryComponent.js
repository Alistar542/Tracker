import React, { useContext } from "react";
import FilterComponent from "./FilterComponent";
import DetailsComponent from "./DetailsComponent";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../LoginScreen/context/auth";
import { findStudentHistory } from "../../actions/studenthistoryactions";

const useStyles = makeStyles((theme) => ({
  formDiv: {
    margin: theme.spacing(3),
  },
}));

export default function StudentHistoryComponent() {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [studentFound, setStudentFound] = React.useState();

  const handleSubmit = (studentObject) => {
    findStudentHistory(studentObject, currentUser)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setStudentFound(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clearValues = () => {};

  return (
    <div className={classes.formDiv}>
      <FilterComponent handleSubmit={handleSubmit} clearValues={clearValues} />
      <br></br>
      {studentFound ? <DetailsComponent studentFound={studentFound} /> : ""}
    </div>
  );
}
