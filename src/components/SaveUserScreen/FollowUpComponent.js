import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme =>({
    cardContentDiv:{
    },
    cardComponent: {
        padding:theme.spacing(1),
        borderWidth:'1px',
        borderRadius:'6px',
        boxShadow:'0 1px 15px rgba(27,31,35,.15),0 0 1px rgba(106,115,125,.35)',
    },
}))


export function FollowUpComponent(props){
    const classes = useStyles();

    return (
        <div>
        {props.followUpRemarks?<div>
            <Card className={classes.cardComponent}>
            <Typography component = "h6" variant = "h6" >
                Follow Up Comments
            </Typography>
                <CardContent className={classes.cardContentDiv}>
                {props.followUpRemarks.map((followUpRem) =>{
                    return <li>{followUpRem}</li>
                })}
                </CardContent>
            </Card>
        </div>:<span></span>}
        </div>
    )
    
}