import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import ExpansionPanelForFetchUserComponent from './ExpansionPanelForFetchUserComponent';
import ExportAsExcelComponent from './ExportAsExcelComponent'
import FailOnFetchingDialog from './Dialogs/FailOnFetchingDailog';
import {useAuth} from './Login/context/auth';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {useParams,useLocation} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 300,
      },
    },
    formDiv :{
      margin : 0,
      padding: theme.spacing(3),
      height:'50%'
    },
    buttonStyle: {
      width:100,
      height:40,
    },
    filterDiv:{
      margin: theme.spacing(1),
      display:'flex',
      flexDirection:'row',
      flexWrap:'wrap',
      alignItems:'center',
    },
    formControlSelect:{
      margin: theme.spacing(1),
      minWidth: 160,
    }
  }));

export const FetchUserComponent = () => {
    const classes = useStyles();
    const [dateToFetch, setSelectedDateToFetch] = React.useState(null);
    const [studentsFound, setStudentsFound] = React.useState([]);
    const [loadingSpinner,setLoadingSpinner] = React.useState(false);
    const [dialogState,setDialogState]=React.useState(false);
    const [successOrFail, setSuccessOrFail] = React.useState(false);
    const [status,setStatus] = React.useState('P');
    const {authTokens} = useAuth();

    const handleDateChangeToFetch = date => {
        if(date)
        setSelectedDateToFetch(new Date(date.getFullYear(),date.getMonth(),date.getDate()));
    };

      const handleSubmitForFetching = (event) =>{
        event.preventDefault();
        setLoadingSpinner(true);
        const fetchObject = {
          followUpDate:dateToFetch,
          status:status,
          currentUser:authTokens.user
        }
        console.log(' date to fetch : : '+dateToFetch);
    //https://protected-gorge-55144.herokuapp.com/student/getstudent
    //http://localhost:5000/student/getstudent
        axios.post('http://localhost:5000/student/getstudent',fetchObject)
        .then(res => {
            setLoadingSpinner(false);
            console.log(res.data)
            if(res.data.length > 0){
                console.log('found');
                console.log(res.data);
                setDialogState(true);
                setSuccessOrFail(true);
                handleStudentChange(res.data);
                console.log(res.data.map(user => user.firstName))
            }else{
              handleStudentChange([]);
              setDialogState(true);
              setSuccessOrFail(false);
            }
        })
        .catch(err =>{
          setLoadingSpinner(false);
          setDialogState(true);
          setSuccessOrFail(false);
        })
      }

      const handleStudentChange = (data) =>{
          console.log('Inside handleClick method')
          setStudentsFound(data);
          console.log(data);
      }

      const handleStatusChange = (data) =>{
        setStatus(data.target.value);
      }

  return(

    <div>
      <div className={classes.formDiv}>
        <form noValidate autoComplete="off" className={classes.filterDiv} onSubmit={handleSubmitForFetching}>
            
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
            <FormControl className={classes.formControlSelect}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={handleStatusChange}
            >
              <MenuItem value={'P'}>Pending</MenuItem>
              <MenuItem value={'D'}>Done</MenuItem>
            </Select>
            </FormControl>
            <Button variant="contained" className={classes.buttonStyle} color="primary" type="submit"> Find </Button>
            
        </form>
        
        <br></br>
        {loadingSpinner?
        <CircularProgress />:<span>
          <ExportAsExcelComponent studentsFound={studentsFound}></ExportAsExcelComponent>
        <ExpansionPanelForFetchUserComponent studentsFound={studentsFound}></ExpansionPanelForFetchUserComponent></span>}
        {!successOrFail?<FailOnFetchingDialog dialogState={dialogState} setDialogStateFn={setDialogState}/>:<span></span>}
        
        
        </div>
    </div>
                  
                
  );
}

