import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, FormControlLabel, Switch, Typography } from '@material-ui/core'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#222'
    },
    card: {
        padding: '0.4rem 0.6rem',
    },
}));

function GroupFinal (props) {
    const classes = useStyles();
    const [checked, setChecked] = useState(Boolean(props.data.final))

    const switchFinale = (event) => {
        postGroupFinal(event.target.checked)
        setChecked(event.target.checked)
    }

    const postGroupFinal = (checked) => {
        axios.post(process.env.REACT_APP_API_URL + 'post_group_final.php', {
            id: props.data.id,
            final: checked,
        })
        .then(function (response) {
            if(response.data.ok){
                setChecked(response.data.data.final)
            }
            console.log(response)
        })
        .catch(function (error) {
            console.error(error)
        })
    }

    return(
        <Grid item xs={12} sm={6}>
            <Card className={classes.card}>
                <Typography variant='subtitle'>No.{props.data.no}</Typography>
                <Typography variant='body1'>{props.data.name}</Typography>
                <Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={checked}
                                onChange={(event) => switchFinale(event)}
                                color="primary"
                                inputProps={{ 'aria-label': 'primary  checkbox' }}
                            />
                        }
                        label="決勝進出"
                    />
                </Typography>
            </Card>
        </Grid>
    )
}

export default GroupFinal;