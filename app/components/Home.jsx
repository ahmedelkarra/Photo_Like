import { Grid, Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import React from 'react'
import HomeLastPhotos from './HomeLastPhotos'

function Home() {
    return (
        <Grid container overflow={'auto'} bgcolor={green['400']} width={{ xs: '95%', md: '75%' }} maxHeight={{ xs: '60dvh', md: '70dvh' }} margin={'auto'} spacing={2} padding={1} borderRadius={'5px'} >
            <Grid item xs={12}>
                <Typography variant='h6' component={'h2'} margin={'auto'} textAlign={'center'} border={'1px solid white'} color={'white'} borderRadius={'5px'} width={{ md: '30%' }} padding={1}>Last Photos</Typography>
            </Grid>
            <HomeLastPhotos />
            <HomeLastPhotos />
            <HomeLastPhotos />
            <HomeLastPhotos />
            <HomeLastPhotos />
            <HomeLastPhotos />
            <HomeLastPhotos />
        </Grid>
    )
}

export default Home