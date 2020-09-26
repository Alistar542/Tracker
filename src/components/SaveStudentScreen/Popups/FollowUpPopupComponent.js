import React,{useContext} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AuthContext } from "../../LoginScreen/context/auth";

export default function FollowUpPopupComponent(props) {
  const {
    openFollowUpPopup,
    handleFollowUpClose,
    handleSubmitFollowUp,
  } = props;
  const [followUpRemarks, setFollowUpRemarks] = React.useState();
  const { currentUser } = useContext(AuthContext);
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}`;

  const onChangeFollowUpRemarks = (data) => {
    setFollowUpRemarks(data.target.value);
  };

  const handleSave = () => {
    if(followUpRemarks){
      let followUpRemarksConcated=currentUser.userName+" @"+date+": "+`"`+followUpRemarks+`"`;
      handleSubmitFollowUp(followUpRemarksConcated);
    }
    else{
      handleFollowUpClose();
    }
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
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
