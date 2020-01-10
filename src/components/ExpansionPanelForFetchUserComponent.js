import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
  }
}));

export default function ExpansionPanelForFetchUserComponent(props) {
  const classes = useStyles();
  console.log("ExpansionPanelFor FetchUser Component ---- ++++")
  //console.log(props.studentsFound);
  //const [studentFoundAfterSearch,setStudentFound]=React.useState(props.studentsFound?props.studentsFound:[]);
  //console.log(studentFoundAfterSearch)
//setStudentFound(props.studentsFound?props.studentsFound:[]);
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
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
   
    })}
    </div>
  );
}
