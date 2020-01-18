import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useAuth} from './context/auth';
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));

  

 

 

export default function LoginComponent(){
    const [username,setUsername]=React.useState();
    const [password,setPassword]=React.useState();
    const [isLoggedIn, setLoggedIn] = React.useState(false);
    const { setAuthTokens } = useAuth();
    const classes = useStyles();


    const onChangeUserName=(event)=>{
        event.preventDefault();
        setUsername(event.target.value)
    }
  
    const onChangeUserPassword=(event)=>{
      event.preventDefault();
      setPassword(event.target.value)
  }

  
  
  const handleSubmit=(event)=>{
      event.preventDefault();
      if(username=='admin' && password=='admin'){
        setLoggedIn(true);
        setAuthTokens("abc")
      }
  
  }

  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

    return(
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                required
                id="outlined-required"
                label="Username"
                variant="outlined"
                onChange={onChangeUserName}
            />
            <br></br>
            <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={onChangeUserPassword}
            />
            <br></br>
            <Button variant="contained" color="primary" type="submit"> LOGIN </Button>
        </form>
    );
}