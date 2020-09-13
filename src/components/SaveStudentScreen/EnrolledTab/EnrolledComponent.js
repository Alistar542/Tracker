import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { STATUS } from "../../../constants";
import DetailsComponent from "./DetailsComponent";
import { Formik } from "formik";
import * as Yup from "yup";
import { saveEnrolledInfo } from "../../../actions/studentactions";
import { AuthContext } from "../../LoginScreen/context/auth";

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
};
const validationSchema = Yup.object().shape({});

export default function EnrolledComponent(props) {
  const classes = useStyles();
  const { studentToUpdate } = props;
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          saveEnrolledInfo(values, currentUser)
            .then((res) => {})
            .catch((err) => {});
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
                {` Save `}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
