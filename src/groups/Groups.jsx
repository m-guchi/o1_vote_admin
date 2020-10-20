import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, Grid, Typography } from '@material-ui/core'
import axios from 'axios';


import GroupFinal from './GroupFinal'


const useStyles = makeStyles((theme) => ({
    root: {
        color: '#222'
    },
}));


function Groups () {
    const classes = useStyles();
    const [groupData, setGroupData] = useState([])

    useEffect(() => {
        fetchGroup()
    }, [])

    const fetchGroup = () => {
        axios.post(process.env.REACT_APP_API_URL + 'get_group_data.php')
        .then(function (response) {
            if (response.data.ok) {
                setGroupData(response.data.data)
            }
        })
        .catch(function (error) {
            console.error(error)
        })
    }

    return(
        <div className={classes.root}>
            <Typography variant='h5' gutterBottom>団体一覧</Typography>
            <Grid container spacing={1}>
            {
                Object.values(groupData).map((val) => (
                    <GroupFinal data={val}/>
                ))
            }
            </Grid>
        </div>
    )
}

export default Groups;