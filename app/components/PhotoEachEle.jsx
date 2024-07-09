import { Grid, Typography } from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PhotoEdit from './PhotoEdit';

function PhotoEachEle() {
    return (
        <Grid item xs={12} sm={6} xl={4}>
            <Card sx={{ maxWidth: '100%' }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <PhotoEdit />
                    <Button><DeleteForeverIcon color='error' sx={{ width: '35px', height: '35px' }} /></Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default PhotoEachEle