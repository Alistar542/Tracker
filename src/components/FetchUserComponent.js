import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import clsx from 'clsx';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import ExpansionPanelForFetchUserComponent from './ExpansionPanelForFetchUserComponent';
import {StudentsFoundTableComponent} from './StudentsFoundTableComponent'
import ExportAsExcelComponent from './ExportAsExcelComponent'
import FailOnFetchingDialog from './Dialogs/FailOnFetchingDailog';
import {useAuth} from './Login/context/auth';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {useParams,useLocation} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    
    formDiv :{
      margin: theme.spacing(3),
    },
    buttonStyle: {
      width:100,
      height:40,
      marginLeft:theme.spacing(1),
      marginTop:theme.spacing(1),
    },
    filterDiv:{
      
    },
    cardContentDiv:{
      display:'flex',
      flexDirection:'row',
      flexWrap:'wrap',
      '& .MuiTextField-root': {
        width: 200,
        marginLeft: theme.spacing(1),
      },
    },
    formControlSelect:{
      marginLeft: theme.spacing(1),
      marginTop:theme.spacing(1),
      minWidth: 200,
    },
    cardComponent: {
      borderWidth:'1px',
      borderRadius:'3px',
      boxShadow:'0 3px 5px 2px rgba(201, 202, 177, .3)'
    },
    selectField:{
      height:40
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      margin:theme.spacing(1),
    },
    expandOpen: {
      marginLeft: 'auto',
      transform: 'rotate(180deg)',
      margin:theme.spacing(1),
    },
  }));

export const FetchUserComponent = () => {
    const classes = useStyles();
    const [dateToFetch, setSelectedDateToFetch] = React.useState(null);
    const [studentsFound, setStudentsFound] = React.useState();
    const [loadingSpinner,setLoadingSpinner] = React.useState(false);
    const [dialogState,setDialogState]=React.useState(false);
    const [successOrFail, setSuccessOrFail] = React.useState(false);
    const [status,setStatus] = React.useState('P');
    const [firstName,setFirstName] = React.useState('');
    const {authTokens} = useAuth();
    const [expanded,setExpanded] = React.useState(false);
    const [phoneNumber,setPhoneNumber] = React.useState();

    const handleDateChangeToFetch = date => {
        if(date){
          setSelectedDateToFetch(new Date(date.getFullYear(),date.getMonth(),date.getDate()));
        }else{
          setSelectedDateToFetch(null);
        }
    };

    const handleFirstNameChange = event => {
      setFirstName(event.target.value);
    }

      const handleSubmitForFetching = (event) =>{
        event.preventDefault();
        setLoadingSpinner(true);
        const fetchObject = {
          followUpDate:dateToFetch,
          status:status,
          currentUser:authTokens.user,
          firstName:firstName,
          phoneNumber:phoneNumber
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

      const handlePhoneNumber = event => {
        setPhoneNumber(event.target.value);
      }

      const clearValues = () =>{
        setStudentsFound();
        setSelectedDateToFetch(null);
        setStatus();
        setFirstName('');
      }

      const handleExpandClick = () => {
        setExpanded(!expanded);
      }

  return(

    <div>
      <div className={classes.formDiv}>
      <Card className={classes.cardComponent}>
        <form noValidate autoComplete="off" className={classes.filterDiv} onSubmit={handleSubmitForFetching}>
        <CardContent className={classes.cardContentDiv}>
            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            disableToolbar
            variant="inline"
            inputVariant="outlined"
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
            <FormControl variant="outlined" className={classes.formControlSelect}>
            <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={status}
              onChange={handleStatusChange}
              margin="dense"
              label="Status"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value='P'>Pending</MenuItem>
              <MenuItem value='D'>Done</MenuItem>
            </Select>
            </FormControl>
            <Button 
              variant="contained" 
              className={classes.buttonStyle} 
              color="primary" 
              type="submit"> 
              Find 
            </Button>
            <Button 
              variant="contained" 
              className={classes.buttonStyle} 
              color="primary"
              onClick={clearValues}> 
              Clear 
            </Button>
            {studentsFound?
            <ExportAsExcelComponent studentsFound={studentsFound}></ExportAsExcelComponent>:<span></span>}
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
            
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.cardContentDiv}>
          <TextField  id="standard" 
            label="Stundent Name" 
            name="firstName" 
            variant="outlined"
            margin="dense"
            name="firstName"
            value={firstName}
            onChange={handleFirstNameChange}/>

            <TextField  id="standard" 
            label="Phone Number" 
            name="phoneNumber"
            variant="outlined"
            margin="dense"
            value={phoneNumber}
            onChange={handlePhoneNumber}/>
            
          </CardContent>
        </Collapse>
        </form>
      </Card>
        <br></br>
        {loadingSpinner?
          <CircularProgress />:
          studentsFound?
          <span>
          <StudentsFoundTableComponent studentsFound={studentsFound}></StudentsFoundTableComponent>
          </span>:<span></span>}
        {!successOrFail?<FailOnFetchingDialog dialogState={dialogState} setDialogStateFn={setDialogState}/>:<span></span>}
        
        
        </div>
    </div>
                  
                
  );
}

