import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ChatIcon from '@mui/icons-material/Chat';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { toast } from 'react-toastify';

import { Context } from '../Context';
import { addMemory, getMemoryForUser, updateMemory, deleteMemory } from '../Api/memories';
import UserMap from '../Components/UserMap';
import Chat from '../Components/Chat';

const ImgGallery = ({ src, index, setGallery }) => {
    return (
        <Paper sx={{ height: 70, position: "relative" }}>
            <IconButton onClick={() => {
                setGallery(old => {
                    return old.filter((f, i) => i !== index)
                })
            }} size='small' sx={{ position: "absolute", top: 0, left: 0 }}>
                <DeleteIcon color='error' fontSize="small" />
            </IconButton>
            <img src={src} style={{ height: "100%" }} />
        </Paper>
    )
}

const DeleteDialog = ({ open, setOpen, memoryID }) => {

    let navigate = useNavigate();

    const delMemory = async () => {

        let dataFromApi = await deleteMemory(memoryID);

        dataFromApi.status == 'success'
            ? toast.success("הזיכרון נמחק בהצלחה")
            : toast.error("משהו השתבש במחיקת הזיכרון");

        navigate("/user")
    }

    return (
        <Dialog open={open}>
            <DialogContent>
                האם למחוק את הזיכרון ?
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{setOpen(false)}}>ביטול</Button>
                <Button onClick={delMemory} autoFocus>מחיקה</Button>
            </DialogActions>
        </Dialog>
    );

}


const UserMemory = () => {

    let navigate = useNavigate();
    let params = useParams();

    const { userLoginContext, userAlertContext } = useContext(Context);
    const [userLogin, setUserLogin] = userLoginContext;

    const [title, setTitle] = useState("");
    const [memory, setMrmory] = useState("");
    const [gallery, setGallery] = useState([]);
    const [img, setImg] = useState("");
    const [date, setDate] = useState("");

    const [location, setLocation] = useState(null);
    const [isNew, setIsNew] = useState(true);

    useEffect(async () => {
        if (!userLogin) return navigate("/");

        if (params.memoryId == 'new') return;

        setIsNew(false);

        let dataFromApi = await getMemoryForUser(params.memoryId);
        if (dataFromApi.status == 'error') return;

        setTitle(dataFromApi.title);
        setMrmory(dataFromApi.memory);
        setGallery(dataFromApi.gallery);
        setDate(dataFromApi.date);
        setLocation(dataFromApi.location);

    }, [userLogin])

    const [titleErr, setTitleErr] = useState(false);
    const [memoryErr, setMemoryErr] = useState(false);
    const [dateErr, setDateErr] = useState(false);

    const [chatOpen, setChatOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const saveMemory = async () => {
        setTitleErr(false);
        setDateErr(false);
        setMemoryErr(false);
        if (title == "") return setTitleErr(true);
        if (date == "") return setDateErr(true);
        if (memory == "") return setMemoryErr(true);
        if (!location) return;

        const body = { title, memory, gallery, date, location }
        let dataFromApi = isNew ? await addMemory(body) : await updateMemory(params.memoryId, body);

        dataFromApi.status == 'success'
            ? toast.success("הזיכרון נשמר בהצלחה")
            : toast.error("משהו השתבש בשמירת הזיכרון");

        navigate("/user")
    }

    return (
        <Box>
            {params.memoryId != 'new' && <Fab style={{
                position: "absolute",
                bottom: "7%",
                left: "1%",
                zIndex: 10000
            }} color="primary" aria-label="add"
                onClick={() => { setChatOpen(true) }}>
                <ChatIcon />
            </Fab>}
            <Dialog open={chatOpen} fullWidth={true}>
                <DialogTitle>
                    צ'אט
                    <IconButton
                        onClick={() => { setChatOpen(false) }}
                        sx={{
                            position: 'absolute',
                            right: 10,
                            top: 10
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Chat memoryID={params.memoryId} userType="user" />
            </Dialog>

            <DeleteDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} memoryID={params.memoryId}/>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper elevation={2}>
                        <Card sx={{ height: "80vh" }} style={{ position: "relative" }}>
                            <CardHeader
                                title={isNew ? "הוספת זיכרון" : "עריכת זיכרון"}
                                action={
                                    <FormControlLabel control={<Switch defaultChecked />} label="זיכרון אנונימי" />
                                }
                            />
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{ width: 1 }}
                            >
                                <TextField
                                    label="כותרת הזיכרון"
                                    type="text"
                                    required
                                    error={titleErr}
                                    size="small"
                                    variant="outlined"
                                    sx={{ width: 0.5 }}
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                                <TextField
                                    label="תאריך הזיכרון"
                                    type="date"
                                    required
                                    error={dateErr}
                                    size="small"
                                    variant="outlined"
                                    sx={{ width: 0.5 }}
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                />

                            </Stack>

                            <TextField
                                multiline={true}
                                rows={7}
                                label="זיכרון"
                                type="text"
                                required
                                error={memoryErr}
                                size="small"
                                variant="outlined"
                                sx={{ width: 1, mt: 1 }}
                                value={memory}
                                onChange={e => setMrmory(e.target.value)}
                            />
                            <TextField
                                label="הוספת כתובת תמונה"
                                type="url"
                                size="small"
                                variant="outlined"
                                sx={{ width: 1, mt: 1 }}
                                value={img}
                                onChange={e => setImg(e.target.value)}
                                helperText="הוספת תמונות מכתובת אינטרנט, עד ארבע תמונות"
                                InputProps={{
                                    endAdornment: <Button variant="contained"
                                        sx={{ width: 0.4, m: 1 }}
                                        onClick={() => {
                                            if (img != "" && gallery.length < 4) {
                                                setGallery(old => [...old, img]);
                                                setImg("")
                                            }
                                        }}>שמירת תמונה</Button>
                                }}
                            />
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{ width: 1 }}
                            >
                                {gallery.map(((g, i) => <ImgGallery key={i} src={g} index={i} setGallery={setGallery} />))}
                            </Stack>
                            <CardActions style={{ position: "absolute", bottom: 0 }}>
                                <Button onClick={saveMemory} variant="outlined">שמירת זיכרון</Button>
                                {!isNew && <Button onClick={() => {setDeleteDialogOpen(true)}} variant="outlined" color='error'>מחיקת זיכרון</Button>}
                                <Button onClick={() => { navigate(`/`); }} variant="outlined">ביטול</Button>
                            </CardActions>
                        </Card>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={2}>
                        <Card sx={{ height: "80vh" }} style={{ position: "relative" }}>
                            <UserMap location={location} setLocation={setLocation} />
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserMemory;
