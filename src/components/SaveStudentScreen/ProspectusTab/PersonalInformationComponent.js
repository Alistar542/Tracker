import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  personalInfoDiv: {
    margin: theme.spacing(0, 1),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  formControlSelect: {
    margin: theme.spacing(0, 1),
    width: 200,
  },
  outerDiv: {
    margin: theme.spacing(2, 0),
  },
}));

export default function PersonalInformationComponent({
  touched,
  errors,
  values,
  getFieldProps,
  setFieldValue,
}) {
  const classes = useStyles();
  console.log("rendering PersonalInfoComponent");
  return (
    <div className={classes.outerDiv}>
      <Typography component={"span"} variant="h7">
        Personal Information
      </Typography>
      <div className={classes.personalInfoDiv}>
        <TextField
          required
          id="firstName"
          error={errors.firstName && touched.firstName}
          label="First Name"
          name="firstName"
          helperText={errors.firstName && touched.firstName && errors.firstName}
          {...getFieldProps("firstName")}
        />

        <TextField
          id="middleName"
          error={errors.middleName && touched.middleName}
          label="Middle Name"
          name="middleName"
          helperText={
            errors.middleName && touched.middleName && errors.middleName
          }
          {...getFieldProps("middleName")}
        />

        <TextField
          required
          id="lastName"
          error={errors.lastName && touched.lastName}
          label="Last Name"
          name="lastName"
          helperText={errors.lastName && touched.lastName && errors.lastName}
          {...getFieldProps("lastName")}
        />

        <TextField
          required
          id="email"
          label="Email"
          name="email"
          error={errors.email && touched.email}
          helperText={errors.email && touched.email && errors.email}
          {...getFieldProps("email")}
        />

        <TextField
          required
          id="ohoneNumber"
          error={errors.phoneNumber && touched.phoneNumber}
          label="Phone"
          name="phoneNumber"
          helperText={
            errors.phoneNumber && touched.phoneNumber && errors.phoneNumber
          }
          {...getFieldProps("phoneNumber")}
        />

        <TextField
          required
          id="additionalPhNo"
          error={errors.additionalPhNo && touched.additionalPhNo}
          label="Addl. Phone"
          name="additionalPhNo"
          helperText={
            errors.additionalPhNo &&
            touched.additionalPhNo &&
            errors.additionalPhNo
          }
          {...getFieldProps("additionalPhNo")}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            openTo="year"
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="dateOfBirth"
            name="dateOfBirth"
            label="Date Of Birth"
            views={["year", "month", "date"]}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            value={values.dateOfBirth}
            onChange={(value) => setFieldValue("dateOfBirth", value)}
          />
        </MuiPickersUtilsProvider>

        <FormControl className={classes.formControlSelect}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="gender"
            name="gender"
            {...getFieldProps("gender")}
          >
            <MenuItem value={"M"}>Male</MenuItem>
            <MenuItem value={"F"}>Female</MenuItem>
            <MenuItem value={"O"}>Other</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControlSelect}>
          <InputLabel id="demo-simple-select-label">Marital Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="maritalStatus"
            name="maritalStatus"
            {...getFieldProps("maritalStatus")}
          >
            <MenuItem value={"M"}>Married</MenuItem>
            <MenuItem value={"F"}>Un-Married</MenuItem>
          </Select>
        </FormControl>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="followUpDate"
            name="followUpDate"
            label="Follow up date"
            value={values.followUpDate}
            onChange={(value) => setFieldValue("followUpDate", value)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
    </div>
  );
}
