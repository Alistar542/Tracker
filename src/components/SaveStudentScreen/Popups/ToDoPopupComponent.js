import React ,{useContext}from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AuthContext } from "../../LoginScreen/context/auth";

export default function ToDoPopupComponent(props) {
  const { openToDoPopup, handleToDoClose, handleSubmitToDo } = props;
  const [toDoRemarks, setToDoRemarks] = React.useState();
  const { currentUser } = useContext(AuthContext);
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}`;

  const onChangeToDoRemarks = (data) => {
    setToDoRemarks(data.target.value);
  };

  const handleSave = () => {
    if(toDoRemarks){
      let toDoRemarksConcated=`"`+toDoRemarks+`"`+" :"+currentUser.userName+" @"+date;
      handleSubmitToDo(toDoRemarksConcated);
    }else{
      handleToDoClose();
    }
  };
  return (
    <div>
      <Dialog
        open={openToDoPopup}
        onClose={handleToDoClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">Comments from Counselor</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter comments</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Remarks"
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
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
