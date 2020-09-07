import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  cardContentDiv: {},
  cardComponent: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export function FollowUpComponent(props) {
  const classes = useStyles();

  return (
    <div>
      {props.followUpRemarks ? (
        <div className={classes.cardComponent}>
          {/* <Card className={classes.cardComponent}> */}
          <Typography component="h6" variant="h6">
            Follow Up Remarks
          </Typography>
          {/* <CardContent className={classes.cardContentDiv}> */}
          {props.followUpRemarks.map((followUpRem) => {
            return <li>{followUpRem}</li>;
          })}
          {/* </CardContent>
          </Card> */}
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
}