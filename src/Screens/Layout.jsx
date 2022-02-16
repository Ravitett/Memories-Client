import React from 'react';
import { useContext } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { Context } from '../Context';
import Header from '../Components/Header'
import Footer from '../Components/Footer'

const Layout = () => {
    let navigate = useNavigate();

    const { userLoginContext } = useContext(Context);
    const [userLogin, setUserLogin] = userLoginContext;
    
    return (
        <Box>
            <ToastContainer rtl />
            <Header />
            <main>
                <Container sx={{ height:"85vh", pt:3 }}>
                    <Outlet />
                </Container>
            </main>
            {userLogin && <Fab style={{
                position:"absolute",
                bottom:"7%",
                right:"1%"
            }} color="primary" aria-label="add"
            onClick={()=>{navigate("/user/new")}}>
                <AddIcon />
            </Fab>}
            <Footer />
        </Box>
    )
};

export default Layout;
