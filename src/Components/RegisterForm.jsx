import React from 'react';
import { useState } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { register } from '../Api/auth';

const RegisterForm = ({ setIsRegister, setAlertRegister }) => {
  const [email, setEmail] = useState("");
  const [full_name, setFull_name] = useState("אנונימי");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorMsgEmail, setErrorMsgEmail] = useState("");
  const [errorMsgPassword, setErrorMsgPassword] = useState("");

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      let dataFromApi = await register(email, full_name, password, confirmPassword)
      console.log(dataFromApi);
      setErrorEmail(false)
      setErrorMsgEmail("")
      setErrorPassword(false)
      setErrorMsgPassword("")
      if (dataFromApi.status && dataFromApi.status == 'success') {
        setAlertRegister(true);
        setIsRegister(false);
      } else {
        switch (dataFromApi.error) {
          case 1:
            setErrorPassword(true)
            setErrorMsgPassword("הסיסמאות לא זהות")
            break;

          case 2:
            setErrorEmail(true)
            setErrorMsgEmail("שם משתמש תפוס")
            break;

          default:
            setErrorEmail(true)
            setErrorMsgEmail("שם משתמש או סיסמה לא תקינים")
            setErrorPassword(true)
            setErrorMsgPassword("שם משתמש או סיסמה לא תקינים")
            break;
        }
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
          error={errorEmail}
          helperText={errorMsgEmail}
        />
        <TextField
          label="שם מלא"
          type="text"
          required
          defaultValue={full_name}
          variant="outlined"
          sx={{ width: 0.75, mt: 1 }}
          onChange={e => setFull_name(e.target.value)}
        />
        <TextField
          label="סיסמה"
          type="password"
          required
          variant="outlined"
          sx={{ width: 0.75 }}
          onChange={e => setPassword(e.target.value)}
          error={errorPassword}
          helperText={errorMsgPassword}
        />
        <TextField
          label="אימות סיסמה"
          type="password"
          required
          variant="outlined"
          sx={{ width: 0.75 }}
          onChange={e => setConfirmPassword(e.target.value)}
          error={errorPassword}
          helperText={errorMsgPassword}
        />
        <Button type='submit' variant="contained">הרשמה</Button>
      </Stack>
    </form>
  )
};

export default RegisterForm;
