import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  cardContentDiv: {},
  cardComponent: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export function ToDoComponent(props) {
  const classes = useStyles();
  const { toDoRemarks } = props;
  return (
    <div>
      {toDoRemarks ? (
        <div className={classes.cardComponent}>
          <Typography component="h6" variant="h7">
            To Do Remarks
          </Typography>
          {toDoRemarks.map((followUpRem) => {
            return <li>{followUpRem}</li>;
          })}
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
}
