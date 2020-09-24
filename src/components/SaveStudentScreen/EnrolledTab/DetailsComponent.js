import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { CURRENCY } from "../../../constants";
import Divider from "@material-ui/core/Divider";
import FollowUpComponent from "../Common/FollowUpComponent";
import ToDoComponent from "../Common/ToDoComponent";
import ProspectusSummaryComponent from "../Common/ProspectusSummaryComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
  },
  mainDetailsDiv: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  formControlSelect: {
    margin: theme.spacing(1),
    width: 200,
  },
}));

export default function DetailsComponent(props) {
  const { formik, followUpRemarks, toDoRemarks, studentFound } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ProspectusSummaryComponent studentFound={studentFound} />
      <div className={classes.mainDetailsDiv}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            openTo="year"
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="courseStartingDate"
            name="courseStartingDate"
            label="Course Starting Date"
            views={["year", "month", "date"]}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            value={formik.values.courseStartingDate}
            onChange={(value) =>
              formik.setFieldValue("courseStartingDate", value)
            }
          />
        </MuiPickersUtilsProvider>
        <FormControl className={classes.formControlSelect}>
          <InputLabel id="demo-simple-select-label">Currency</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="currency"
            name="currency"
            {...formik.getFieldProps("currency")}
          >
            {CURRENCY.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          id="totalTutionFees"
          label="Total Tution Fees"
          size="small"
          name="totalTutionFees"
          error={
            formik.errors.totalTutionFees && formik.touched.totalTutionFees
          }
          helperText={
            formik.errors.totalTutionFees &&
            formik.touched.totalTutionFees &&
            formik.errors.totalTutionFees
          }
          {...formik.getFieldProps("totalTutionFees")}
        />
        <TextField
          margin="dense"
          id="annualTutionFees"
          label="Annual Tution Fees"
          size="small"
          name="annualTutionFees"
          error={
            formik.errors.annualTutionFees && formik.touched.annualTutionFees
          }
          helperText={
            formik.errors.annualTutionFees &&
            formik.touched.annualTutionFees &&
            formik.errors.annualTutionFees
          }
          {...formik.getFieldProps("annualTutionFees")}
        />
        <TextField
          margin="dense"
          id="totalCommission"
          label="Total Commission"
          size="small"
          name="totalCommission"
          error={
            formik.errors.totalCommission && formik.touched.totalCommission
          }
          helperText={
            formik.errors.totalCommission &&
            formik.touched.totalCommission &&
            formik.errors.totalCommission
          }
          {...formik.getFieldProps("totalCommission")}
        />
        <TextField
          margin="dense"
          id="firstCommission"
          label="First Commission"
          size="small"
          name="firstCommission"
          error={
            formik.errors.firstCommission && formik.touched.firstCommission
          }
          helperText={
            formik.errors.firstCommission &&
            formik.touched.firstCommission &&
            formik.errors.firstCommission
          }
          {...formik.getFieldProps("firstCommission")}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            openTo="year"
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="invoiceDate"
            name="invoiceDate"
            label="Invoice Date"
            views={["year", "month", "date"]}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            value={formik.values.invoiceDate}
            onChange={(value) => formik.setFieldValue("invoiceDate", value)}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            openTo="year"
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="nextInvoiceDate"
            name="nextInvoiceDate"
            label="Next Invoice Date"
            views={["year", "month", "date"]}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            value={formik.values.nextInvoiceDate}
            onChange={(value) => formik.setFieldValue("nextInvoiceDate", value)}
          />
        </MuiPickersUtilsProvider>
        <TextField
          margin="dense"
          id="balanceCommission"
          label="Balance Commission"
          size="small"
          name="balanceCommission"
          error={
            formik.errors.balanceCommission && formik.touched.balanceCommission
          }
          helperText={
            formik.errors.balanceCommission &&
            formik.touched.balanceCommission &&
            formik.errors.balanceCommission
          }
          {...formik.getFieldProps("balanceCommission")}
        />
      </div>
      <Divider />
      <FollowUpComponent followUpRemarks={followUpRemarks} />
      <ToDoComponent toDoRemarks={toDoRemarks} />
    </div>
  );
}
