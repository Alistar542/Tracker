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
import {useAuth} from './Login/context/auth';
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
    height:'50%'
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
    minWidth: 160,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    background:'#42a5f5',
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    '& .MuiButton-root':{
      margin:theme.spacing(1)
    },
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
  const [dateToFetch, setSelectedDateToFetch] = React.useState();
  const [firstName, setFirstName] = React.useState(studentFound ? studentFound.firstName : '');
  const [lastName, setLastName] = React.useState(studentFound?studentFound.lastName:'');
  const [phoneNumber, setPhoneNumber] = React.useState(studentFound?studentFound.phoneNumber:'');
  const [interestedCourse, setInterestedCourse] = React.useState(studentFound?studentFound.courseInterested:'');
  const [dialogState,setDialogState]=React.useState(false);
  const [successOrFail, setSuccessOrFail] = React.useState(false);
  const [maritalStatus,setMaritalStatus] = React.useState();
  const [email,setEmail] = React.useState();
  const [middleName,setMiddleName] = React.useState();
  const [selectedDateOfBirth,setSelectedDateOfBirth] = React.useState(null);
  const [gender,setGender] = React.useState();
  const [englishExamType,setEnglishExamType] = React.useState();
  const [overall,setOverall] = React.useState();
  const [listening,setListening] = React.useState();
  const [reading,setReading] = React.useState();
  const [writing,setWriting] = React.useState();
  const [speaking,setSpeaking] = React.useState();
  const [selectedExamDate,setExamDate] = React.useState(null);
  const [openFollowUpPopup, setOpenFollowUpPopup] = React.useState(false);
  const [backDropState,setBackDropState] = React.useState(false);
  const [followUpRemarks,setFollowUpRemarks] = React.useState(studentFound?studentFound.followUpRemarks:new Array());

  const handleDateChange = date => {
    if(date)
    setSelectedDate(new Date(date.getFullYear(),date.getMonth(),date.getDate()));
  };

  const {authTokens} = useAuth();
  const handleSubmit=(event)=>{
    event.preventDefault();
    setBackDropState(true);
    const userObject ={
      firstName:firstName,
      lastName:lastName,
      phoneNumber:phoneNumber,
      courseInterested:interestedCourse,
      followUpDate:selectedDate,
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
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setSelectedDate(null);
    setInterestedCourse('');
    setFollowUpRemarks(new Array());
  }
  
  const onChangeFirstName = event =>{
    setFirstName(event.target.value);
  }

  const onChangeLastName = event =>{
    setLastName(event.target.value);
  }

  const onChangeInterestedCourse = event =>{
    setInterestedCourse(event.target.value);
  }

  const onChangePhoneNumber = event =>{
    setPhoneNumber(event.target.value);
  }

  const onChangeEmail = event =>{
    setEmail(event.target.value);
  }

  const onChangeMiddleName = event =>{
    setMiddleName(event.target.value);
  }

  const onChangeDOB = date => {
    if(date)
    setSelectedDateOfBirth(new Date(date.getFullYear(),date.getMonth(),date.getDate()));
  };

  const onChangeGender = event => {
    setGender(event.target.value);
  }

  const onChangeMaritalStatus = event =>{
    setMaritalStatus(event.target.value);
  }

  const onChangeListening = event => {

  }

  const onChangeWriting = event => {

  }

  const onChangeReading = event => {

  }

  const onChangeOverall = event => {

  }

  const onChangeSpeaking = event => {

  }

  const onChangeExamDate = date => {
    if(date)
    setExamDate(new Date(date.getFullYear(),date.getMonth(),date.getDate()));
  }

  const onChangeEnglishExamType = event => {
    
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
    let remarksCopy= followUpRemarks;
    remarksCopy.push(event.target.followupremarks.value);
    //let follow_up_remarks = [...followUpRemarks,...event.target.followupremarks.value];
    setFollowUpRemarks(remarksCopy);
  }

  return(
             
    <div>
    <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
    <div id="formDiv" className={classes.formDiv}>
        <Typography component = "h6" variant = "h6" >
          Personal Information
        </Typography> 
    <div className={classes.personalInfoDiv}>
      <TextField required id="standard-required" label="First Name" value={firstName} onChange={onChangeFirstName}/>
      <TextField id="standard-required" label="Middle Name" value={middleName} onChange={onChangeMiddleName}/>
      <TextField required id="standard-required" label="Last Name" value={lastName} onChange={onChangeLastName}/>
      <TextField id="standard-required" label="Email" value={email} onChange={onChangeEmail}/>
      <TextField required id="standard-required" label="Phone Number" value={phoneNumber} onChange={onChangePhoneNumber}/>
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
              value={gender}
              onChange={onChangeGender}
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
              value={maritalStatus}
              onChange={onChangeMaritalStatus}
            >
              <MenuItem value={'M'}>Married</MenuItem>
              <MenuItem value={'F'}>Un-Married</MenuItem>
            </Select>
            </FormControl>
      <TextField required id="standard-required" label="Interested Course" value={interestedCourse} onChange={onChangeInterestedCourse}/>
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
              value={englishExamType}
              onChange={onChangeEnglishExamType}
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
          <TextField  id="standard" label="Overall" value={overall} onChange={onChangeOverall}/>
          <TextField  id="standard" label="Listening" value={listening} onChange={onChangeListening}/>
          <TextField  id="standard" label="Reading" value={reading} onChange={onChangeReading}/>
          <TextField  id="standard" label="Writing" value={writing} onChange={onChangeWriting}/>
          <TextField  id="standard" label="Speaking" value={speaking} onChange={onChangeSpeaking}/>
        </div>
      <br></br>
      <br></br>
      <Divider/>
      <br></br>
      <Typography component = "h6" variant = "h6" >
          Follow Up Remarks
      </Typography>
      <div className={classes.personalInfoDiv}>
        <ul>
         
        {followUpRemarks.map((followUpRem,index) =>{
          return <li>{followUpRem}</li>
        })}
        </ul>
      </div>
      
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
