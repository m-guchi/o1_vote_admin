import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@material-ui/core'
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    root: {
        color: '#222'
    },
}));

function Tickets () {
    const classes = useStyles();
    const [ticketsData, setTicketsData] = useState([])

    useEffect(() => {
        fetchTickets()
    }, [])

    const fetchTickets = () => {
        axios.post(process.env.REACT_APP_API_URL + 'get_ticket_all.php')
        .then(function (response) {
            if (response.data.ok) {
                const user = userCount(response.data.data)
                setTicketsData(numberCount(user))
            }
        })
        .catch(function (error) {
            console.error(error)
        })
    }


    const userCount = (ticket) => {
        return ticket.reduce((result, current) => {
            const el = result.find(p => p.user_id === current.user_id)
            if(el){
                el.count ++;
            }else{
                result.push({
                    user_id: current.user_id,
                    count: 1,
                })
            }
            return result;
        },[])
    }

    
    const numberCount = (ticket) => {
        var list = {1:0,2:0,3:0}
        ticket.forEach(element => {
            const count = element.count
            if(count == 1) list[1]++
            else if(count == 2) list[2]++
            else if(count >= 3) list[3]++
        });
        return list
    }
    
    return(
        <div className={classes.root}>
            <Typography variant='h5' gutterBottom>投票チケット</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>獲得枚数</TableCell>
                            <TableCell>人数</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1枚以上</TableCell>
                            <TableCell>{ticketsData[3] + ticketsData[2] + ticketsData[1]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2枚以上</TableCell>
                            <TableCell>{ticketsData[3] + ticketsData[2]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3枚以上</TableCell>
                            <TableCell>{ticketsData[3]}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <div>
                1枚：{ticketsData[1]}<br/>
                2枚：{ticketsData[2]}<br />
                3枚以上：{ticketsData[3]}
            </div> */}
        </div>
    )
}

export default Tickets;