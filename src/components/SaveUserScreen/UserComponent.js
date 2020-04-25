import 'date-fns';
import React,{useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import clsx from 'clsx';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import SuccessDialog from '../Dialogs/SuccessDialog';
import FailDialog from '../Dialogs/FailDialog';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation} from "react-router";
import {FollowUpComponent} from './FollowUpComponent';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {PersonalInformationComponent} from './PersonalInformationComponent';
import {EnglishExamTypeComponent} from './EnglishExamTypeComponent';
import { green, purple } from '@material-ui/core/colors';

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
    marginBottom:theme.spacing(8)
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
  doneButton:{
    backgroundColor:green[600],
    '&:hover':{
      backgroundColor:green[700],
    }
    
  },
  pendingButton:{
    backgroundColor:purple[600],
    '&:hover':{
      backgroundColor:purple[700],
    }
  },
}));



export const UserComponent = () => {
  
  let locationFound = useLocation();
  let {studentFound} = locationFound.state ? locationFound.state : {};
  const classes = useStyles();
  const [dialogState,setDialogState]=React.useState(false);
  const [successOrFail, setSuccessOrFail] = React.useState(false);
  const [openFollowUpPopup, setOpenFollowUpPopup] = React.useState(false);
  const [backDropState,setBackDropState] = React.useState(false);
  const [followUpRemarks,setFollowUpRemarks] = React.useState(studentFound?studentFound.followUpRemarks:null);
  const [toDoRemarks,setToDoRemarks] = React.useState(studentFound?studentFound.toDoRemarks:null);
  const [errorData,setErrorData] = React.useState({});
  const [countries,setCountries] = React.useState([]);
  const [status,setStatus] = React.useState(studentFound?studentFound.status:'P');
  const [openReject,setOpenReject] = React.useState(false);
  const [formData,setFormData] = React.useState(studentFound ? studentFound : {
    firstName:'',
    middleName:'',
    lastName:'',
    email:'',
    phoneNumber:'',
    gender:'',
    maritalStatus:'',
    courseInterested:'',
    englishExamType:'',
    overall:'',
    listening:'',
    reading:'',
    writing:'',
    speaking:'',
    countryOfEducation:'',
    highestLevelOfEducation:'',
    gradingScheme:'',
    gradeAverage:'',
    companyName:'',
    position:'',
    workAddress:'',
    requestedCourseDetails:'',
    preferredCountry:'',
    dateOfRequest:new Date(),
    source:'',
    wayOfContact:'',
    counselor:''
  });
  const [submitted,setSubmitted] = React.useState(false);
  console.log('rendering UserComponent')

  const formik = useFormik({
    initialValues: studentFound?studentFound:{
      firstName:'',
      middleName:'',
      lastName:'',
      email:'',
      phoneNumber:'',
      dateOfBirth:null,
      gender:'',
      maritalStatus:'',
      courseInterested:'',
      followUpDate:null,
      englishExamType:'',
      examDate:null,
      overall:'',
      listening:'',
      reading:'',
      writing:'',
      speaking:'',
      countryOfEducation:'',
      highestLevelOfEducation:'',
      gradingScheme:'',
      gradeAverage:'',
      graduatedYear:null,
      companyName:'',
      position:'',
      endDate:null,
      startDate:null,
      workAddress:'',
      requestedCourseDetails:'',
      preferredCountry:'',
      dateOfRequest:new Date(),
      source:'',
      wayOfContact:'',
      counselor:''
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      phoneNumber: Yup.string()
        .matches(/^[0-9]*$/,{message:'Must be a number'})
        .required('Required')
    }),
    onSubmit: values => {
      onFinalSubmit(values);
    },
    validateOnBlur:false
  });

  

  useEffect(()=>{
    console.log('inside useEffect')
        axios.get('https://restcountries.eu/rest/v2/all?fields=name')
            .then(res=>{
                setCountries(res.data);
                console.log('found result useEffect')
            })
            .catch(err=>{

            })
  },[]);


  const handleStatusChange = () => {
    if(status === 'P'){
      setStatus('D');
    }else if(status === 'D'){
      setStatus('P');
    }
  }

  const onChangeValidate = event => {
    if(submitted){
      setSubmitted(false); 
    }
    let formDataClone = {};
    //let errorDataClone = {...errorData};
    formDataClone[event.target.name] = event.target.value;
    //if(event.target.value===''){
    //  errorDataClone[event.target.name] = true;
    //}else{
    //  errorDataClone[event.target.name] = false;
    //}
    setFormData(prevFormData => ({...prevFormData,...formDataClone}));
    //setErrorData(prevErrorData => ({...prevErrorData,[event.target.name]:event.target.value===''?true:false}));
  }

  const onFinalSubmit=(values)=>{
    setBackDropState(true);
    
    const userObject ={
      firstName:values.firstName.toLowerCase(),
      middleName:values.middleName,
      lastName:values.lastName,
      email:values.email,
      phoneNumber:values.phoneNumber,
      dateOfBirth:values.dateOfBirth ? new Date(values.dateOfBirth):null,
      gender:values.gender,
      maritalStatus:values.maritalStatus,
      courseInterested:values.courseInterested,
      followUpDate:values.followUpDate ?new Date(values.followUpDate):null,
      englishExamType:values.englishExamType,
      examDate:values.examDate ?new Date(values.examDate):null,
      overall:values.overall,
      listening:values.listening,
      reading:values.reading,
      writing:values.writing,
      speaking:values.speaking,
      countryOfEducation:values.countryOfEducation,
      highestLevelOfEducation:values.highestLevelOfEducation,
      gradingScheme:values.gradingScheme,
      gradeAverage:values.gradeAverage,
      graduatedYear:values.graduatedYear ?new Date(values.graduatedYear):null,
      companyName:values.companyName,
      position:values.position,
      endDate:values.endDate ?new Date(values.endDate):null,
      startDate:values.startDate ?new Date(values.startDate):null,
      workAddress:values.workAddress,
      requestedCourseDetails:values.requestedCourseDetails,
      preferredCountry:values.preferredCountry,
      dateOfRequest:values.dateOfRequest ?new Date(values.dateOfRequest):null,
      source:values.source,
      wayOfContact:values.wayOfContact,
      counselor:values.counselor,
      lastUpdateUser:'admin',
      followUpRemarks:followUpRemarks,
      status:status,
    }

    //console.log(userObject);
	if(typeof studentFound === 'undefined'){
    console.log('add');
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
    console.log('update');
//update code
//https://protected-gorge-55144.herokuapp.com/student/update/
//http://localhost:5000/student/update/
	axios.post('http://localhost:5000/student/update/'+studentFound._id,userObject)
    .then(res => {
      console.log(userObject);
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
    setFormData({
      firstName:'',
      middleName:'',
      lastName:'',
      email:'',
      phoneNumber:'',
      gender:'',
      maritalStatus:'',
      courseInterested:'',
      englishExamType:'',
      overall:'',
      listening:'',
      reading:'',
      writing:'',
      speaking:'',
      countryOfEducation:'',
      highestLevelOfEducation:'',
      gradingScheme:'',
      gradeAverage:'',
      companyName:'',
      position:'',
      workAddress:'',
      requestedCourseDetails:'',
      preferredCountry:'',
      source:'',
      wayOfContact:'',
      counselor:'',
    });
    setFollowUpRemarks(null);
  }

  const openFollowUpPopupFn = event => {
    event.preventDefault();
    setOpenFollowUpPopup(true);
  }

  const closeFollowUpPopupFn = event => {
    setOpenFollowUpPopup(false);
  }

  const handleRejectStatus = () =>{
    setOpenReject(true);
  }

  const handleRejectClose = event => {
    setOpenReject(false);
    if(event.target.innerHTML ==='Yes'){
      setStatus('R');
    }
  }


  const handleSubmitFollowUp = event => {
    event.preventDefault();
    setOpenFollowUpPopup(false);
    let remarksCopy= followUpRemarks?followUpRemarks:[];
    remarksCopy.push(event.target.followupremarks.value);
    setFollowUpRemarks(remarksCopy);
  }

  return(
             
    <div>
    <form className={classes.root} autoComplete="off" onSubmit={formik.handleSubmit}>
    <div id="formDiv" className={classes.formDiv}>
        <PersonalInformationComponent {...formik}/>
      <br></br>
      <Divider/>
      <br></br>
        <EnglishExamTypeComponent formik={formik}/>
      <br></br>
      <br></br>
      <Divider/>
      <br></br>
        <Typography component = "h6" variant = "h6" >
          Education Summary
        </Typography> 
        <div className={classes.personalInfoDiv}>
        <FormControl className={classes.formControlSelect}>
            <InputLabel id="demo-simple-select-label">Country Of Education</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="countryOfEducation"
              name="countryOfEducation"
              {...formik.getFieldProps('countryOfEducation')}
            >
              {countries.map((country) =>{
                    return <MenuItem value={country.name}>{country.name}</MenuItem>
              })}
            </Select>
        </FormControl>

        <FormControl className={classes.formControlSelect}>
            <InputLabel id="demo-simple-select-label">Highest Level Of Education</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="highestLevelOfEducation"
              name="highestLevelOfEducation"
              {...formik.getFieldProps('highestLevelOfEducation')}
            >
              <MenuItem value={'sslc'}>SSLC</MenuItem>
              <MenuItem value={'higherSecondary'}>Higher Secondary</MenuItem>
              <MenuItem value={'diploma'}>Diploma</MenuItem>
            </Select>
        </FormControl>

        <FormControl className={classes.formControlSelect}>
            <InputLabel id="demo-simple-select-label">Grading Scheme</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="gradingScheme"
              name="gradingScheme"
              {...formik.getFieldProps('gradingScheme')}
            >
              <MenuItem value={'cgpa'}>CGPA out of 10</MenuItem>
              <MenuItem value={'percentage'}>Percentage</MenuItem>
              <MenuItem value={'grade'}>Grade</MenuItem>
            </Select>
        </FormControl>

        <FormControl className={classes.formControlSelect}>
            <InputLabel id="demo-simple-select-label">Grade Average</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="gradeAverage"
              name="gradeAverage"
              {...formik.getFieldProps('gradeAverage')}
            >
              <MenuItem value={'aplus'}>A+</MenuItem>
              <MenuItem value={'a'}>A</MenuItem>
              <MenuItem value={'b'}>B</MenuItem>
            </Select>
        </FormControl>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk
          openTo="year"
          variant="inline"
          views={["year", "month"]}
          margin="normal"
          id="graduatedYear"
          name="graduatedYear"
          label="Graduated Year"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          value={formik.values.graduatedYear}
          onChange={value => formik.setFieldValue("graduatedYear", value)}
        />
        </MuiPickersUtilsProvider>
        </div>
        <br></br>
      <br></br>
      <Divider/>
      <br></br>
        <Typography component = "h6" variant = "h6" >
          Work Experience
        </Typography> 
        <div className={classes.personalInfoDiv}>
        <TextField  id="companyName" 
            label="Company Name"
            name="companyName"
            {...formik.getFieldProps('companyName')}/>
        <TextField  id="position" 
            label="Postion" 
            name="position"
            {...formik.getFieldProps('position')}/>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="endDate"
          name="endDate"
          label="End Date"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          value={formik.values.endDate}
          onChange={value => formik.setFieldValue("endDate", value)}
        />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="startDate"
          name="startDate"
          label="Start Date"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          value={formik.values.startDate}
          onChange={value => formik.setFieldValue("startDate", value)}
        />
        </MuiPickersUtilsProvider>
          
        <TextField  id="workAddress" 
          label="Address" 
          name="workAddress"
          {...formik.getFieldProps('workAddress')}/>
        </div>
      <br></br>
      <br></br>
      <Divider/>
      <br></br>
        <Typography component = "h6" variant = "h6" >
          Areas of Interest
        </Typography> 
        <div className={classes.personalInfoDiv}>
          <TextField  id="requestedCourseDetails" 
            label="Requested Course Details"
            name="requestedCourseDetails"
            {...formik.getFieldProps('requestedCourseDetails')}/>
          <FormControl className={classes.formControlSelect}>
            <InputLabel id="demo-simple-select-label">Preferred Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="preferredCountry"
              name="preferredCountry"
              {...formik.getFieldProps('preferredCountry')}
            >
              {countries.map((country) =>{
                    return <MenuItem value={country.name}>{country.name}</MenuItem>
              })}
            </Select>
          </FormControl>
        </div>
      <br></br>
      <br></br>
      <Divider/>
      <br></br>

      <Typography component = "h6" variant = "h6" >
          Marketing Purpose
      </Typography> 
      <div className={classes.personalInfoDiv}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="dateOfRequest"
            name="dateOfRequest"
            label="Date Of Request"
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            value={formik.values.dateOfRequest}
            onChange={value => formik.setFieldValue("dateOfRequest", value)}
          />
          </MuiPickersUtilsProvider>
          <TextField  id="source" 
            label="Source"
            name="source"
            {...formik.getFieldProps('source')}/>
          <TextField  id="wayOfContact" 
            label="Way Of Contact"
            name="wayOfContact"
            {...formik.getFieldProps('wayOfContact')}/>
          <TextField  id="counselor" 
            label="Counselor"
            name="counselor"
            {...formik.getFieldProps('counselor')}/>
          <FormControl className={classes.formControlSelect}>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="priority"
              name="priority"
              {...formik.getFieldProps('priority')}>
                <MenuItem value='high'>High</MenuItem>
                <MenuItem value='medium'>Medium</MenuItem>
                <MenuItem value='low'>Low</MenuItem>
            </Select>
          </FormControl>
      </div>
      <br></br>
      <br></br>
      <Divider/>
      <br></br>
      <FollowUpComponent followUpRemarks={followUpRemarks}/>
      
       {successOrFail?<SuccessDialog dialogState={dialogState} setDialogStateFn={setDialogState}/>
       :<FailDialog dialogState={dialogState} setDialogStateFn={setDialogState}/>}


      


       
        </div>
       <Toolbar position="fixed" className={classes.appBar}>
       <Button variant="contained" color="secondary" onClick={handleRejectStatus}> Reject </Button>
       <Button variant="contained" color='primary' className={clsx(classes.doneButton,{[classes.pendingButton]:status==='D'})} onClick={handleStatusChange}> {status==='P'?'Mark As Done':'Mark As Pending'} </Button>
       <Button variant="contained" color="primary" onClick={openFollowUpPopupFn}> To Do </Button>
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

      <Dialog
        open={openReject}
        onClose={handleRejectClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure to reject this application ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once rejected the application cannot be renewed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRejectClose} name='no' color="primary">
            No
          </Button>
          <Button onClick={handleRejectClose} name='yes' color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>


       <Backdrop className={classes.backdrop} open={backDropState}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>         
  );
}
