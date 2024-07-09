import { AppBar, Typography } from '@mui/material'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import UserHeader from './UserHeader'
import UserShow from './UserShow'

function UserMe() {
    const location = useLocation().pathname
    return (
        <Typography component={'div'} height={'70dvh'}>
            <AppBar position='static' color='success' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', width: { xs: '90%', md: '50%' }, margin: '0 auto', padding: '10px', borderRadius: '10px' }}>
                <UserHeader />
            </AppBar>
            {location == '/me' && <UserShow />}
            <Outlet />
        </Typography>
    )
}

export default UserMe