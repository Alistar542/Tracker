import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {UserComponent} from '../SaveUserScreen/UserComponent'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  panel: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color:'white'
  },
  viewButton:{
    background : 'white'
  }
}));

export default function ExpansionPanelForFetchUserComponent(props) {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
    
    {props.studentsFound.map(data => {
    return <ExpansionPanel className={classes.panel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{data.firstName} {data.lastName}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Phone Number: {data.phoneNumber} Course Interested : {data.courseInterested}
            <br></br>
            {data.followUpRemarks?<div>
            Follow Up Remarks : {
              data.followUpRemarks.map(remarks => {
              return <li>{remarks}</li>
              })
            }</div>:<span></span>}
            <Button variant="contained" className={classes.viewButton} component={Link} to={{
                pathname: "/home/add",
                state: { studentFound: data }
              }}>View</Button>
          </Typography>
        </ExpansionPanelDetails>
   
      
   
      </ExpansionPanel>
   

    })}
	
	   
    </div>
  );
}
