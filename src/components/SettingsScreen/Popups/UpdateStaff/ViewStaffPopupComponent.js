import React, { useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as Yup from "yup";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { USER_TYPE } from "../../../../constants";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { AuthContext } from "../../../LoginScreen/context/auth";
import { updateUser } from "../../../../actions/useractions";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Required"),
  password: Yup.string().when("changePassword", {
    is: (val) => val === true,
    then: Yup.string().required("Required"),
  }),
  officeCode: Yup.string().required("Required"),
  userType: Yup.string().required("Required"),
  userStatus: Yup.string().required("Required"),
});

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
    padding: theme.spacing(2),
    margin: theme.spacing(2),
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

export default function ViewStaffPopupComponent(props) {
  const classes = useStyles();
  const { openToDoPopup, handleToDoClose } = props;
  const { currentUser } = useContext(AuthContext);

  let { selectedUser } = props;
  selectedUser = { ...selectedUser, changePassword: false };

  return (
    <div>
      <Dialog
        open={openToDoPopup}
        onClose={handleToDoClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth={false}
      >
        <DialogTitle id="form-dialog-title">Update User</DialogTitle>

        <Formik
          initialValues={selectedUser}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values, { resetForm, setFieldError }) => {
            console.log(JSON.stringify(values, null, 2));
            updateUser({ ...values }, currentUser)
              .then((res) => {
                console.log("Success");
                handleToDoClose(false);
                //resetForm(initialValues);
              })
              .catch((err) => {
                console.log("ERROR updating user");
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
              <DialogContent>
                <div className={classes.userSettingsDiv}>
                  <div className={classes.firstDiv}>
                    <TextField
                      id="standard"
                      label="User Name"
                      name="userName"
                      variant="outlined"
                      margin="dense"
                      disabled={true}
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
                      label="Office Code"
                      name="officeCode"
                      variant="outlined"
                      margin="dense"
                      disabled={true}
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
                          Administrator
                        </MenuItem>
                        <MenuItem value={USER_TYPE.EMPLOYEE}>Employee</MenuItem>
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
                        <MenuItem value={"A"}>Active</MenuItem>
                        <MenuItem value={"I"}>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="changePassword"
                        {...formik.getFieldProps("changePassword")}
                      />
                    }
                    label="Change Password"
                  />
                  {formik.values.changePassword ? (
                    <div>
                      <TextField
                        id="standard"
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        margin="dense"
                        error={
                          formik.errors.password && formik.touched.password
                        }
                        helperText={
                          formik.errors.password &&
                          formik.touched.password &&
                          formik.errors.password
                        }
                        {...formik.getFieldProps("password")}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </DialogContent>
              <Divider />
              <DialogActions>
                <Button
                  onClick={handleToDoClose}
                  color="primary"
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Update
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
