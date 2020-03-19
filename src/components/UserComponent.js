import 'date-fns';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import SuccessDialog from './Dialogs/SuccessDialog';
import FailDialog from './Dialogs/FailDialog';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { flexbox } from '@material-ui/system';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation} from "react-router";
import {useAuth} from './Login/context/auth';


const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  formDiv :{
    margin : 0,
    padding: theme.spacing(3),
    marginBottom:theme.spacing(4)
  },
  personalInfoDiv:{
        margin: theme.spacing(1),
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems: 'stretch'
  },
  formControlSelect:{
    margin: theme.spacing(1),
    width: 200,
  },
  appBar: {
    top:'auto',
    bottom:0,
    background:'#42a5f5',
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    '& .MuiButton-root':{
      margin:theme.spacing(1)
    },
    width: `calc(100% - ${theme.spacing(7) + 1}px)`,
    position:'fixed',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));



export const UserComponent = () => {
  
  let locationFound = useLocation();
  let {studentFound} = locationFound.state ? locationFound.state : new Object();
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(studentFound?studentFound.followUpDate:null);
  const [dialogState,setDialogState]=React.useState(false);
  const [successOrFail, setSuccessOrFail] = React.useState(false);
  const [selectedDateOfBirth,setSelectedDateOfBirth] = React.useState(studentFound?studentFound.dateOfBirth:null);
  const [selectedExamDate,setExamDate] = React.useState(studentFound?studentFound.examDate:null);
  const [openFollowUpPopup, setOpenFollowUpPopup] = React.useState(false);
  const [backDropState,setBackDropState] = React.useState(false);
  const [followUpRemarks,setFollowUpRemarks] = React.useState(studentFound?studentFound.followUpRemarks:null);
  const {authTokens} = useAuth();
  const [formData,setFormData] = React.useState(studentFound ? studentFound : {});
  const [submitted,setSubmitted] = React.useState(false);

  const handleDateChange = date => {
    if(date)
    setSelectedDate(new Date(date.getFullYear(),date.getMonth(),date.getDate()));
  };

  const onChangeValidate = event => {
    setSubmitted(false); 
    let formDataClone = {...formData};
    formDataClone[event.target.name] = event.target.value;
    setFormData(formDataClone);
  }

  const onSubmit=(event)=>{
    event.preventDefault();
    setBackDropState(true);
    
    const userObject ={
      firstName:formData.firstName,
      middleName:formData.middleName,
      lastName:formData.lastName,
      email:formData.email,
      phoneNumber:formData.phoneNumber,
      dateOfBirth:selectedDateOfBirth,
      gender:formData.gender,
      maritalStatus:formData.maritalStatus,
      courseInterested:formData.courseInterested,
      followUpDate:selectedDate,
      englishExamType:formData.englishExamType,
      examDate:selectedExamDate,
      overall:formData.overall,
      listening:formData.listening,
      reading:formData.reading,
      writing:formData.writing,
      speaking:formData.speaking,
      lastUpdateUser:authTokens.user,
      followUpRemarks:followUpRemarks
    }

    //console.log(userObject);
	if(typeof studentFound === 'undefined'){
//https://protected-gorge-55144.herokuapp.com/student/add
//http://localhost:5000/student/add
    axios.post('http://localhost:5000/student/add',userObject)
    .then(res => {console.log(res.data)
      setDialogState(true);
      setSuccessOrFail(true);
      setSubmitted(true);
      resetValues();
      setBackDropState(false);
    })
    .catch(err => {
      setDialogState(true);
      setSuccessOrFail(false);
      setBackDropState(false);
    });
	}else{

//update code
//https://protected-gorge-55144.herokuapp.com/student/update/
//http://localhost:5000/student/update/
	axios.post('http://localhost:5000/student/update/'+studentFound._id,userObject)
    .then(res => {
      console.log("success in client side")
	    setDialogState(true);
      setSuccessOrFail(true);
      setSubmitted(true);
      resetValues();
      setBackDropState(false);
    })
    .catch(err => {
		console.log("failed in client side")
      setDialogState(true);
      setSuccessOrFail(false);
      setBackDropState(false);
    });
	}
  }

  const resetValues=()=>{
    let formDataClone = formData;
    let formDataKeys = Object.keys(formDataClone);
    formDataKeys.forEach(formDatakey => {
      formDataClone[formDatakey]=null;
    });
    setFormData(formDataClone);
    setSelectedDate(null);
    setFollowUpRemarks(null);
  }

  const onChangeDOB = date => {
    if(date)
    setSelectedDateOfBirth(new Date(date.getFullYear(),date.getMonth(),date.getDate()));
  };

  const onChangeExamDate = date => {
    if(date)
    setExamDate(new Date(date.getFullYear(),date.getMonth(),date.getDate()));
  }


  const openFollowUpPopupFn = event => {
    event.preventDefault();
    setOpenFollowUpPopup(true);
  }

  const closeFollowUpPopupFn = event => {
    setOpenFollowUpPopup(false);
    var val = event.target.value;
  }

  const handleSubmitFollowUp = event => {
    event.preventDefault();
    setOpenFollowUpPopup(false);
    let remarksCopy= followUpRemarks?followUpRemarks:[];
    remarksCopy.push(event.target.followupremarks.value);
    //let follow_up_remarks = [...followUpRemarks,...event.target.followupremarks.value];
    setFollowUpRemarks(remarksCopy);
  }

  return(
             
    <div>
    <form className={classes.root} autoComplete="off" onSubmit={onSubmit}>
    <div id="formDiv" className={classes.formDiv}>
        <Typography component = "h6" variant = "h6" >
          Personal Information
        </Typography> 
    <div className={classes.personalInfoDiv}>

      <TextField required 
        id="standard-required" 
        error={formData.firstName === '' && !submitted} 
        label="First Name" 
        value={formData.firstName} 
        name="firstName" 
        helperText={formData.firstName==='' && !submitted?"This is a required field":''} 
        onChange={onChangeValidate} />
      
      <TextField id="standard-required" 
        label="Middle Name" 
        value={formData.middleName} 
        name="middleName" 
        onChange={onChangeValidate}/>

      <TextField required 
        id="standard-required"
        error={formData.lastName === ''  && !submitted} 
        label="Last Name" 
        name="lastName" 
        value={formData.lastName}
        helperText={formData.lastName==='' && !submitted?"This is a required field":''} 
        onChange={onChangeValidate} />

      <TextField 
        id="standard-required" 
        label="Email"
        name="email" 
        value={formData.email} 
        onChange={onChangeValidate}/>

      <TextField 
        required 
        id="standard-required"
        error={formData.phoneNumber === ''  && !submitted} 
        label="Phone"
        name="phoneNumber" 
        value={formData.phoneNumber}
        helperText={formData.phoneNumber==='' && !submitted?"This is a required field":''} 
        onChange={onChangeValidate} />

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date Of Birth"
          value={selectedDateOfBirth}
          onChange={onChangeDOB}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>

          <FormControl className={classes.formControlSelect}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="gender"
              value={formData.gender}
              onChange={onChangeValidate}
            >
              <MenuItem value={'M'}>Male</MenuItem>
              <MenuItem value={'F'}>Female</MenuItem>
              <MenuItem value={'O'}>Other</MenuItem>
            </Select>
            </FormControl>

            <FormControl className={classes.formControlSelect}>
            <InputLabel id="demo-simple-select-label">Marital Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={onChangeValidate}
            >
              <MenuItem value={'M'}>Married</MenuItem>
              <MenuItem value={'F'}>Un-Married</MenuItem>
            </Select>
            </FormControl>

      <TextField required 
        id="standard-required" 
        label="Interested Course"
        name="courseInterested"
        error={formData.courseInterested === ''  && !submitted} 
        value={formData.courseInterested}
        helperText={formData.courseInterested==='' && !submitted?"This is a required field":''} 
        onChange={onChangeValidate} />
      
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Follow up date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>

      </div>
      <br></br>
      <Divider/>
      <br></br>
      <Typography component = "h6" variant = "h6" >
          English Exam Type
        </Typography> 
        <div className={classes.personalInfoDiv}>
        <FormControl className={classes.formControlSelect}>
            <InputLabel id="demo-simple-select-label">English Exam Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.englishExamType}
              name="englishExamType"
              onChange={onChangeValidate}
            >
              <MenuItem value={'IELTS'}>IELTS</MenuItem>
              <MenuItem value={'TOEFL'}>TOEFL</MenuItem>
              <MenuItem value={'None'}>None</MenuItem>
            </Select>
            </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Exam Date"
          value={selectedExamDate}
          onChange={onChangeExamDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
          <TextField  id="standard" 
            label="Overall"
            name="overall"
            value={formData.overall} 
            onChange={onChangeValidate}/>
          <TextField  id="standard" 
            label="Listening" 
            name="listening"
            value={formData.listening} 
            onChange={onChangeValidate}/>
          <TextField  id="standard" 
            label="Reading" 
            name="reading"
            value={formData.reading} 
            onChange={onChangeValidate}/>
          <TextField  id="standard" 
            label="Writing"
            name="writing" 
            value={formData.writing} 
            onChange={onChangeValidate}/>
          <TextField  id="standard" 
            label="Speaking" 
            name="speaking"
            value={formData.speaking} 
            onChange={onChangeValidate}/>
        </div>
      <br></br>
      <br></br>
      <Divider/>
      <br></br>
      {followUpRemarks?<div>
      <Typography component = "h6" variant = "h6" >
          Follow Up Remarks
      </Typography>
      <div className={classes.personalInfoDiv}>
        <ul>
         
        {followUpRemarks.map((followUpRem,index) =>{
          return <li>{followUpRem}</li>
        })}
        </ul>
      </div></div>:<span></span>}
      
       {successOrFail?<SuccessDialog dialogState={dialogState} setDialogStateFn={setDialogState}/>
       :<FailDialog dialogState={dialogState} setDialogStateFn={setDialogState}/>}


      


       
        </div>
       <Toolbar position="fixed" className={classes.appBar}>
       <Button variant="contained" color="primary" onClick={openFollowUpPopupFn}> Follow Up </Button>
       <Button variant="contained" color="primary" type="submit"> Save </Button>
       </Toolbar>
       </form>
       <Dialog open={openFollowUpPopup} onClose={closeFollowUpPopupFn} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Follow Up</DialogTitle>
        <form id="followUpForm" onSubmit={handleSubmitFollowUp}>
        <DialogContent>
          <DialogContentText>
            Please enter the follow up details
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="followupremarks"
            label="Remarks"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFollowUpPopupFn} color="primary">
            Cancel
          </Button>
          <Button id="submitFollowUp" type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
        </form>
      </Dialog>


       <Backdrop className={classes.backdrop} open={backDropState}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>         
  );
}
