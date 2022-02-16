import React from 'react';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Auth = ({ open, setOpen }) => {

    const [isRegistr, setIsRegister] = useState(false);
    const [alertRegister, setAlertRegister] = useState(false)

    return (
        <Dialog open={open} fullWidth={true}>
            <DialogTitle>
                {!isRegistr ? "התחברות" : "הרשמה"}
                <IconButton
                    onClick={() => { setOpen(false) }}
                    sx={{
                        position: 'absolute',
                        right: 10,
                        top: 10
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {alertRegister && <Alert severity="success">נרשמתם בהצלחה למערכת!</Alert>}
                {!isRegistr ? <LoginForm setOpen={setOpen} setAlertRegister={setAlertRegister}/> : <RegisterForm setIsRegister={setIsRegister} setAlertRegister={setAlertRegister} />}
            </DialogContent>
            <Typography align='center'>
                {!isRegistr ? "אין לכם חשבון?"
                    : "יש לכם חשבון?"}
                <Button onClick={() => { setIsRegister(!isRegistr) }} variant="text">לחצו כאן!</Button>
            </Typography>
        </Dialog>
    );
};

export default Auth;
