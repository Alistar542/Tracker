import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { USER_TYPE } from "../../constants";

const useStyles = makeStyles((theme) => ({
  userSettingsDiv: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
    alignItems: "center",
    flexWrap: "wrap",
  },
  formDiv: {
    margin: theme.spacing(1),
  },
  userTypeSelect: {
    width: 200,
    margin: theme.spacing(1),
  },
  rootPaper: {
    borderWidth: "1px",
    borderColor: "black",
    borderStyle: "solid",
    padding: theme.spacing(2),
  },
  firstDiv: {
    display: "flex",
    flexDirection: "row",
  },
  secondDiv: {
    display: "flex",
    flexDirection: "row",
  },
  actionButtonDiv: {
    display: "flex",
    flexDirection: "row",
    "& .MuiButton-root": {
      margin: theme.spacing(1),
    },
    justifyContent: "flex-end",
  },
}));

const initialValues = {
  userName: "",
  password: "",
  userType: "",
  userStatus: "A",
};

export default function UserSettingsComponent() {
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={0} className={classes.rootPaper}>
        <Typography component={"span"}>Create a new user</Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log(JSON.stringify(values, null, 2));
          }}
        >
          {(formik) => (
            <form
              noValidate
              autoComplete="off"
              className={classes.formDiv}
              onSubmit={formik.handleSubmit}
            >
              <div className={classes.userSettingsDiv}>
                <div className={classes.firstDiv}>
                  <TextField
                    id="standard"
                    label="User Name"
                    name="userName"
                    variant="outlined"
                    margin="dense"
                    {...formik.getFieldProps("userName")}
                  />
                  <TextField
                    id="standard"
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    margin="dense"
                    {...formik.getFieldProps("password")}
                  />
                </div>
                <div className={classes.secondDiv}>
                  <FormControl margin="dense" variant="outlined">
                    <InputLabel id="demo-simple-select-label">
                      User Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="userType"
                      name="userType"
                      label="User Type"
                      variant="outlined"
                      margin="dense"
                      className={classes.userTypeSelect}
                      {...formik.getFieldProps("userType")}
                    >
                      <MenuItem value={USER_TYPE.ADMINISTRATOR}>
                        ADMINISTRATOR
                      </MenuItem>
                      <MenuItem value={USER_TYPE.EMPLOYEE}>EMPLOYEE</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl margin="dense" variant="outlined">
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="userStatus"
                      name="userStatus"
                      label="User Status"
                      variant="outlined"
                      margin="dense"
                      className={classes.userTypeSelect}
                      {...formik.getFieldProps("userStatus")}
                    >
                      <MenuItem value={"A"}>ACTIVE</MenuItem>
                      <MenuItem value={"I"}>INACTIVE</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className={classes.actionButtonDiv}>
                <Button variant="contained" color="primary" type="submit">
                  Create
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={formik.resetForm}
                >
                  Clear
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Paper>
    </div>
  );
}
