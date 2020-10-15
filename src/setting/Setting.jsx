import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Divider, FormControlLabel, Grid, Switch, Typography } from '@material-ui/core';
import axios from 'axios';

import SettingDetail from './SettingDetail'


const useStyles = makeStyles((theme) => ({
    root: {
        color: '#222'
    },
}));

function Setting () {
    const classes = useStyles();
    const [setting, setSetting] = useState([])

    useEffect(() => {
        fetchSetting()
    },[])

    const fetchSetting = () => {
        axios.post(process.env.REACT_APP_API_URL + 'get_status.php')
        .then(function (response) {
            setSetting(response.data.setting)
        })
        .catch(function (error) {
            console.error(error)
        })
    }

    const postSetting = () => {
        axios.post(process.env.REACT_APP_API_URL + 'post_status.php',setting)
        .then(function (response) {
            console.log(response.data)
        })
        .catch(function (error) {
            console.error(error)
        })
    }

    const handleRunning = () => {
        setSetting({...setting, running: !setting.running})
    }
    const handleChangeRound = (event) => {
        setSetting({ ...setting, round: event.target.value });
    };
    const handleChangeVote = () => {
        setSetting({ ...setting, vote: !setting.vote })
    }
    const handleChangeVoteAccept = () => {
        setSetting({ ...setting, vote_accept: !setting.vote_accept })
    }
    const handleChangeTicketAccept = () => {
        setSetting({ ...setting, ticket_accept: !setting.ticket_accept })
    }
    const handleGroup = (id) => {
        setSetting({ ...setting, group_id: id })
    }

    return(

        <div className={classes.root}>
            <Typography variant='h5' gutterBottom>設定</Typography>
            <Grid container spacing={2} className={classes.gridBox}>
                <Grid item xs={8}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={Boolean(setting.running)}
                                onChange={handleRunning}
                                name="running"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary  checkbox' }}
                            />
                        }
                        label="企画実施"
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color='primary' onClick={postSetting}>
                        公開
                    </Button>
                </Grid>
            </Grid>
            
            <Divider />

            {Boolean(setting.running) &&
                <SettingDetail 
                    setting={setting}
                    handleChangeRound={handleChangeRound}
                    handleChangeVote={handleChangeVote}
                    handleChangeVoteAccept={handleChangeVoteAccept}
                    handleChangeTicketAccept={handleChangeTicketAccept}
                    handleGroup={(id) => handleGroup(id)}
                />
            }
        </div>
    )
}

export default Setting;