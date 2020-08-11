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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1),
    height: "100%",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "white",
    padding: "10%",
    borderRadius: "1%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper_div: {
    background: "blue",
  },
  back: {
    height: "100vh",
    display: "flex",
    backgroundPosition: "center",
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
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
}));

export default function LoginComponent() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const { userName, password } = event.target.elements;
    const user = {
      userName: userName.value.trim(),
      password: password.value,
    };
    loginUser(user)
      .then((res) => {
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
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
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
              helperText={error ? "Incorrect username or password" : ""}
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
        </div>
      </Container>
    </div>
  );
}
