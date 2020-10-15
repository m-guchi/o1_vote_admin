import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, FormGroup, FormControlLabel, FormLabel, Grid, Typography, InputLabel } from '@material-ui/core'
import { RadioGroup, Radio, Switch, Select, MenuItem} from '@material-ui/core'

import SettingGroups from './SettingGroups'


const useStyles = makeStyles((theme) => ({
    root: {
        color: '#222'
    },
    gridBox: {
        marginTop: '1rem'
    },
}));

function SettingDetail (props) {
    const classes = useStyles();

    return(
        <FormGroup>
            <Grid container spacing={2} className={classes.gridBox}>
                <Grid item xs={12}>
                    <FormLabel>予選/決勝</FormLabel>
                    <RadioGroup name="round" value={props.setting.round} onChange={props.handleChangeRound}>
                        <FormControlLabel value="first" control={<Radio color="primary"/>} label="予選" />
                        <FormControlLabel value="final" control={<Radio color="primary" />} label="決勝" />
                    </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={Boolean(props.setting.vote)}
                                onChange={props.handleChangeVote}
                                name="vote"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary  checkbox' }}
                            />
                        }
                        label="投票"
                    />
                </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2} className={classes.gridBox}>
                <Grid item xs={12}>
                    <Typography variant='h6'>
                        {Boolean(props.setting.vote)?'投票':'発表'}
                    </Typography>
                </Grid>
                {
                    Boolean(props.setting.vote) ?
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={Boolean(props.setting.vote_accept)}
                                    onChange={props.handleChangeVoteAccept}
                                    name="vote_accept"
                                    color="primary"
                                    inputProps={{ 'aria-label': 'primary  checkbox' }}
                                />
                            }
                            label="投票受付"
                        />
                    </Grid>
                    :
                    <React.Fragment>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={Boolean(props.setting.ticket_accept)}
                                        onChange={props.handleChangeTicketAccept}
                                        name="ticket_accept"
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary  checkbox' }}
                                    />
                                }
                                label="投票チケット取得可"
                            />
                        </Grid>
                            <SettingGroups group_id={props.setting.group_id} handleGroup={(id) => props.handleGroup(id)}/>
                    </React.Fragment>
                }
            </Grid>
        </FormGroup>
    )
}

export default SettingDetail;