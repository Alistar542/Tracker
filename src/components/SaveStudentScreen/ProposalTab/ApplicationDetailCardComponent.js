import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(1),
  },
}));

export default function ApplicationDetailCardComponent(props) {
  const classes = useStyles();
  const { application, viewApplicationDetailsPopup, index } = props;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {`Application Id : ${application.applnId}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Applied University : ${application.appldUnvsty}`}
            <br></br>
            {`Applied Course : ${application.appldCourse}`}
            <br></br>
            {`Applied Course Type : ${application.appldCourseTyp}`}
            <br></br>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => viewApplicationDetailsPopup(true, application, index)}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
