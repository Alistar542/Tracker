import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FailOnFetchingDialog(props) {
  
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
        <DialogTitle id="alert-dialog-title">No Students Found</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}