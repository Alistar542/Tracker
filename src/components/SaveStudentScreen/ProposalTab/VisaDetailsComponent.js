import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiFormControl-root": {
      margin: theme.spacing(1),
    },
    "& .MuiTextField-root": {
      width: 250,
    },
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    minHeight: "100px",
  },
  radioComponent: {
    marginLeft: theme.spacing(2),
  },
}));

export default function VisaDetailsComponent(props) {
  const { formik } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormControl component="fieldset">
        <FormLabel component="legend" className={classes.radioComponent}>
          Visa Application Status
        </FormLabel>
        <RadioGroup
          row
          aria-label="visaApplnStatus"
          name="visaApplnStatus"
          {...formik.getFieldProps("visaApplnStatus")}
        >
          <FormControlLabel
            value="A"
            labelPlacement="start"
            control={<Radio color="primary" />}
            label="Applied"
          />
          <FormControlLabel
            value="N"
            labelPlacement="start"
            control={<Radio color="primary" />}
            label="Not Applied"
          />
        </RadioGroup>
      </FormControl>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk
          openTo="year"
          variant="inline"
          inputVariant="outlined"
          format="dd/MM/yyyy"
          margin="dense"
          id="visaApplnPrcDate"
          name="visaApplnPrcDate"
          label="Visa Process Date"
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          value={formik.values.visaApplnPrcDate}
          onChange={(value) => formik.setFieldValue("visaApplnPrcDate", value)}
        />
      </MuiPickersUtilsProvider>
      <FormControl component="fieldset">
        <FormLabel component="legend" className={classes.radioComponent}>
          Visa Status
        </FormLabel>
        <RadioGroup
          row
          aria-label="visaStatus"
          name="visaStatus"
          {...formik.getFieldProps("visaStatus")}
        >
          <FormControlLabel
            value="A"
            labelPlacement="start"
            control={<Radio color="primary" />}
            label="Approved"
          />
          <FormControlLabel
            value="R"
            labelPlacement="start"
            control={<Radio color="primary" />}
            label="Rejected"
          />
        </RadioGroup>
      </FormControl>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk
          openTo="year"
          variant="inline"
          inputVariant="outlined"
          format="dd/MM/yyyy"
          margin="dense"
          id="visaApRjDate"
          name="visaApRjDate"
          label="Visa Apprvd/Rej Date"
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          value={formik.values.visaApRjDate}
          onChange={(value) => formik.setFieldValue("visaApRjDate", value)}
        />
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk
          openTo="year"
          variant="inline"
          inputVariant="outlined"
          format="dd/MM/yyyy"
          margin="dense"
          id="travelDate"
          name="travelDate"
          label="Travel Date"
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          value={formik.values.travelDate}
          onChange={(value) => formik.setFieldValue("travelDate", value)}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}
