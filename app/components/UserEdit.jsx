import * as React from 'react';
import { Alert, Button, Grid, TextField, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { UserInfo } from '../context/UserInfo';
import { axiosControl } from '../utils/axiosControl';
import { useNavigate } from 'react-router-dom';
import { IsChange } from '../context/IsChange';
import { Cookies } from 'react-cookie';
import { IsUser } from '../context/IsUser';


function UserEdit() {
    const [successMessage, setSuccessMessage] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')
    const [valueInputs, setValueInputs] = React.useState({ fName: '', lName: '', email: '', pass: '', newPass: '', confirmNewPass: '' })
    const { userInfo, setUserInfo } = React.useContext(UserInfo)
    const { isChange, setIsChange } = React.useContext(IsChange)
    const { isUser, setIsUser } = React.useContext(IsUser)
    const cookie = new Cookies();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await axiosControl.put('/me', valueInputs)
            setErrorMessage('')
            setSuccessMessage(data?.data?.message)
            setTimeout(() => {
                setSuccessMessage('')
                setIsChange(true)
                navigate('/me')
            }, 3000)
        } catch (error) {
            setErrorMessage(error?.response?.data?.message)
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        }
    }

    const handleDelete = async () => {
        try {
            const data = await axiosControl.delete('/me', { data: valueInputs })
            setErrorMessage('')
            setSuccessMessage(data?.data?.message)
            setTimeout(() => {
                setSuccessMessage('')
                setIsChange(true)
                setUserInfo({ _id: '', fName: '', lName: '', email: '' })
                setIsUser(false)
                cookie.remove('token')
                navigate('/')
            }, 3000)
        } catch (error) {
            setErrorMessage(error?.response?.data?.message)
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        }
    }


    React.useEffect(() => {
        setValueInputs({ ...valueInputs, fName: userInfo?.fName, lName: userInfo?.lName, email: userInfo?.email })
    }, [userInfo])
    return (
        <Typography component={'form'} onSubmit={(e) => handleSubmit(e)} margin={'10px 0'}>
            <Grid container bgcolor={green['400']} width={{ xs: '95%', md: '60%' }} minHeight={{ xs: '90dvh', md: '50dvh' }} margin={'auto'} justifyContent={'center'} spacing={'3px'} padding={1} borderRadius={'5px'}>
                <Grid item xs={12}>
                    <Typography variant='h6' component={'h2'} margin={'auto'} textAlign={'center'} border={'1px solid white'} color={'white'} borderRadius={'5px'} width={{ md: '30%' }} padding={1}>User Edit</Typography>
                </Grid>
                <Grid item xs={12}>
                    {successMessage && <Alert severity="success" sx={{ width: { xs: '90%', md: '60%' }, margin: 'auto' }}>{successMessage}</Alert>}
                    {errorMessage && <Alert severity="error" sx={{ width: { xs: '90%', md: '60%' }, margin: 'auto' }}>{errorMessage}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="first-name" label="First Name" variant="filled" type='text' required fullWidth value={valueInputs.fName} onChange={(e) => { setValueInputs({ ...valueInputs, fName: e.target.value }) }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="last-name" label="Last Name" variant="filled" type='text' required fullWidth value={valueInputs.lName} onChange={(e) => { setValueInputs({ ...valueInputs, lName: e.target.value }) }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="email" label="Email" variant="filled" type='email' required fullWidth value={valueInputs.email} onChange={(e) => { setValueInputs({ ...valueInputs, email: e.target.value }) }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="Your-Password" label="Your Password" variant="filled" type='password' required fullWidth onChange={(e) => { setValueInputs({ ...valueInputs, pass: e.target.value }) }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="New-Password" label="New Password" variant="filled" type='password' fullWidth onChange={(e) => { setValueInputs({ ...valueInputs, newPass: e.target.value }) }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="Confirm-New-Password" label="Confirm New Password" variant="filled" type='password' fullWidth onChange={(e) => { setValueInputs({ ...valueInputs, confirmNewPass: e.target.value }) }} />
                </Grid>
                <Grid item xs={12} md={6} textAlign={'center'}>
                    <Button variant='contained' color='primary' sx={{ width: { xs: '90%', md: '80%' } }} type='submit'>Update</Button>
                </Grid>
                <Grid item xs={12} md={6} textAlign={'center'}>
                    <Button variant='contained' color='error' sx={{ width: { xs: '90%', md: '80%' } }} type='button' onClick={handleDelete}>Delete</Button>
                </Grid>
            </Grid>
        </Typography >
    )
}

export default UserEdit