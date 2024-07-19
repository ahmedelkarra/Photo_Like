import { Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

const NotFoundPage = () => {
    return (
        <Typography component={'div'} display={'flex'} flexDirection={'column'} fontSize={'25px'} color={'white'} justifyContent={'center'} alignItems={'center'} bgcolor={red['400']} width={{ xs: '95%', md: '60%' }} height={{ xs: '60dvh', md: '40dvh' }} margin={'auto'} borderRadius={'5px'}>
            <h3>404 page not found</h3>
            <p>We are sorry but the page you are looking for does not exist.</p>
        </Typography>
    )
}

export default NotFoundPage