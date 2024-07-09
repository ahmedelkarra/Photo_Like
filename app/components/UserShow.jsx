import * as React from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { green } from '@mui/material/colors';

function UserShow() {
    const [valueInputs, setValueInputs] = React.useState({ fName: '', lName: '', email: '' })
    return (
        <Typography component={'form'} onSubmit={(e) => handleSubmit(e)} margin={'10px 0'}>
            <Grid container bgcolor={green['400']} width={{ xs: '95%', md: '60%' }} minHeight={{ xs: '70dvh', md: '40dvh' }} margin={'auto'} justifyContent={'center'} spacing={'3px'} padding={1} borderRadius={'5px'}>
                <Grid item xs={12}>
                    <Typography variant='h6' component={'h2'} margin={'auto'} textAlign={'center'} border={'1px solid white'} color={'white'} borderRadius={'5px'} width={{ md: '30%' }} padding={1}>User Page</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="first-name" label="First Name" variant="filled" type='text' disabled fullWidth value={valueInputs.fName} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="last-name" label="Last Name" variant="filled" type='text' disabled fullWidth value={valueInputs.lName} />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="filled-basic" label="Email" variant="filled" type='email' disabled fullWidth value={valueInputs.email} />
                </Grid>
            </Grid>
        </Typography >
    )
}

export default UserShow