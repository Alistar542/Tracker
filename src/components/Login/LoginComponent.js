import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useAuth } from './context/auth';
import { Redirect } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import BookBackground from '../../photos/login_background.jpg'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(1),
        height: '100%',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background:'white',
        padding:'10%',
        borderRadius:'1%',
        //marginBottom:'100%'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    paper_div: {
        background: 'blue'
    },
    back: {
        height: '100vh',
        display: 'flex',
        //backgroundImage : `url(${BookBackground})`,
        backgroundPosition:'center',
        //background:'#00bcd4',
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    }
}));







export default function LoginComponent() {
    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [isLoggedIn, setLoggedIn] = React.useState(false);
    const { setAuthTokens } = useAuth();
    const classes = useStyles();


    const onChangeUserName = (event) => {
        event.preventDefault();
        setUsername(event.target.value.toLowerCase())
    }

    const onChangeUserPassword = (event) => {
        event.preventDefault();
        setPassword(event.target.value)
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        if (username === 'admin' && password === 'admin') {
            setLoggedIn(true);
            setAuthTokens({
                user: username,
            });
        }
        if (username === 'alistar' && password === 'alistar') {
            setLoggedIn(true);
            setAuthTokens({
                user: username,
            });
        }

    }

    if (isLoggedIn) {
        return <Redirect to = "/home" / > ;
    }

    return ( <div className = { classes.back } >
        <Container component = "main" maxWidth = "xs" >
        <div className = { classes.paper } elevation={6}>
        <Typography component = "h1" variant = "h5" >
        Sign in
        </Typography> 
        <form className = { classes.root }
        Validate autoComplete = "off"
        onSubmit = { handleSubmit } >
        <TextField required fullWidth id = "outlined-required"
        label = "Username"
        variant = "outlined"
        margin = "normal"
        onChange = { onChangeUserName }
        value = { username }/>

        <TextField required fullWidth id = "outlined-password-input"
        label = "Password"
        type = "password"
        autoComplete = "current-password"
        variant = "outlined"
        margin = "normal"
        onChange = { onChangeUserPassword }/> 
        <br></br> 
        <Button fullWidth variant = "contained" className = { classes.submit }
        color = "primary"
        type = "submit"> LOGIN </Button> </form> </div> </Container> </div>
    );
}