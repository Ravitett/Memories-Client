import React from 'react';
import { useState, useContext } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { Context } from '../Context';

import { login } from '../Api/auth';
import { loginLocalStorage } from '../Utilis/auth'

const LoginForm = ({ setOpen, setAlertRegister }) => {

    const { userLoginContext,userAdminContext, userNameContext } = useContext(Context);
    const [userLogin, setUserLogin] = userLoginContext;
    const [userAdmin, setUserAdmin] = userAdminContext;
    const [userName, setUserName] = userNameContext;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");


    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            let dataFromApi = await login(email, password)
            setError(false);
            if (dataFromApi.status && dataFromApi.status == 'success') {
                loginLocalStorage(dataFromApi);
                setUserLogin(true);
                dataFromApi.type == 'm' ? setUserAdmin(true) : setUserAdmin(false);
                setUserName(dataFromApi.fullName)
                setAlertRegister(false)
                setOpen(false);
            } else {
                setUserLogin(false);
                setUserAdmin(false)
                setError(true);
                setErrorMsg("שם משתמש או סיסמה לא תקינים")
            }
        }}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ width: 0.95 }}
            >
                <TextField
                    label="אימייל"
                    type="email"
                    required
                    variant="outlined"
                    sx={{ width: 0.75, mt: 1 }}
                    onChange={e => setEmail(e.target.value)}
                    error={error}
                    helperText={errorMsg}
                />
                <TextField
                    label="סיסמה"
                    type="password"
                    required
                    variant="outlined"
                    sx={{ width: 0.75 }}
                    onChange={e => setPassword(e.target.value)}
                    error={error}
                    helperText={errorMsg}
                />
                <Button type='submit' variant="contained">התחברות</Button>
            </Stack>
        </form>
    );
};

export default LoginForm;
