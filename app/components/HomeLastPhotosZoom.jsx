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
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: '60%',
    width: { xs: '90%', md: '50%' },
};

export default function HomeLastPhotosZoom({ url, title }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <CardMedia
                sx={{ cursor: 'pointer', objectFit: 'contain' }}
                onClick={handleOpen}
                component="img"
                height="194"
                image={url}
                alt={title}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography component="img" src={url} alt={title} sx={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                </Box>
            </Modal>
        </div>
    );
}
