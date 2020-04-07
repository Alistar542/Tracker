import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import {StudentsFoundTableComponent} from './StudentsFoundTableComponent'
import FailOnFetchingDialog from '../Dialogs/FailOnFetchingDailog';
import {FilterComponent} from './FilterComponent';
;
const useStyles = makeStyles(theme => ({
    
    formDiv :{
      margin: theme.spacing(3),
    },
  }));

export const FetchUserComponent = () => {
    const classes = useStyles();
    const [studentsFound, setStudentsFound] = React.useState();
    const [loadingSpinner,setLoadingSpinner] = React.useState(false);
    const [dialogState,setDialogState]=React.useState(false);
    const [successOrFail, setSuccessOrFail] = React.useState(false);


      const handleSubmitForFetching = (objectFromFilterComponent) =>{
        setLoadingSpinner(true);
        const fetchObject = objectFromFilterComponent;
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

      const clearValues = () =>{
        setStudentsFound();
      }



  return(

    <div>
      <div className={classes.formDiv}>
      <FilterComponent handleSubmitForFetching={handleSubmitForFetching} clearValues={clearValues} studentsFound={studentsFound}/>
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

