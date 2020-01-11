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
import SuccessDialog from './SuccessDialog';



const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
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

  const handleDateChange = date => {
    if(date)
    setSelectedDate(new Date(date.getFullYear(),date.getMonth(),date.getDate()));
  };


  const handleSubmit=(event)=>{
    event.preventDefault();
    const userObject ={
      firstName:firstName,
      lastName:lastName,
      phoneNumber:phoneNumber,
      courseInterested:interestedCourse,
      followUpDate:selectedDate
    }

    console.log(userObject);

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

  return(
             
    <div>

    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        Add a student
    <div>
      <TextField required id="standard-required" label="First Name" value={firstName} onChange={onChangeFirstName}/>
      <TextField required id="standard-required" label="Last Name" value={lastName} onChange={onChangeLastName}/>
      <TextField required id="standard-required" label="Interested Course" value={interestedCourse} onChange={onChangeInterestedCourse}/>
      <TextField required id="standard-required" label="Phone Number" value={phoneNumber} onChange={onChangePhoneNumber}/>
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
      <Button variant="contained" color="primary" type="submit"> Save </Button>
       </form>
       <SuccessDialog dialogState={dialogState} setDialogStateFn={setDialogState} successOrFail={successOrFail}/>
    </div>         
  );
}

