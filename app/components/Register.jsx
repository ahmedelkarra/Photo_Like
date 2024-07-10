import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Alert, Button, Grid, TextField, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { axiosControl } from '../utils/axiosControl';
import { IsChange } from '../context/IsChange';
import { Cookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const { isChange, setIsChange } = React.useContext(IsChange)
    const [valueInputs, setValueInputs] = React.useState({ fName: '', lName: '', email: '', pass: '', confirmPass: '' })
    const [successMessage, setSuccessMessage] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const [showconfirmPass, setShowconfirmPass] = React.useState(false);
    const cookie = new Cookies()
    const navigate = useNavigate()

    const handleClickShowconfirmPass = () => setShowconfirmPass((show) => !show);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        axiosControl.post('/register', valueInputs)
            .then((e) => {
                setErrorMessage('')
                cookie.set('token', e?.data?.token)
                setSuccessMessage(e?.data?.message)
                setIsChange(true)
                setTimeout(() => {
                    setSuccessMessage('')
                    navigate('/')
                }, 3000)
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.message)
                setTimeout(() => {
                    setErrorMessage('')
                }, 3000)
            })
    }
    return (
        <Typography component={'form'} onSubmit={(e) => handleSubmit(e)}>
            <Grid container bgcolor={green['400']} width={{ xs: '95%', md: '60%' }} minHeight={{ xs: '70dvh', md: '40dvh' }} margin={'auto'} justifyContent={'center'} spacing={'3px'} padding={1} borderRadius={'5px'}>
                <Grid item xs={12}>
                    <Typography variant='h6' component={'h2'} margin={'auto'} textAlign={'center'} border={'1px solid white'} color={'white'} borderRadius={'5px'} width={{ md: '30%' }} padding={1}>Register Page</Typography>
                </Grid>
                <Grid item xs={12}>
                    {successMessage && <Alert severity="success" sx={{ width: { xs: '90%', md: '60%' }, margin: 'auto' }}>{successMessage}</Alert>}
                    {errorMessage && <Alert severity="error" sx={{ width: { xs: '90%', md: '60%' }, margin: 'auto' }}>{errorMessage}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="first-name" label="First Name" variant="filled" type='text' required fullWidth onChange={(e) => { setValueInputs({ ...valueInputs, fName: e.target.value }) }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="last-name" label="Last Name" variant="filled" type='text' required fullWidth onChange={(e) => { setValueInputs({ ...valueInputs, lName: e.target.value }) }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="filled-basic" label="Email" variant="filled" type='email' required fullWidth onChange={(e) => { setValueInputs({ ...valueInputs, email: e.target.value }) }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl sx={{ width: '100%' }} variant="filled" required>
                        <InputLabel htmlFor="filled-adornment-password" required>Password</InputLabel>
                        <FilledInput
                            required
                            onChange={(e) => { setValueInputs({ ...valueInputs, pass: e.target.value }) }}
                            id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl sx={{ width: '100%' }} variant="filled" required>
                        <InputLabel htmlFor="filled-adornment-confirmPass" required>Password</InputLabel>
                        <FilledInput
                            required
                            onChange={(e) => { setValueInputs({ ...valueInputs, confirmPass: e.target.value }) }}
                            id="filled-adornment-confirmPass"
                            type={showconfirmPass ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowconfirmPass}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showconfirmPass ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} textAlign={'center'}>
                    <Button variant='contained' color='primary' sx={{ width: { xs: '90%', md: '50%' } }} type='submit'>Submit</Button>
                </Grid>
            </Grid >
        </Typography >
    );
}
