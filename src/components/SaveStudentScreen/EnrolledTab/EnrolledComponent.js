import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { OPERATION_FLAG } from "../../../constants";
import DetailsComponent from "./DetailsComponent";
import { Formik } from "formik";
import * as Yup from "yup";
import { saveEnrolledInfo } from "../../../actions/studentactions";
import { AuthContext } from "../../LoginScreen/context/auth";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  innerDiv: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - 200px)`,
  },
  detailsDiv: {
    overflow: "auto",
  },
  bottomBar: {
    bottom: 0,
    background: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    "& .MuiButton-root": {
      margin: theme.spacing(1),
    },
    width: "100%",
    minHeight: "53px",
    marginTop: "auto",
  },
}));

const initialValues = {
  totalTutionFees: "",
  annualTutionFees: "",
  totalCommission: "",
  firstCommission: "",
  balanceCommission: "",
  courseStartingDate: null,
  nextInvoiceDate: null,
  invoiceDate: null,
  currency: "",
  operationFlag: OPERATION_FLAG.INSERT,
};
const validationSchema = Yup.object().shape({});

export default function EnrolledComponent(props) {
  const classes = useStyles();
  const { studentFound, updateStudentFoundForSummary } = props;
  const [backDropState, setBackDropState] = React.useState(false);
  const { currentUser } = useContext(AuthContext);

  const isUpdate = studentFound
    ? studentFound.enrolledInfo
      ? true
      : false
    : false;

  return (
    <div className={classes.root}>
      <Formik
        initialValues={
          studentFound
            ? studentFound.enrolledInfo
              ? studentFound.enrolledInfo
              : initialValues
            : initialValues
        }
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setBackDropState(true);
          let enrolledInfo = {
            ...values,
          };
          let saveData = { ...studentFound };
          saveData.enrolledInfo = enrolledInfo;
          saveEnrolledInfo(saveData, currentUser)
            .then((res) => {
              let tempData = {
                ...saveData,
                enrolledInfo: {
                  ...enrolledInfo,
                  operationFlag: OPERATION_FLAG.UPDATE,
                },
              };
              updateStudentFoundForSummary(tempData);
            })
            .catch((err) => {})
            .finally(() => setBackDropState(false));
        }}
        validateOnBlur={false}
      >
        {(formik) => (
          <form
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            className={classes.innerDiv}
          >
            <div className={classes.detailsDiv}>
              <DetailsComponent formik={formik} />
            </div>

            <div className={classes.bottomBar}>
              <Button variant="contained" color="primary" type="submit">
                {isUpdate ? ` Update Enrolled ` : ` Save Enrolled `}
              </Button>
            </div>
          </form>
        )}
      </Formik>
      <Backdrop className={classes.backdrop} open={backDropState}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
