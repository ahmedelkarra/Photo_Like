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
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { axiosControl } from '../utils/axiosControl';
import { UserInfo } from '../context/UserInfo';
import { IsUser } from '../context/IsUser';

export default function InputAdornments() {
    const [valueInputs, setValueInputs] = React.useState({ email: '', pass: '' });
    const { userInfo, setUserInfo } = React.useContext(UserInfo);
    const { isUser, setIsUser } = React.useContext(IsUser);
    const [successMessage, setSuccessMessage] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const expires = new Date();
        expires.setDate(expires.getDate() + 1);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailStatus = emailRegex.test(valueInputs.email);
        if (emailStatus && valueInputs.pass) {
            try {
                const response = await axiosControl.post('/login', valueInputs);
                setErrorMessage('');
                setCookie('token', response?.data?.token, { path: '/', sameSite: 'none', secure: true, expires });
                setSuccessMessage(response?.data?.message);
                setUserInfo(response?.data?.data);
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/');
                    setIsUser(true);
                }, 3000);
            } catch (error) {
                setErrorMessage(error?.response?.data?.message || 'An error occurred');
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            }
        } else if (!emailStatus) {
            setErrorMessage('Please enter a valid email');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        } else {
            setErrorMessage('Please check your inputs');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    return (
        <Typography component={'form'} onSubmit={handleSubmit}>
            <Grid container bgcolor={green[400]} width={{ xs: '95%', md: '60%' }} height={{ xs: '60dvh', md: '40dvh' }} margin={'auto'} justifyContent={'center'} columnSpacing={1} padding={1} borderRadius={'5px'}>
                <Grid item xs={12}>
                    <Typography variant='h6' component={'h2'} margin={'auto'} textAlign={'center'} border={'1px solid white'} color={'white'} borderRadius={'5px'} width={{ md: '30%' }} padding={1}>Login Page</Typography>
                </Grid>
                <Grid item xs={12}>
                    {successMessage && <Alert severity="success" sx={{ width: { xs: '90%', md: '60%' }, margin: 'auto' }}>{successMessage}</Alert>}
                    {errorMessage && <Alert severity="error" sx={{ width: { xs: '90%', md: '60%' }, margin: 'auto' }}>{errorMessage}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="filled-basic" label="Email" variant="filled" type='email' required fullWidth inputProps={{ maxLength: 30 }} onChange={(e) => setValueInputs({ ...valueInputs, email: e.target.value })} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl sx={{ width: '100%' }} variant="filled" required>
                        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={valueInputs.pass}
                            onChange={(e) => setValueInputs({ ...valueInputs, pass: e.target.value })}
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
                <Grid item xs={12} textAlign={'center'}>
                    <Button variant='contained' color='primary' sx={{ width: { xs: '90%', md: '50%' } }} type='submit'>Submit</Button>
                </Grid>
            </Grid>
        </Typography>
    );
}
