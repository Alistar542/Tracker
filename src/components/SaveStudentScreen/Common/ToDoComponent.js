import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  cardContentDiv: {},
  cardComponent: {
    "& .li": {
      padding: theme.spacing(1),
    },
    marginRight: theme.spacing(1),
  },
}));

export default function ToDoComponent(props) {
  const classes = useStyles();
  const { toDoRemarks } = props;
  return (
    <div>
      {toDoRemarks ? (
        <div className={classes.cardComponent}>
          {/* <Typography component="h7" variant="h7">
            To Do Comments
          </Typography> */}
          {toDoRemarks.map((followUpRem) => {
            return <li>{followUpRem.remark}</li>;
          })}
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
}
