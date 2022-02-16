import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Auth from './Auth';

import { Context } from '../Context';

import { logOut } from '../Utilis/auth';

const Header = () => {

  let navigate = useNavigate();

  const { userLoginContext, userAdminContext, userNameContext } = useContext(Context);
  const [userLogin, setUserLogin] = userLoginContext;
  const [userAdmin, setUserAdmin] = userAdminContext;
  const [userName, setUserName] = userNameContext;

  const [authOpen, setAuthOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      <AppBar style={{ heigth: "10vh" }} position="static">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{
            height: "10vh",
            p: 2
          }}
        >
          <Box sx={{ width: 0.33 }}>
            <Typography>
              ברוך הבא {userName}
            </Typography>
          </Box>
          <Box sx={{ width: 0.33 }}>
            <Typography sx={{ textAlign: "center" }} variant='h4'>
              <Link to="/" style={{color:"#fff",textDecoration:"none"}}>
                זיכרונות
              </Link>
            </Typography>
          </Box>
          <Box style={{ display: "flex", justifyContent: "left" }} sx={{ width: 0.33, alignItems: "left" }}>
            {!userLogin
              ? <Button onClick={() => { setAuthOpen(true) }} color="inherit">התחברות</Button>
              : <><IconButton color="inherit"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <MenuIcon />
              </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => { navigate("/") }}>דף הבית</MenuItem>
                  <MenuItem onClick={() => { navigate("/user") }}>הזכרונות שלי</MenuItem>
                  <MenuItem onClick={() => { navigate("/user/new") }}>הוספת זיכרון</MenuItem>
                  {userAdmin && <MenuItem onClick={() => { navigate("/admin") }}>אישור זכרונות</MenuItem>}
                  <MenuItem onClick={() => {
                    logOut();
                    setUserLogin(false);
                    setUserAdmin(false);
                    setUserName("אורח");

                  }} >התנתקות</MenuItem>
                </Menu></>
            }
          </Box>
        </Stack>
      </AppBar>
      <Auth open={authOpen} setOpen={setAuthOpen} />
    </header>
  )
}

export default Header
