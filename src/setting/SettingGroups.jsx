import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, Grid, Typography } from '@material-ui/core'
import GroupCard from './GroupCard';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
    root: {
        color: '#222'
    },
}));

function SettingGroups (props) {
    const classes = useStyles();
    const [groupData, setGroupData] = useState([])

    useEffect(() => {
        fetchGroup()
    }, [])


    const fetchGroup = () => {
        axios.post(process.env.REACT_APP_API_URL + 'get_group_data.php')
        .then(function (response) {
            if (response.data.ok){
                setGroupData(response.data.data)
            }
        })
        .catch(function (error) {
            console.error(error)
        })
    }

    return(
        <React.Fragment>
            {
                Object.values(groupData).map((val) => (
                    <Grid item xs={6}>
                        <GroupCard data={val} selected={props.group_id==val.id} handleGroup={(id)=>props.handleGroup(id)}/>
                    </Grid>
                ))
            }
        </React.Fragment>
    )
}

export default SettingGroups;