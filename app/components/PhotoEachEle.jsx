import { Grid, Typography } from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PhotoEdit from './PhotoEdit';

function PhotoEachEle({ photoInfo }) {
    return (
        <Grid item xs={12} sm={6} xl={4}>
            <Card sx={{ maxWidth: '100%' }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={photoInfo?.url}
                    title={photoInfo?.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {photoInfo?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {photoInfo?.body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <PhotoEdit photoInfo={photoInfo} />
                    <Button><DeleteForeverIcon color='error' sx={{ width: '35px', height: '35px' }} /></Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default PhotoEachEle