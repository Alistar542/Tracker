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


const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
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
  }
}));



export const UserComponent = () => {
  
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [dateToFetch, setSelectedDateToFetch] = React.useState();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [interestedCourse, setInterestedCourse] = React.useState('');
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

  const handleDateChange = date => {
    if(date)
    setSelectedDate(new Date(date.getFullYear(),date.getMonth(),date.getDate()));
  };

  const {authTokens} = useAuth();
  const handleSubmit=(event)=>{
    event.preventDefault();
    const userObject ={
      firstName:firstName,
      lastName:lastName,
      phoneNumber:phoneNumber,
      courseInterested:interestedCourse,
      followUpDate:selectedDate,
      lastUpdateUser:authTokens.user
    }

    console.log(userObject);
//https://protected-gorge-55144.herokuapp.com/student/add
//http://localhost:5000/student/add
    axios.post('http://localhost:5000/student/add',userObject)
    .then(res => {console.log(res.data)
      setDialogState(true);
      setSuccessOrFail(true);
      resetValues();
    })
    .catch(err => {
      setDialogState(true);
      setSuccessOrFail(false);
    });


  }

  const resetValues=()=>{
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setSelectedDate(null);
    setInterestedCourse('');
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

  return(
             
    <div>

    <form className={classes.root} Validate autoComplete="off" onSubmit={handleSubmit}>
        <Typography component = "h6" variant = "h6" >
          Personal Information
        </Typography> 
    <div className={classes.personalInfoDiv}>
      <TextField required id="standard-required" label="First Name" value={firstName} onChange={onChangeFirstName}/>
      <TextField required id="standard-required" label="Middle Name" value={middleName} onChange={onChangeMiddleName}/>
      <TextField required id="standard-required" label="Last Name" value={lastName} onChange={onChangeLastName}/>
      <TextField required id="standard-required" label="Email" value={email} onChange={onChangeEmail}/>
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
          <TextField required id="standard" label="Overall" value={overall} onChange={onChangeOverall}/>
          <TextField required id="standard" label="Listening" value={listening} onChange={onChangeListening}/>
          <TextField required id="standard" label="Reading" value={reading} onChange={onChangeReading}/>
          <TextField required id="standard" label="Writing" value={writing} onChange={onChangeWriting}/>
          <TextField required id="standard" label="Speaking" value={speaking} onChange={onChangeSpeaking}/>
        </div>
      <br></br>
      <Button variant="contained" color="primary" type="submit"> Save </Button>
       </form>
       {successOrFail?<SuccessDialog dialogState={dialogState} setDialogStateFn={setDialogState}/>
       :<FailDialog dialogState={dialogState} setDialogStateFn={setDialogState}/>}
    </div>         
  );
}
