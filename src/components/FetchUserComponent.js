import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import ExpansionPanelForFetchUserComponent from './ExpansionPanelForFetchUserComponent';

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 300,
      },
    },
  }));

export const FetchUserComponent = () => {

    const classes = useStyles();
    const [dateToFetch, setSelectedDateToFetch] = React.useState(null);
    const [studentsFound, setStudentsFound] = React.useState([]);
    const handleDateChangeToFetch = date => {
        if(date)
        setSelectedDateToFetch(new Date(date.getFullYear(),date.getMonth(),date.getDate()));
    };

      const handleSubmitForFetching = (event) =>{
        event.preventDefault();
        const fetchObject = {
          followUpDate:dateToFetch
        }
        console.log(' date to fetch : : '+dateToFetch);
    
        axios.post('http://localhost:5000/student/getstudent',fetchObject)
        .then(res => {
            console.log(res.data)
            if(res.data.length > 0){
                console.log('found');
                console.log(res.data);
               
                handleStudentChange(res.data);
                console.log(res.data.map(user => user.firstName))
            }else{
              handleStudentChange([]);
            }
        });
      }

      const handleStudentChange = (data) =>{
          console.log('Inside handleClick method')
          setStudentsFound(data);
          console.log(data);
      }

  return(

    <div>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmitForFetching}>
            <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline-1"
            label="Follow up date"
            value={dateToFetch}
            onChange={handleDateChangeToFetch}
            KeyboardButtonProps={{
            'aria-label': 'change date',
            }}
            />
            </MuiPickersUtilsProvider>
            <Button variant="contained" color="primary" type="submit"> Find </Button>
            </div>
        </form>
        <br></br>
        <ExpansionPanelForFetchUserComponent studentsFound={studentsFound}></ExpansionPanelForFetchUserComponent>
        {/* {studentsFound.map(data => {
            return <li><h3>First Name : {data.firstName}</h3><h3>Phone Number : {data.phoneNumber}</h3> <h3>Follow Up Date : {new Date(data.followUpDate).getDate()}-{new Date(data.followUpDate).getMonth()+1}-{new Date(data.followUpDate).getFullYear()}</h3> </li>
        })} */}
    </div>
                  
                
  );
}

