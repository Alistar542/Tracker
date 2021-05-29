import React from "react";
import StaffTableComponent from "./StaffTableComponent";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {},
}));
export default function ListStaffComponent(props) {
  const classes = useStyles();
  return (
    // <Grid container spacing={3}>
    //   <Grid item xs={12}>
    <StaffTableComponent {...props}/>
    //   </Grid>
    // </Grid>
  );
}
