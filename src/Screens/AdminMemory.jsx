import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';

import Chat from '../Components/Chat';
import { changeStatus, getBadWords, getMemoryForApprove } from '../Api/memories'

const AdminMemory = () => {

    let params = useParams();

    const [data, setData] = useState({});
    const [memory, setMemory] = useState({ __html: "" });
    useEffect(async () => {
        let dataFromApi = await getMemoryForApprove(params.memoryId);
        let badWordsFromApi = await getBadWords();
        console.log(dataFromApi);
        setData(dataFromApi);
        setMemory({ __html:  changeBadWordsStyle(badWordsFromApi,dataFromApi.memory)})
    }, [])

    const changeBadWordsStyle = (_badWords, _text) => {
        _badWords.map(word => _text = _text.replaceAll(word, `<span style='color:red'>${word}</span>`))
        return _text;
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper elevation={2}>
                        <Card sx={{ height: 450 }} style={{ position: "relative" }}>
                            <CardHeader
                                action={
                                    <IconButton>
                                        <CloseIcon />
                                    </IconButton>
                                }
                                title={data.title}
                                subheader={`${data.full_name} / ${data.date}`}
                            />
                            <CardContent>
                                <Typography dangerouslySetInnerHTML={memory}></Typography>
                            </CardContent>
                            <CardActions style={{ position: "absolute", bottom: 0 }}>
                                <Button variant="outlined" color="success" onClick={async()=>{
                                    let res = await changeStatus(data._id,'approved');
                                    res.status == 'success' ? toast.success("הזיכרון אושר בהצלחה") : toast.error("הזיכרון כבר אושר ומוצג באתר"); 
                                }} >אישור זיכרון</Button>
                                <Button sx={{ mr: 2 }} variant='outlined' color="error" onClick={async()=>{
                                    let res = await changeStatus(data._id,'pending');
                                    res.status == 'success' ? toast.success("הזיכרון הועבר להמתנה") : toast.error("הזיכרון כבר נמצא בהמתנה");
                                }} >בדיקת זיכרון</Button>
                            </CardActions>
                        </Card>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={2}><Chat memoryID={params.memoryId} userType="manager"/></Paper>
                </Grid>
            </Grid>
        </Box>

    )
};

export default AdminMemory;

