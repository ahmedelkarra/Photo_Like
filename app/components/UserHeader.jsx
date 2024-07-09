import { Button, Grid } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function UserHeader() {
    const navigate = useNavigate()
    return (
        <Grid container spacing={1}>

            <Grid item xs={4}>
                <Button variant='contained' fullWidth onClick={() => navigate('/me')}>User</Button>
            </Grid>

            <Grid item xs={4}>
                <Button variant='contained' fullWidth onClick={() => (navigate('/me/edit'))}>Edit</Button>
            </Grid>

            <Grid item xs={4}>
                <Button variant='contained' fullWidth onClick={() => navigate('/me/photo')}>Photos</Button>
            </Grid>

        </Grid>
    )
}

export default UserHeader