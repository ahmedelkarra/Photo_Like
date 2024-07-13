import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Alert, TextField, Typography } from '@mui/material';
import { axiosUpload } from '../utils/axiosUpload';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
    const [valueInput, setValueInput] = React.useState({ title: '', body: '', id: '' })
    const [successMessage, setSuccessMessage] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosUpload.post(`/control/${valueInput}`, valueInput)
            .then((e) => {
                setErrorMessage('')
                setSuccessMessage(e?.data?.message)
                setTimeout(() => {
                    setSuccessMessage('')
                }, 3000)
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.message)
                setTimeout(() => {
                    setErrorMessage('')
                }, 3000)
            })
        console.log(valueInput)
    }
    return (
        <React.Fragment>
            <Button variant="outlined" color='warning' onClick={handleClickOpen} sx={{ width: '100%' }}>
                Edit
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                // onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Edit Form</DialogTitle>
                <DialogContent>
                    <DialogContentText component={'div'} id="alert-dialog-slide-description" sx={{ width: { xs: '100%', md: '500px' }, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <Typography component={'div'}>
                            {successMessage && <Alert severity="success" sx={{ width: '100%', margin: 'auto' }}>{successMessage}</Alert>}
                            {errorMessage && <Alert severity="error" sx={{ width: '100%', margin: 'auto' }}>{errorMessage}</Alert>}
                        </Typography>
                        <TextField variant='filled' fullWidth label='Title' required sx={{ margin: '2px 0' }} inputProps={{ maxLength: 20 }} onChange={(e) => { setValueInput({ ...valueInput, title: e.target.value }) }} />
                        <TextField multiline variant='filled' rows={4} label='Body' fullWidth required sx={{ margin: '2px 0' }} inputProps={{ maxLength: 50 }} onChange={(e) => { setValueInput({ ...valueInput, body: e.target.value }) }} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error'>Cancel</Button>
                    <Button onClick={handleSubmit} color='success'>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
