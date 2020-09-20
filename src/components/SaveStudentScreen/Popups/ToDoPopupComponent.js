import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function ToDoPopupComponent(props) {
  const { openToDoPopup, handleToDoClose, handleSubmitToDo } = props;
  const [toDoRemarks, setToDoRemarks] = React.useState();

  const onChangeToDoRemarks = (data) => {
    setToDoRemarks(data.target.value);
  };

  const handleSave = () => {
    handleSubmitToDo(toDoRemarks);
  };
  return (
    <div>
      <Dialog
        open={openToDoPopup}
        onClose={handleToDoClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">To Do Remarks</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter To Do Remarks</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="To Do Remarks"
            type="text"
            fullWidth
            onChange={onChangeToDoRemarks}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToDoClose} color="primary">
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
