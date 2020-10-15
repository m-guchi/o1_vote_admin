import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#222'
    },
}));

function Tickets () {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Typography variant='h5' gutterBottom>投票チケット</Typography>
        </div>
    )
}

export default Tickets;