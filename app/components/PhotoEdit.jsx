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
import { IsChange } from '../context/IsChange';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ photoInfo }) {
    const [valueInput, setValueInput] = React.useState({ title: '', body: '', id: '' })
    const [successMessage, setSuccessMessage] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')
    const [open, setOpen] = React.useState(false);
    const { isChange, setIsChange } = React.useContext(IsChange)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setValueInput({ ...valueInput, title: photoInfo?.title, body: photoInfo?.body, id: photoInfo?._id })
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosUpload.put(`/control/${valueInput?.id}`, valueInput)
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

    React.useEffect(() => {
        setValueInput({ ...valueInput, title: photoInfo?.title, body: photoInfo?.body, id: photoInfo?._id })
    }, [photoInfo])
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
                        <TextField variant='filled' fullWidth label='Title' required sx={{ margin: '2px 0' }} inputProps={{ maxLength: 20 }} onChange={(e) => { setValueInput({ ...valueInput, title: e.target.value }) }} value={valueInput?.title} />
                        <TextField multiline variant='filled' rows={4} label='Body' fullWidth required sx={{ margin: '2px 0' }} inputProps={{ maxLength: 50 }} onChange={(e) => { setValueInput({ ...valueInput, body: e.target.value }) }} value={valueInput?.body} />
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
