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
import { IsChange } from '../context/IsChange';
import { UserInfo } from '../context/UserInfo';
import { LikeInfo } from '../context/LikeInfo';
import { axiosUpload } from '../utils/axiosUpload';


export default function HomeLastPhotos({ photoInfo }) {
    const date = new Date(photoInfo?.createdAt)
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const navigate = useNavigate()
    const { isUser, setIsUser } = React.useContext(IsUser)
    const { userInfo, setUserInfo } = React.useContext(UserInfo)
    const { likeInfo, setLikeInfo } = React.useContext(LikeInfo)
    const { isChange, setIsChange } = React.useContext(IsChange)

    const likedPhoto = likeInfo.filter((ele) => ele?.photoId == photoInfo?._id)
    const isClientLiked = likeInfo.filter((ele) => ele?.author == userInfo?._id && ele?.photoId == photoInfo?._id)

    const handleClick = () => {
        if (isUser) {
            axiosUpload.post(`like/${photoInfo?._id}`)
                .then((e) => {
                    console.log(e.data.message)
                    setIsChange(true)
                })
                .catch((err) => {
                    console.log(err);
                })
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
                    <Typography variant="h6" component={'h2'} color="text.secondary" sx={{ textWrap: 'balance', overflowWrap: 'break-word' }}>
                        {photoInfo?.title}
                    </Typography>
                    <Typography variant="body2" component={'p'} color="text.secondary" sx={{ textWrap: 'balance', overflowWrap: 'break-word' }}>
                        {photoInfo?.body}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={handleClick}>
                        {isClientLiked.length != 0 ?
                            <FavoriteIcon color='error' />
                            :
                            <FavoriteIcon color='action' />
                        }
                    </IconButton>
                    <Typography component={'h3'} margin={'0 1px'}>{likedPhoto?.length}</Typography>
                </CardActions>
            </Card>
        </Grid>
    );
}
