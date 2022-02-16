import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

import { Context } from '../Context';

import Chat from '../Components/Chat';
import { changeStatus, getBadWords, getMemoryForApprove } from '../Api/memories'


const AdminMemory = () => {

    let navigate = useNavigate();
    let params = useParams();

    const { userAdminContext } = useContext(Context);
    const [userAdmin, setUserAdmin] = userAdminContext;

    const [data, setData] = useState({});
    const [memory, setMemory] = useState({ __html: "" });
    useEffect(async () => {
        if (!userAdmin) return navigate("/");
        let dataFromApi = await getMemoryForApprove(params.memoryId);
        let badWordsFromApi = await getBadWords();
        console.log(dataFromApi);
        setData(dataFromApi);
        setMemory({ __html: changeBadWordsStyle(badWordsFromApi, dataFromApi.memory) })
    }, [userAdmin])

    const changeBadWordsStyle = (_badWords, _text) => {
        _badWords.map(word => _text = _text.replaceAll(word, `<span style='color:red'>${word}</span>`))
        return _text;
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper elevation={2}>
                        <Card sx={{ height: "80vh" }} style={{ position: "relative" }}>
                            <CardHeader
                                action={
                                    <IconButton onClick={()=>{navigate("/admin")}}>
                                        <CloseIcon />
                                    </IconButton>
                                }
                                title={data.title}
                                subheader={`${data.full_name} / ${data.date}`}
                            />
                            <CardContent style={{
                                height: "45vh",
                                overflowY: "scroll"
                            }}>
                                <Typography dangerouslySetInnerHTML={memory}></Typography>
                            </CardContent>
                            <CardActions style={{ position: "absolute", bottom: 0 }}>
                                <Button variant="outlined" color="success" onClick={async () => {
                                    let res = await changeStatus(data._id, 'approved');
                                    res.status == 'success' ? toast.success("הזיכרון אושר בהצלחה") : toast.error("הזיכרון כבר אושר ומוצג באתר");
                                    navigate("/admin")
                                }} >אישור זיכרון</Button>
                                <Button  variant='outlined' color="warning" onClick={async () => {
                                    let res = await changeStatus(data._id, 'pending');
                                    res.status == 'success' ? toast.success("הזיכרון הועבר להמתנה") : toast.error("הזיכרון כבר נמצא בהמתנה");
                                    navigate("/admin");
                                }} >בדיקת זיכרון</Button>
                                <Button variant='outlined' color="error" onClick={async () => {
                                    let res = await changeStatus(data._id, 'declined');
                                    res.status == 'success' ? toast.success("הזיכרון נפסל בהצלחה") : toast.error("הזיכרון כבר נמצא בהמתנה");
                                    navigate("/admin");
                                }} >פסילת זיכרון</Button>
                            </CardActions>
                        </Card>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={2}>
                        <Typography variant='h5' sx={{height:"10vh", p:3}}>צ'אט</Typography>
                        <Chat memoryID={params.memoryId} userType="manager" />
                    </Paper>
                </Grid>
            </Grid>
        </Box>

    )
};

export default AdminMemory;

