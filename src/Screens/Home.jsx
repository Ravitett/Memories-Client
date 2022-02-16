import React from 'react'
import { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import HomeMap from '../Components/HomeMap'
import MemoryCard from '../Components/MemoryCard';
import AboutUs from '../Components/AboutUs';
import Gallery from '../Components/Gallery';

const Home = () => {

    const [memory, setMenory] = useState(null);

    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={memory ? 6 : 4}>
                <Paper sx={{ width: 1, height: '80vh' }} elevation={2}>
                    {memory
                        ? <MemoryCard memoryId={memory} setMenory={setMenory}/>
                        : <AboutUs />
                    }
                </Paper>
            </Grid>
            <Grid item xs={memory ? 6 : 8}>
                <Paper sx={{ width: 1, height: '80vh' }} elevation={2}>
                    <HomeMap MarkerList={null}  setMenory={setMenory}/>
                </Paper>
            </Grid>
        </Grid>
        </>
    )
}

export default Home
