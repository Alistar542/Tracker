import React, { useContext } from "react";
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
import { USER_TYPE } from "../../../constants";
import { AuthContext } from "../../LoginScreen/context/auth";
import { createNewUser } from "../../../actions/useractions"
import * as Yup from "yup";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  userSettingsDiv: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
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
    //borderWidth: "1px",
    //borderColor: "black",
    //borderStyle: "solid",
    padding: theme.spacing(2),
  },
  firstDiv: {
    display: "flex",
    flexDirection: "row",
  },
  secondDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
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
  officeCode: "",
  userType: "",
  userStatus: "A",
};
const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  officeCode: Yup.string().required("Required"),
  userType: Yup.string().required("Required"),
  userStatus: Yup.string().required("Required"),
});

export default function CreateUpdateStaffComponent(props) {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  const resetForm =   (formik) => {
    props.updateUserFound(null);
    formik.resetForm();
  }

  return (
    <div>
      <Paper elevation={0} className={classes.rootPaper}>
        <Typography component={"span"}>Create a new user</Typography>
        <Formik
          initialValues={props.userFound ? props.userFound :initialValues}
          validationSchema={validationSchema}
          enableReinitialize = {true}
          onSubmit={(values, { resetForm, setFieldError }) => {
            console.log(JSON.stringify(values, null, 2));
            createNewUser({ ...values }, currentUser)
              .then((res) => {
                console.log("Success");
                resetForm(initialValues);
              })
              .catch((err) => {
                console.log("ERROR creating user");
                setFieldError("userName", err.response.data);
              });
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
                    error={formik.errors.userName && formik.touched.userName}
                    helperText={
                      formik.errors.userName &&
                      formik.touched.userName &&
                      formik.errors.userName
                    }
                    {...formik.getFieldProps("userName")}
                  />
                  <TextField
                    id="standard"
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    margin="dense"
                    error={formik.errors.password && formik.touched.password}
                    helperText={
                      formik.errors.password &&
                      formik.touched.password &&
                      formik.errors.password
                    }
                    {...formik.getFieldProps("password")}
                  />
                  <TextField
                    id="standard"
                    label="Office Code"
                    name="officeCode"
                    variant="outlined"
                    margin="dense"
                    error={
                      formik.errors.officeCode && formik.touched.officeCode
                    }
                    helperText={
                      formik.errors.officeCode &&
                      formik.touched.officeCode &&
                      formik.errors.officeCode
                    }
                    {...formik.getFieldProps("officeCode")}
                  />
                </div>
                <div className={classes.secondDiv}>
                  <FormControl
                    margin="dense"
                    variant="outlined"
                    className={classes.userTypeSelect}
                    error={formik.errors.userType && formik.touched.userType}
                  >
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
                      {...formik.getFieldProps("userType")}
                    >
                      <MenuItem value={USER_TYPE.ADMINISTRATOR}>
                        ADMINISTRATOR
                      </MenuItem>
                      <MenuItem value={USER_TYPE.EMPLOYEE}>EMPLOYEE</MenuItem>
                    </Select>
                    <FormHelperText>
                      {formik.errors.userType &&
                        formik.touched.userType &&
                        formik.errors.userType}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    margin="dense"
                    variant="outlined"
                    className={classes.userTypeSelect}
                  >
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
                      error={
                        formik.errors.userStatus && formik.touched.userStatus
                      }
                      helperText={
                        formik.errors.userStatus &&
                        formik.touched.userStatus &&
                        formik.errors.userStatus
                      }
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
                  {props.userFound ? "Update" : "Create"}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => resetForm(formik)}
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
