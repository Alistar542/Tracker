import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import clsx from "clsx";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import ExportAsExcelComponent from "./ExportAsExcelComponent";
import { teal } from "@material-ui/core/colors";
import { APPLICATION_STATUS_ARRAY } from "../../constants";

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    width: 100,
    height: 40,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  createButtonStyle: {
    height: 40,
    marginLeft: theme.spacing(1),
    backgroundColor: teal[600],
    "&:hover": {
      backgroundColor: teal[700],
    },
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
    "& .MuiIconButton-root": {
      marginRight: -theme.spacing(1),
    },
  },
  formControlSelect: {
    minWidth: 200,
    marginRight: theme.spacing(1),
  },
  cardComponent: {},
  selectField: {
    height: 40,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    margin: theme.spacing(1),
  },
  expandOpen: {
    marginLeft: "auto",
    transform: "rotate(180deg)",
    margin: theme.spacing(1),
  },
}));

export function FilterComponent(props) {
  const classes = useStyles();
  const [dateToFetch, setSelectedDateToFetch] = React.useState(null);
  const [status, setStatus] = React.useState(APPLICATION_STATUS_ARRAY[0].value);
  const [firstName, setFirstName] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [studentId, setStudentId] = React.useState("");
  const [creationFromDate, setCreationFromDate] = React.useState(null);
  const [creationToDate, setCreationToDate] = React.useState(null);
  const [courseStartDate, setCourseStartDate] = React.useState(null);

  const handleDateChangeToFetch = (date) => {
    if (date) {
      setSelectedDateToFetch(new Date(date));
    } else {
      setSelectedDateToFetch(null);
    }
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleStatusChange = (data) => {
    setStatus(data.target.value);
  };

  const handlePriorityChange = (data) => {
    setPriority(data.target.value);
  };

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };

  const handleCreatedFromDate = (date) => {
    setCreationFromDate(date);
  };

  const handleCreatedToDate = (date) => {
    setCreationToDate(date);
  };

  const handleCourseStartDate = (date) => {
    setCourseStartDate(date);
  };

  const handleSubmitForFetching = (event) => {
    event.preventDefault();
    const fetchObject = {
      followUpDate: dateToFetch,
      status: status,
      priority: priority,
      currentUser: "admin",
      firstName: firstName,
      phoneNumber: phoneNumber,
      studentId: studentId,
      creationFromDate: creationFromDate,
      creationToDate: creationToDate,
      courseStartDate: courseStartDate,
    };
    props.handleSubmitForFetching(fetchObject);
  };

  const clearValues = () => {
    setSelectedDateToFetch(null);
    setStatus();
    setFirstName("");
    setPhoneNumber("");
    setCreationFromDate(null);
    setCreationToDate(null);
    setStudentId("");
    setCourseStartDate(null);
    setPriority();
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
                label="Student First Name"
                name="firstName"
                variant="outlined"
                margin="dense"
                value={firstName}
                onChange={handleFirstNameChange}
              />

            <TextField
              id="standard"
              label="Student Id"
              name="studentId"
              variant="outlined"
              margin="dense"
              value={studentId}
              onChange={handleStudentIdChange}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant="inline"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                margin="dense"
                id="date-picker-inline"
                label="Follow up date"
                value={dateToFetch}
                onChange={handleDateChangeToFetch}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <FormControl
              margin="dense"
              variant="outlined"
              className={classes.formControlSelect}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Application Stage
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={status}
                onChange={handleStatusChange}
                label="Application Stage"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {APPLICATION_STATUS_ARRAY.map((applicationStatus) => {
                  return (
                    <MenuItem value={applicationStatus.value}>
                      {applicationStatus.status}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            
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
            {props.studentsFound && props.studentsFound.length > 0 ? (
              <ExportAsExcelComponent
                studentsFound={props.studentsFound}
              ></ExportAsExcelComponent>
            ) : (
              ""
            )}
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.cardContentDiv}>
            <FormControl
              margin="dense"
              variant="outlined"
              className={classes.formControlSelect}
            >
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="priority"
                name="priority"
                value={priority}
                onChange={handlePriorityChange}
                label="Priority"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="H">High</MenuItem>
                <MenuItem value="M">Medium</MenuItem>
                <MenuItem value="L">Low</MenuItem>
              </Select>
            </FormControl>
              <TextField
                id="standard"
                label="Phone Number"
                name="phoneNumber"
                variant="outlined"
                margin="dense"
                value={phoneNumber}
                onChange={handlePhoneNumber}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  margin="dense"
                  id="date-picker-inline"
                  label="Created From Date"
                  value={creationFromDate}
                  onChange={handleCreatedFromDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  margin="dense"
                  id="date-picker-inline"
                  label="Created To Date"
                  value={creationToDate}
                  onChange={handleCreatedToDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  margin="dense"
                  id="date-picker-inline"
                  label="Course Start Date"
                  value={courseStartDate}
                  onChange={handleCourseStartDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </CardContent>
          </Collapse>
        </form>
      </Card>
    </div>
  );
}
