import React from "react";
import FilterComponent from "./FilterComponent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formDiv: {
    margin: theme.spacing(3),
  },
}));

export default function StudentHistoryComponent() {
  const classes = useStyles();

  const handleSubmit = (studentId) => {};
  const clearValues = () => {};

  return (
    <div className={classes.formDiv}>
      <FilterComponent handleSubmit={handleSubmit} clearValues={clearValues} />
    </div>
  );
}
