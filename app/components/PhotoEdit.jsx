import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Alert, TextField, Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
    const [successMessage, setSuccessMessage] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        // handleClose()
        console.log(123);
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
                        <TextField id="filled-basic" label="Title" variant="filled" required />
                        <Typography component={'textarea'} width={'100%'} height={'150px'} maxLength={50} sx={{ resize: 'none' }} placeholder='Body' required padding={'10px'}></Typography>
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
