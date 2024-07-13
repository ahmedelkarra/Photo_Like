import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid, IconButton } from '@mui/material';
import HomeLastPhotosZoom from './HomeLastPhotosZoom';
import { IsUser } from '../context/IsUser';
import { useNavigate } from 'react-router-dom';


export default function HomeLastPhotos({ photoInfo }) {
    const date = new Date(photoInfo?.createdAt)
    const { isUser, setIsUser } = React.useContext(IsUser)
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const navigate = useNavigate()

    const handleClick = () => {
        if (isUser) {
            console.log('like');
        } else {
            navigate('/login')
        }
    }
    return (
        <Grid item xs={12} sm={6} md={4} xl={3}>
            <Card sx={{ maxWidth: 345, height: '450px', textTransform: 'capitalize' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {photoInfo?.fName[0]}
                        </Avatar>
                    }
                    title={photoInfo?.fName + ' ' + photoInfo?.lName}
                    subheader={formattedDate}
                />

                <HomeLastPhotosZoom url={photoInfo?.url} title={photoInfo?.title} />

                <CardContent>
                    <Typography variant="h6" color="text.secondary">
                        {photoInfo?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {photoInfo?.body}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={handleClick}>
                        <FavoriteIcon color='action' />
                    </IconButton>
                    <Typography component={'h3'} margin={'0 1px'}>55</Typography>
                </CardActions>
            </Card>
        </Grid>
    );
}
