import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CardMedia } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '80%', md: '50%', xl: '30%' },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: '60%',
};

export default function HomeLastPhotosZoom() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <CardMedia
                sx={{ cursor: 'pointer' }}
                onClick={handleOpen}
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg"
                alt="Paella dish"
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography component="img" src="/static/images/cards/paella.jpg" alt="Paella dish" />
                </Box>
            </Modal>
        </div>
    );
}
