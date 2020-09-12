import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DetailsPanelComponent from "./DetailsPanelComponent";
import Button from "@material-ui/core/Button";
import { STATUS } from "../../../constants";
import { Formik } from "formik";
import * as Yup from "yup";

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
    padding: theme.spacing(1),
    "& .MuiButton-root": {
      margin: theme.spacing(1),
    },
    width: "100%",
    minHeight: "70px",
    marginTop: "auto",
  },
}));

const initialValues = {
  visaApplnStatus: "",
  visaStatus: "",
  visaApplnPrcDate: null,
  visaApRjDate: null,
  travelDate: null,
};

const validationSchema = Yup.object().shape({});

export default function ProposalComponent(props) {
  const classes = useStyles();
  const { studentToUpdate } = props;

  // const handleStatusChange = () => {
  //   let studentToBeUpdated = { ...studentToUpdate };
  //   if (studentToUpdate.status === STATUS.DONE) {
  //     return;
  //   }
  //   setBackDropState(true);
  //   updateStudent(studentToBeUpdated, currentUser)
  //     .then((res) => {
  //       setFormData((previousStudentData) => ({
  //         ...previousStudentData,
  //         status: studentToBeUpdated.status,
  //       }));
  //       props.updateStudentFoundForSummary(studentToBeUpdated);
  //       setBackDropState(false);
  //       return res;
  //     })
  //     .catch((err) => {
  //       setBackDropState(false);
  //       return err;
  //     });
  // };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          //submitApplicationDtls(values, setSubmitting, resetForm);
          console.log("Inside Proposal Component Submit");
          console.log(values);
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
              <DetailsPanelComponent formik={formik} />
            </div>
            <div className={classes.bottomBar}>
              <Button variant="contained" color="primary">
                {" "}
                Mark As Travelled{" "}
              </Button>
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
