import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FollowUpPopupComponent(props) {
  const {
    openFollowUpPopup,
    handleFollowUpClose,
    handleSubmitFollowUp,
  } = props;
  const [followUpRemarks, setFollowUpRemarks] = React.useState();

  const onChangeFollowUpRemarks = (data) => {
    setFollowUpRemarks(data.target.value);
  };

  const handleSave = () => {
    handleSubmitFollowUp(followUpRemarks);
  };
  return (
    <div>
      <Dialog
        open={openFollowUpPopup}
        onClose={handleFollowUpClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">Follow Up Remarks</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter Follow Up Remarks</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Follow Up Remarks"
            type="text"
            fullWidth
            onChange={onChangeFollowUpRemarks}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFollowUpClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
