import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";

export default function AlertDialog(props) {
  const {
    openDialog,
    handleCloseDialog,
    dialogContentText,
    dialogTitleText,
  } = props;

  const failureSubmit = () => {
    handleCloseDialog(false, false);
  };
  const successSubmit = () => {
    handleCloseDialog(false, true);
  };
  return (
    <Dialog
      open={openDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitleText}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogContentText}
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={failureSubmit} color="primary">
          No
        </Button>
        <Button onClick={successSubmit} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
