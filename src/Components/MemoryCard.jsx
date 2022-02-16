import React from 'react'
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CollectionsIcon from '@mui/icons-material/Collections';

import { getMemory } from '../Api/memories';

import Gallery from './Gallery';

const MemoryCard = ({ memoryId, setMenory }) => {

    const [data, setData] = useState([]);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [gallery, setGallery] = useState(false);

    useEffect(async () => {
        let dataFromApi = await getMemory(memoryId);
        setData(dataFromApi);
        if(dataFromApi.gallery) setGallery(true)
    }, [memoryId]);

    return (
        <Card sx={{ height: 1 }} style={{ position: "relative" }}>
            <Gallery data={data.gallery} open={galleryOpen} setOpen={setGalleryOpen} />
            <CardHeader
                title={data.title}
                subheader={data.date}
                action={
                    <>
                        {gallery && <IconButton onClick={() => { setGalleryOpen(true) }}>
                            <CollectionsIcon />
                        </IconButton>}
                        <IconButton onClick={() => { setMenory(null) }}>
                            <CloseIcon />
                        </IconButton>
                    </>
                }
            />
            <CardContent>
                <Typography style={{
                    height: "60vh",
                    overflowY: "scroll"
                }}>{data.memory}</Typography>
            </CardContent>
        </Card>
    )
}

export default MemoryCard