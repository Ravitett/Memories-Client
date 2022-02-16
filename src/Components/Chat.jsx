import React from 'react'
import { useState, useEffect } from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

import SendIcon from '@mui/icons-material/Send';

import { chatSendMsg, getMemoryForApprove } from '../Api/memories'

const Chat = ({ memoryID, userType }) => {

    const [message, setMessage] = useState('')
    const [chatState, setChatState] = useState([])
    useEffect(async () => {
        let dataFromApi = await getMemoryForApprove(memoryID);
        setChatState(dataFromApi.chat);
    }, [])
    const updateChatState = (_from, _message) => {
        let obj = { from: _from, message: _message };
        setChatState(old => [...old, obj]);
        setMessage('');
    }
    return (
        <Card sx={{ height: 450 }} style={{ position: "relative" }}>
            <CardContent style={{height:"80%" ,overflow: "scroll"}}>
                {chatState.map(msg => <Message msg={msg} />)}
            </CardContent>
            <CardActions style={{ position: "absolute", bottom: 0 }}>
                <IconButton onClick={async () => {
                    let res = await chatSendMsg(memoryID, userType, message);
                    console.log(res);
                    res.status == 'success' ? updateChatState(userType, message) : setMessage('');
                }}>
                    <SendIcon />
                </IconButton>
                <TextField onChange={(e) => { setMessage(e.target.value) }} value={message} id="filled-basic" label="הודעה" variant="filled" />
            </CardActions>
        </Card>
    )
}

export default Chat;

const Message = ({ msg }) => {
    if (msg.from === 'manager') {
        return (
            <Paper sx={{
                width: 2/3,
                color:"white",
                bgcolor: 'primary.main',
                my:2,
                ml:5,
                mr:1,
                px:1,
                py:2
            }} elevation={1}>
                {msg.message}
            </Paper>
        );
    } else {
        return (
            <Paper sx={{
                width: 2/3,
                color:"white",
                bgcolor: 'primary.secondary',
                my:2,
                ml:1,
                mr:10,
                px:1,
                py:2
            }} elevation={1}>
                {msg.message}
            </Paper>
        );
    }
}

/*
<div className="card">
            <div className="card-header text-center">
                צ'אט
            </div>
            <div style={{height:"250px"}} className="card-body overflow-auto">
                {chatState.map(msg => <p><strong>From {msg.from}: </strong>{msg.message}</p>)}
            </div>
            <div className="card-footer text-muted">
                <div className="row">
                    <div className="col-2 d-flex justify-content-center align-items-center">
                        <i id="send-icon" onClick={async() => {
                            let res = await   chatSendMsg(memoryID, userType, message);
                            res.status == 'success' ? updateChatState(userType, message) : setMessage('') ;
                        }} class="fas fa-paper-plane"></i>
                    </div>
                    <div className="col-10 d-flex justify-content-center align-items-center">
                        <input type="text" onChange={(e) => {setMessage(e.target.value)}} value={message} className="form-control" />
                    </div>
                </div>
            </div>
        </div>

*/
