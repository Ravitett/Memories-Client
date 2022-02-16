import React from 'react';
import { Outlet } from "react-router-dom";

import Container from '@mui/material/Container';

import Header from '../Components/Header'
import Footer from '../Components/Footer'

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer />
        </>
    )
};

export default Layout;
