import React,{useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles(theme => ({
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
  }));
  
  export function EnglishExamTypeComponent(props){
      const classes = useStyles();
      const formik = props.formik;

    return(
        <div>
            <Typography component = "h6" variant = "h6" >
            English Exam Type
            </Typography> 
            <div className={classes.personalInfoDiv}>
            <FormControl className={classes.formControlSelect}>
                <InputLabel id="demo-simple-select-label">English Exam Type</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="englishExamType"
                name="englishExamType"
                {...formik.getFieldProps('englishExamType')}
                >
                <MenuItem value={'IELTS'}>IELTS</MenuItem>
                <MenuItem value={'TOEFL'}>TOEFL</MenuItem>
                </Select>
                </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            autoOk
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="examDate"
            name="examDate"
            label="Exam Date"
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
            value={formik.values.examDate}
            onChange={value => formik.setFieldValue("examDate", value)}
            />
            </MuiPickersUtilsProvider>
            <TextField  id="overall" 
                label="Overall"
                name="overall"
                {...formik.getFieldProps('overall')}/>
            <TextField  id="listening" 
                label="Listening" 
                name="listening"
                {...formik.getFieldProps('listening')}/>
            <TextField  id="reading" 
                label="Reading" 
                name="reading"
                {...formik.getFieldProps('reading')}/>
            <TextField  id="writing" 
                label="Writing"
                name="writing" 
                {...formik.getFieldProps('writing')}/>
            <TextField  id="speaking" 
                label="Speaking" 
                name="speaking"
                {...formik.getFieldProps('speaking')}/>
            </div>
        </div>

    )
}