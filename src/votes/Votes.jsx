import React, { useState, useEffect } from 'react';
import { Paper, Tabs, Tab, Typography } from '@material-ui/core'
import axios from 'axios'

import VoteTable from './VoteTable'


function Votes () {
    const [round, setRound] = useState('first')
    const [voteData, setVoteData] = useState([])
    const [dataLoaded, setDataLoaded] = useState(false)

    useEffect(() => {
        fetchVotes()
    }, [])

    const fetchVotes = () => {
        axios.post(process.env.REACT_APP_API_URL + 'get_vote_all.php')
        .then(function (response) {
            if (response.data.ok) {
                setVoteData(response.data.data)
                setDataLoaded(true)
                // console.log(response.data.data)
            }
        })
        .catch(function (error) {
            console.error(error)
        })
    }

    const roundVote = (data, round) => {
        return data.filter(val => val.round == round)
    }

    const handleChange = (event, newValue) => {
        setRound(newValue);
    };

    return(
        <React.Fragment>
            <Typography variant='h5' gutterBottom>投票結果</Typography>
            <React.Fragment>
                <Paper>
                    <Tabs
                        value={round}
                        onChange={handleChange}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab value="first" label="予選" />
                        <Tab value="final" label="決勝" />
                    </Tabs>
                </Paper>
                {dataLoaded &&  <VoteTable data={roundVote(voteData, round)} />}
            </React.Fragment>
        </React.Fragment>
    )
}

export default Votes;