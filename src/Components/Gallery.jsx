import React from 'react'

import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import Paper from '@mui/material/Paper';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Gallery = ({ data, open, setOpen }) => {

    const [src, setSrc] = useState(0);

    const next = () => {
        if(src >= data.length - 1) return setSrc(0);
        setSrc(src + 1);
    }

    const previous = () => {
        if(src <= 0) return setSrc(data.length - 1);
        setSrc(src - 1);
    }

    return (
        <>
        {data && <Dialog open={open} fullWidth={true}>
            <DialogTitle>
                גלרייה
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
                <Grid container>
                    <Grid item xs={1}>
                        <IconButton
                            onClick={previous}
                            sx={{
                                position: 'absolute',
                                top: "50%"
                            }}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={10}>
                        <Paper sx={{ height: "50vh" }}>
                            <img src={data[src]} style={{ width: "100%" }} />
                        </Paper>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                            onClick={next}
                            sx={{
                                position: 'absolute',
                                right:10,
                                top: "50%"
                            }}
                        >
                            <ArrowBackIosIcon />
                        </IconButton>
                    </Grid>
                </Grid>

            </DialogContent>
        </Dialog>}
        </>
    )
}

export default Gallery