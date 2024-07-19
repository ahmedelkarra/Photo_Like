import { Grid, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import * as React from 'react';
import PhotoEachEle from '../components/PhotoEachEle';
import { PhotoInfo } from '../context/PhotoInfo';


function UserPhoto() {
    const { photoInfo, setPhotoInfo } = React.useContext(PhotoInfo)
    return (
        <Grid container bgcolor={green['400']} width={{ xs: '95%', md: '70%' }} height={{ xs: '50dvh', md: '60dvh' }} overflow={'auto'} margin={'10px auto'} justifyContent={'start'} alignItems={'start'} rowSpacing={'20px'} columnSpacing={'10px'} padding={1} borderRadius={'5px'}>
            <Grid item xs={12}>
                <Typography variant='h6' component={'h2'} margin={'auto'} textAlign={'center'} border={'1px solid white'} color={'white'} borderRadius={'5px'} width={{ md: '30%' }} padding={1}>Edit Photos</Typography>
            </Grid>

            {photoInfo.length != 0 ?
                <Grid xs={12} container rowSpacing={'20px'} columnSpacing={'10px'} margin={'10px 0'}>
                    {photoInfo?.map((ele) => {
                        return (
                            <PhotoEachEle key={ele?._id} photoInfo={ele} />
                        )
                    })}
                </Grid>
                :
                <Grid item xs={12}>
                    <Typography variant='h6' component={'h2'} margin={'auto'} textAlign={'center'} border={'1px solid white'} color={'white'} borderRadius={'5px'} width={{ md: '70%' }} padding={1}>You don not have photos to show</Typography>
                </Grid>
            }
        </Grid>
    )
}

export default UserPhoto