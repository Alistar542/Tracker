import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    width: 100,
    height: 40,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  filterDiv: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  cardContentDiv: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    "& .MuiTextField-root": {
      width: 200,
      marginRight: theme.spacing(1),
    },
  },
  cardComponent: {
    borderWidth: "1px",
    borderRadius: "6px",
    boxShadow: "0 1px 15px rgba(27,31,35,.15),0 0 1px rgba(106,115,125,.35)",
  },
}));

export default function FilterComponent(props) {
  const classes = useStyles();
  const [studentId, setStudentId] = React.useState("");

  const handleStudentId = (event) => {
    setStudentId(event.target.value);
  };

  const handleSubmitForFetching = (event) => {
    event.preventDefault();
    const fetchObject = {
      studentId: studentId,
    };
    props.handleSubmit(fetchObject);
  };

  const clearValues = () => {
    setStudentId("");
    props.clearValues();
  };

  return (
    <div>
      <Card className={classes.cardComponent}>
        <form
          noValidate
          autoComplete="off"
          className={classes.filterDiv}
          onSubmit={handleSubmitForFetching}
        >
          <CardContent className={classes.cardContentDiv}>
            <TextField
              id="standard"
              label="Stundent Id"
              name="studentId"
              variant="outlined"
              margin="dense"
              value={studentId}
              onChange={handleStudentId}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonStyle}
              type="submit"
            >
              Find
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={classes.buttonStyle}
              onClick={clearValues}
            >
              Clear
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
