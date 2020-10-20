import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, Grid, Typography } from '@material-ui/core'
import GroupCard from './GroupCard';
import axios from 'axios';
import Setting from './Setting';



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

    const zeroData = {
        id: 0,
        no: 0,
        name: '--表示なし--',
    }

    return(
        <React.Fragment>
            <Grid item xs={6}>
                <GroupCard data={zeroData} selected={props.group_id == zeroData.id} handleGroup={(id) => props.handleGroup(id)} />
            </Grid>
            {
                props.round == "first" ?
                Object.values(groupData).map((val) => (
                    <Grid item xs={6}>
                        <GroupCard data={val} selected={props.group_id==val.id} handleGroup={(id)=>props.handleGroup(id)}/>
                    </Grid>
                ))
                :
                Object.values(groupData).filter((val)=>{return val.final}).map((val) => (
                    <Grid item xs={6}>
                        <GroupCard data={val} selected={props.group_id == val.id} handleGroup={(id) => props.handleGroup(id)} />
                    </Grid>
                ))
            }
        </React.Fragment>
    )
}

export default SettingGroups;