import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme=>({
  fail:{
    backgroundColor:"red",
    color:"white"
  },
}));
export default function FailDialog(props) {
  const classes = useStyles();

  const handleClose = () => {
    props.setDialogStateFn(false);
  };

  return (
    <div>
      <Dialog
        open={props.dialogState}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.fail}>Could Not Save The Data</DialogTitle>
        <DialogActions className={classes.fail}>
          <Button onClick={handleClose} className={classes.fail}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}