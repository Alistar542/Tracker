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
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [interestedCourse, setInterestedCourse] = React.useState('');

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleSubmit=(event)=>{
    event.preventDefault();
    alert("clicked");
    const userObject ={
      firstName:firstName,
      lastName:lastName,
      interestedCourse:interestedCourse,
      selectedDate:selectedDate
    }

    console.log(userObject);
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

  return(
             
    

    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        Add a student
    <div>
      <TextField required id="standard-required" label="First Name" value={firstName} onChange={onChangeFirstName}/>
      <TextField required id="standard-required" label="Last Name" value={lastName} onChange={onChangeLastName}/>
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
      <Button variant="contained" color="primary" type="submit"> Save </Button>
    </form>
                  
                
  );
}

