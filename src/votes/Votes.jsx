import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#222'
    },
}));

function Votes () {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Typography variant='h5' gutterBottom>投票結果</Typography>
        </div>
    )
}

export default Votes;