import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  cardContentDiv: {},
  cardComponent: {
    "& .li": {
      padding: theme.spacing(1),
    },
    marginRight: theme.spacing(1),
  },
}));

export default function FollowUpComponent(props) {
  const classes = useStyles();

  return (
    <div>
      {props.followUpRemarks ? (
        <div className={classes.cardComponent}>
          {/* <Card className={classes.cardComponent}> */}
          <Typography component="h7" variant="h7">
            Follow Up Comments
          </Typography>
          {/* <CardContent className={classes.cardContentDiv}> */}
          {props.followUpRemarks.map((followUpRem) => {
            return <li>{followUpRem.remark}</li>;
          })}
          {/* </CardContent>
          </Card> */}

          <Divider />
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
}
