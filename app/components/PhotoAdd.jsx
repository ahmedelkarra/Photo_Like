import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Alert, MenuItem, TextField } from '@mui/material';
import { green } from '@mui/material/colors';
import { axiosUpload } from '../utils/axiosUpload';
import { IsChange } from '../context/IsChange';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', md: '60%' },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function PhotoAdd({ status }) {
    const [valueInput, setValueInput] = React.useState({ title: '', body: '', image: '' })
    const { isChange, setIsChange } = React.useContext(IsChange)
    const [successMessage, setSuccessMessage] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', valueInput.title)
        formData.append('body', valueInput.body)
        formData.append('image', valueInput.image)
        axiosUpload.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((e) => {
                setErrorMessage('')
                setSuccessMessage(e?.data?.message)
                setIsChange(true)
                setTimeout(() => {
                    setSuccessMessage('')
                    handleClose()
                }, 3000)
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.message)
                setTimeout(() => {
                    setErrorMessage('')
                }, 3000)
            })
    }
    return (
        <Typography component={'div'}>
            {status === 'xs' ?
                <MenuItem onClick={handleOpen}>
                    <Typography color={green[800]} textAlign="center">Upload</Typography>
                </MenuItem>
                :
                <Button
                    onClick={handleOpen}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    Upload
                </Button>
            }
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography component={'form'} encType={'multipart/form-data'} onSubmit={(e) => handleSubmit(e)}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Upload Photo
                        </Typography>
                        {successMessage && <Alert severity="success" sx={{ width: '100%', margin: '10px auto' }}>{successMessage}</Alert>}
                        {errorMessage && <Alert severity="error" sx={{ width: '100%', margin: '10px auto' }}>{errorMessage}</Alert>}
                        <TextField variant='filled' fullWidth label='Title' required sx={{ margin: '2px 0' }} inputProps={{ maxLength: 20 }} onChange={(e) => { setValueInput({ ...valueInput, title: e.target.value }) }} />
                        <TextField multiline variant='filled' rows={4} label='Body' fullWidth required sx={{ margin: '2px 0' }} inputProps={{ maxLength: 50 }} onChange={(e) => { setValueInput({ ...valueInput, body: e.target.value }) }} />
                        <TextField type='file' variant='outlined' color='primary' inputProps={{ accept: "image/*" }} fullWidth required sx={{ margin: '2px 0' }} onChange={(e) => { setValueInput({ ...valueInput, image: e.target.files[0] }) }} />
                        <Typography sx={{ mt: 2 }} textAlign={'center'}>
                            <Button color='success' variant='contained' sx={{ width: '40%', margin: '0 5px' }} type='submit'>Upload</Button>
                            <Button color='error' variant='contained' sx={{ width: '40%', margin: '0 5px' }} onClick={handleClose}>Cancel</Button>
                        </Typography>
                    </Typography>
                </Box>
            </Modal>
        </Typography >
    );
}
