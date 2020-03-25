import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {useAuth} from './Login/context/auth';

const useStyles = makeStyles(theme => ({
    outerDiv:{
        margin: theme.spacing(3),
    },
    cardComponent: {
      minWidth: 275,
      width:'30%',
      borderWidth:'1px',
      borderColor:'grey',
      borderRadius:'7px',
      boxShadow:'0 3px 5px 2px rgba(201, 202, 177, .3)'
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }));
  
  export function HomeComponent() {
    const classes = useStyles();
    const {authTokens} = useAuth();
  
    return (
    <div className={classes.outerDiv}>
      <Card className={classes.cardComponent}>
        <CardContent>
          <Typography className={classes.title} color="textPrimary" gutterBottom>
           Welcome {authTokens.user}
          </Typography>
          <Typography variant="h5" component="h2">
           
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            This application tracks the status of students applying for higher studies. 
          </Typography>
          <Typography variant="body2" component="p">
           
          </Typography>
        </CardContent>
      </Card>
      </div>
    );
  }