import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#222'
    },
}));

const voteSum = (data) => {
    return data.reduce((result, current) => {
        const el = result.find(p => p.no === current.no)
        if(el){
            el.count++
        }else{
            result.push({
                no: current.no,
                name: current.name,
                count: 1,
            })
        }
        return result
    },[])
}

const sortData = data => {
    return data.sort(function(a, b){
        if(a.no < b.no){
            return -1
        }else{
            return 1
        }
    })
}



function VoteTable (props) {
    const classes = useStyles();
    console.log(props.data)
    return(
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>団体名</TableCell>
                        <TableCell>投票数</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        sortData(voteSum(props.data)).map((val) => (
                            <TableRow>
                                <TableCell>{val.no}</TableCell>
                                <TableCell>{val.name}</TableCell>
                                <TableCell>{val.count}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default VoteTable;