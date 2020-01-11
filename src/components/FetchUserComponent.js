import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import ExpansionPanelForFetchUserComponent from './ExpansionPanelForFetchUserComponent';
import ExportAsExcelComponent from './ExportAsExcelComponent'

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 300,
      },
    },
    buttonStyle: {
      width:100,
      height:40,
      position:"relative"  
    }
  }));

export const FetchUserComponent = () => {

    const classes = useStyles();
    const [dateToFetch, setSelectedDateToFetch] = React.useState(null);
    const [studentsFound, setStudentsFound] = React.useState([]);
    const [loadingSpinner,setLoadingSpinner] = React.useState(false);
    const handleDateChangeToFetch = date => {
        if(date)
        setSelectedDateToFetch(new Date(date.getFullYear(),date.getMonth(),date.getDate()));
    };

      const handleSubmitForFetching = (event) =>{
        event.preventDefault();
        setLoadingSpinner(true);
        const fetchObject = {
          followUpDate:dateToFetch
        }
        console.log(' date to fetch : : '+dateToFetch);
    
        axios.post('http://localhost:5000/student/getstudent',fetchObject)
        .then(res => {
          setLoadingSpinner(false);
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
      <Box color="text.primary" display="flex" flexDirection="row" justifyContent="flex-start" alignItems="flex-start">
        <form noValidate autoComplete="off" onSubmit={handleSubmitForFetching}>
            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="dense"
            id="date-picker-inline"
            label="Follow up date"
            value={dateToFetch}
            onChange={handleDateChangeToFetch}
            KeyboardButtonProps={{
            'aria-label': 'change date',
            }}
            />
            </MuiPickersUtilsProvider>
            <Button variant="contained" className={classes.buttonStyle} color="primary" type="submit"> Find </Button>
            
        </form>
        </Box>
        <br></br>
        {loadingSpinner?
        <CircularProgress />:<span>
          <ExportAsExcelComponent studentsFound={studentsFound}></ExportAsExcelComponent>
        <ExpansionPanelForFetchUserComponent studentsFound={studentsFound}></ExpansionPanelForFetchUserComponent></span>}
       
        
        {/* {studentsFound.map(data => {
            return <li><h3>First Name : {data.firstName}</h3><h3>Phone Number : {data.phoneNumber}</h3> <h3>Follow Up Date : {new Date(data.followUpDate).getDate()}-{new Date(data.followUpDate).getMonth()+1}-{new Date(data.followUpDate).getFullYear()}</h3> </li>
        })} */}
    </div>
                  
                
  );
}

