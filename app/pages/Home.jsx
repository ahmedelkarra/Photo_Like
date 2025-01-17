import { Grid, Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import React, { useContext } from 'react'
import HomeLastPhotos from '../components/HomeLastPhotos'
import HomeHeroSection from '../components/HomeHeroSection'
import { PhotoInfoAll } from '../context/PhotoInfoAll'

function Home() {
    const { photoInfoAll, setPhotoInfoAll } = useContext(PhotoInfoAll)
    return (
        <Typography component={'div'} display={'flex'} flexDirection={'column'} minHeight={{ xs: '100dvh', md: '100dvh' }}>
            <HomeHeroSection />
            <Grid container overflow={'auto'} bgcolor={green['400']} width={{ xs: '95%', md: '75%' }} maxHeight={{ xs: '70dvh', md: '80dvh' }} margin={'20px auto'} spacing={2} padding={1} borderRadius={'5px'} >
                <Grid item xs={12}>
                    <Typography variant='h6' component={'h2'} margin={'auto'} textAlign={'center'} border={'1px solid white'} color={'white'} borderRadius={'5px'} width={{ md: '30%' }} padding={1}>Photos</Typography>
                </Grid>
                {photoInfoAll.length != 0 ?
                    <>
                        {photoInfoAll?.map((ele) => {
                            return (
                                <HomeLastPhotos key={ele?._id} photoInfo={ele} />
                            )
                        })}
                    </>
                    :
                    <Grid item xs={12} height={'40vh'}>
                        <Typography variant='h6' component={'h2'} margin={'auto'} textAlign={'center'} border={'1px solid white'} color={'white'} borderRadius={'5px'} width={{ md: '70%' }} padding={1}>There are no photos to show</Typography>
                    </Grid>
                }
            </Grid>
        </Typography>
    )
}

export default Home