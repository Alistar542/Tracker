import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { STATUS } from "../../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: `calc(100vh - 220px)`,
    flexDirection: "column",
  },
  formDiv: {
    height: "92%",
  },
  bottomBar: {
    bottom: 0,
    background: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: theme.spacing(1),
    "& .MuiButton-root": {
      margin: theme.spacing(1),
    },
    width: "100%",
    height: "8%",
    minHeight: "70px",
  },
}));
export default function ProposalComponent(props) {
  const classes = useStyles();
  const { studentToUpdate } = props;

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

  return (
    <div className={classes.root}>
      <div className={classes.formDiv}></div>
      <div className={classes.bottomBar}>
        <Button variant="contained" color="primary">
          {" "}
          Mark As Travelled{" "}
        </Button>
      </div>
    </div>
  );
}
