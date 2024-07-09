import { Grid, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import * as React from 'react';
import PhotoEachEle from './PhotoEachEle';


function UserPhoto() {
    return (
        <Grid container bgcolor={green['400']} width={{ xs: '95%', md: '70%' }} height={{ xs: '50dvh', md: '60dvh' }} overflow={'auto'} margin={'10px auto'} justifyContent={'start'} alignItems={'start'} rowSpacing={'20px'} columnSpacing={'10px'} padding={1} borderRadius={'5px'}>
            <Grid item xs={12}>
                <Typography variant='h6' component={'h2'} margin={'auto'} textAlign={'center'} border={'1px solid white'} color={'white'} borderRadius={'5px'} width={{ md: '30%' }} padding={1}>Edit Photos</Typography>
            </Grid>
            <PhotoEachEle />
            <PhotoEachEle />
            <PhotoEachEle />
            <PhotoEachEle />
            <PhotoEachEle />
            <PhotoEachEle />
        </Grid>
    )
}

export default UserPhoto