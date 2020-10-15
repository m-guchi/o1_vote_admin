import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, Grid, Typography } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    root: {
        color: '#222'
    },
    card: {
        padding: '0.4rem 0.6rem',
    },
    selectCard: {
        border: '1px solid #ffa246'
    }
}));

const handle = (id) => {
    console.log(id)
}

function GroupCard (props) {
    const classes = useStyles();
    return(
        <Card className={ Boolean(props.selected) ? classes.selectCard : "" } >
            <CardActionArea
                className={classes.card}
                onClick={() => props.handleGroup(props.data.id)}
                // onClick={() => handle(props.data.id)}
            >
                <Typography variant='subtitle'>No.{props.data.no}</Typography>
                <Typography variant='body1'>{props.data.name}</Typography>
            </CardActionArea>
        </Card>
    )
}

export default GroupCard;