import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid, IconButton } from '@mui/material';
import HomeLastPhotosZoom from './HomeLastPhotosZoom';
import { UserInfo } from '../context/UserInfo';


export default function HomeLastPhotos({ photoInfo }) {
    const date = new Date(photoInfo?.createdAt)
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const { userInfo, setUserInfo } = React.useContext(UserInfo)
    return (
        <Grid item xs={12} sm={6} md={4} xl={3}>
            <Card sx={{ maxWidth: 345, height: '450px', textTransform: 'capitalize' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {userInfo?.fName[0]}
                        </Avatar>
                    }
                    title={userInfo?.fName + ' ' + userInfo?.lName}
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
                    <IconButton aria-label="add to favorites" onClick={() => console.log('LIKE')}>
                        <FavoriteIcon color='action' />
                    </IconButton>
                    <Typography component={'h3'} margin={'0 5px'}>55</Typography>
                </CardActions>
            </Card>
        </Grid>
    );
}
