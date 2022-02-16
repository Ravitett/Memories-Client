import React from 'react';
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Header from '../Components/Header'
import Footer from '../Components/Footer'

const Layout = () => {
    return (
        <Box>
            <ToastContainer rtl />
            <Header />
            <main>
                <Container sx={{my:3}}>
                    <Outlet />
                </Container>
            </main>
            <Footer />
        </Box>
    )
};

export default Layout;
