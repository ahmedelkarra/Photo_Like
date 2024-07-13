import { Grid, Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import React, { useContext } from 'react'
import HomeLastPhotos from './HomeLastPhotos'
import HomeHeroSection from './HomeHeroSection'
import { PhotoInfo } from '../context/PhotoInfo'

function Home() {
    const { photoInfo, setPhotoInfo } = useContext(PhotoInfo)
    return (
        <Typography component={'div'} display={'flex'} flexDirection={'column'} minHeight={{ xs: '100dvh', md: '100dvh' }}>
            <HomeHeroSection />
            <Grid container overflow={'auto'} bgcolor={green['400']} width={{ xs: '95%', md: '75%' }} maxHeight={{ xs: '70dvh', md: '80dvh' }} margin={'20px auto'} spacing={2} padding={1} borderRadius={'5px'} >
                <Grid item xs={12}>
                    <Typography variant='h6' component={'h2'} margin={'auto'} textAlign={'center'} border={'1px solid white'} color={'white'} borderRadius={'5px'} width={{ md: '30%' }} padding={1}>Photos</Typography>
                </Grid>
                {photoInfo?.map((ele) => {
                    return (
                        <HomeLastPhotos key={ele?._id} photoInfo={ele} />
                    )
                })}
            </Grid>
        </Typography>
    )
}

export default Home