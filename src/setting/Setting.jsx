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
    const [originSetting, setOriginSetting] = useState([])
    const [setting, setSetting] = useState([])
    const [diffSetting, setDiffSetting] = useState(false)

    useEffect(() => {
        fetchSetting()
    }, [])

    const fetchSetting = () => {
        axios.post(process.env.REACT_APP_API_URL + 'get_status.php')
        .then(function (response) {
            setOriginSetting(response.data.setting)
            setSetting(response.data.setting)
        })
        .catch(function (error) {
            console.error(error)
        })
    }

    const postSetting = () => {
        axios.post(process.env.REACT_APP_API_URL + 'post_status.php',setting)
        .then(function (response) {
            setOriginSetting(setting)
            setDiffSetting(false)
        })
        .catch(function (error) {
            console.error(error)
        })
    }

    const handleRunning = () => {
        setSetting({...setting, running: !setting.running})
        setDiffSetting(setting.running == originSetting.running)
    }
    const handleChangeRound = (event) => {
        setSetting({ ...setting, round: event.target.value })
        setDiffSetting(event.target.value != originSetting.round)
    };
    const handleChangeVote = () => {
        setSetting({ ...setting, vote: !setting.vote })
        setDiffSetting(setting.vote == originSetting.vote)
    }
    const handleChangeVoteAccept = () => {
        setSetting({ ...setting, vote_accept: !setting.vote_accept })
        setDiffSetting(setting.vote_accept == originSetting.vote_accept)
    }
    const handleChangeTicketAccept = () => {
        setSetting({ ...setting, ticket_accept: !setting.ticket_accept })
        setDiffSetting(setting.ticket_accept == originSetting.ticket_accept)
    }
    const handleGroup = (id) => {
        if(id==0){
            setSetting({ ...setting, ticket_accept: false, group_id: id})
            setDiffSetting(originSetting.ticket_accept)
        }else{
            setSetting({ ...setting, ticket_accept: true, group_id: id })
        }
        setDiffSetting(id != originSetting.group_id)
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
                    <Button variant="contained" color='primary' onClick={postSetting} disabled={!diffSetting}>
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