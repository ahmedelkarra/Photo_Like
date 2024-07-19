import { Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import React from 'react'

function AlreadyUser() {
    return (
        <Typography display={'flex'} fontSize={'25px'} color={'white'} justifyContent={'center'} alignItems={'center'} bgcolor={green['400']} width={{ xs: '95%', md: '60%' }} height={{ xs: '60dvh', md: '40dvh' }} margin={'auto'} borderRadius={'5px'}>
            You did already login
        </Typography>
    )
}

export default AlreadyUser