import "date-fns";
import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import clsx from "clsx";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import axios from "axios";
import SuccessDialog from "../../Dialogs/SuccessDialog";
import FailDialog from "../../Dialogs/FailDialog";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useLocation } from "react-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { green, indigo, red } from "@material-ui/core/colors";
import {
  STATUS,
  OPERATION_FLAG,
  APPLCTN_STS_ARRY_PROSPECTUS,
} from "../../../constants";
import {
  updateStudent,
  saveStudent,
  updateStatusOfStudent,
  validatePhoneNumber,
  validateEmail,
} from "../../../actions/studentactions";
import { AuthContext } from "../../LoginScreen/context/auth";
import SnackbarCommon from "../../Common/SnackbarCommon";
import ToDoPopupComponent from "../Popups/ToDoPopupComponent";
import FollowUpPopupComponent from "../Popups/FollowUpPopupComponent";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";
import DetailsPanelComponent from "./DetailsPanelComponent";
import ToDoComponent from "../Common/ToDoComponent";

const useStyles = makeStyles((theme) => ({
  personalInfoDiv: {
    margin: theme.spacing(0, 1),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    "& .MuiTextField-root": {
      margin: theme.spacing(0, 1),
      width: 200,
    },
  },
  formControlSelect: {
    margin: theme.spacing(0, 1),
    width: 200,
  },
  outerDiv: {
    margin: theme.spacing(2, 0),
  },
}));

export default function RemarksFromStudentComponent(props) {
  const classes = useStyles();
  const {toDoRemarks,setToDoRemarks}=props;
  const [openToDoPopup, setOpenToDoPopup] = React.useState(false);
  const openToDoPopupFn = (event) => {
    event.preventDefault();
    setOpenToDoPopup(true);
  };
  

  const closeToDoPopupFn = (event) => {
    setOpenToDoPopup(false);
  };
  const handleSubmitToDo = (remarks) => {
    setOpenToDoPopup(false);
    let remarksCopy = toDoRemarks ? toDoRemarks : [];
    let newRemarks = {
      remark:remarks,
      operationFlag: OPERATION_FLAG.INSERT,
    };
    remarksCopy.push(newRemarks);
    setToDoRemarks(remarksCopy);
  };

  return (
    <div className={classes.outerDiv}>
      <Typography component={"span"} variant="h7">
        Comments from Counselor
      </Typography>
      &nbsp; &nbsp;
      <Button variant="contained" color="primary" onClick={openToDoPopupFn}>
        {" "}
        Add{" "}
      </Button>
      <br/>
      <div className={classes.personalInfoDiv}>
        <ToDoPopupComponent
          openToDoPopup={openToDoPopup}
          handleToDoClose={closeToDoPopupFn}
          handleSubmitToDo={handleSubmitToDo}
        />
        <ToDoComponent toDoRemarks={toDoRemarks} />
      </div>
    </div>
  );
}
