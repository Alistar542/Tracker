import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { AuthContext } from "./context/auth";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import { loginUser } from "../../actions/useractions";
import {
  updatePrivilege,
  AbilityContext,
} from "../../privilegehandler/privilegehandler";
import Paper from "@material-ui/core/Paper";
import login_bg from "../../photos/login_bg.jpg";
import login_new from "../../photos/login_new.jpg";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1),
    height: "100%",
  },
  paper: {
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    background: "white",
    padding: theme.spacing(2),
    width: "100%",
    borderRadius: "1%",
  },
  containerDiv: {
    display: "flex",
    flexDirection: "row",
    borderRadius: "1%",
    justifyContent: "center",
    width: "100%",
    height: `calc(100vh - 200px)`,
    marginTop: theme.spacing(10),
  },
  back_img: {
    backgroundImage: `url(${login_new})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1),
  },
  paper_div: {
    background: "blue",
  },
  back: {
    height: "100vh",
    backgroundPosition: "center",
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    display: "flex",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
    margin: theme.spacing(3, 0, 2),
  },
  wrapper: {
    position: "relative",
  },
  gridOuterDiv: {
    margin: theme.spacing(10),
  },
  innerDiv: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(5),
    height: "70%",
    width: "30%",
  },
  innerFormDiv: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function LoginComponent() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const ability = useContext(AbilityContext);
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const { userName, password, officeCode } = event.target.elements;
    const user = {
      userName: userName.value.trim(),
      password: password.value,
      officeCode:officeCode.value
    };
    loginUser(user)
      .then((res) => {
        updatePrivilege(ability, res.data);
        setCurrentUser(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  if (currentUser) {
    return <Redirect to="/home" />;
  }

  return (
    <div className={classes.back}>
      {/* <Grid container component="main" className={classes.back}> */}
      <Container component={Paper} className={classes.innerDiv}>
        {/* <Grid item xs={12} sm={8} md={5} component={Paper} square> */}
        {/* <Paper className={classes.containerDiv}> */}
        {/* <div className={classes.back_img} /> */}
        <Container className={classes.innerFormDiv}>
          <Typography component="h1" variant="h5">
            Student Tracker
          </Typography>
          <form
            className={classes.root}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Username"
              name="userName"
              variant="outlined"
              margin="normal"
              error={error ? true : false}
              helperText={error ? "Incorrect login credentials" : ""}
            />

            <TextField
              required
              fullWidth
              id="outlined-password-input"
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              variant="outlined"
              margin="normal"
            />
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Office Code"
              name="officeCode"
              autoComplete="current-password"
              variant="outlined"
              margin="normal"
            />
            <br></br>
            <div className={classes.wrapper}>
              <Button
                fullWidth
                variant="contained"
                className={classes.submit}
                color="primary"
                disabled={loading}
                type="submit"
              >
                {" "}
                LOGIN{" "}
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </form>
        </Container>
        {/* </Grid> */}
        {/* </Paper> */}
      </Container>
      {/* </Grid> */}
    </div>
  );
}
