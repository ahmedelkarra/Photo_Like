import { AppBar, Container, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
    const date = new Date()
    return (
        <AppBar position='static' color='success' sx={{ height: '120px', padding: '5px', bottom: 0 }}>
            <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography variant='h6' component={'h2'}>Photo Like</Typography>
                <Typography component={'div'} display={'flex'} gap={1}>
                    <Typography component={'a'} href='https://github.com/ahmedelkarra?tab=repositories/' target='_blank' color={'white'} >
                        <GitHubIcon sx={{ fontSize: '30px' }} />
                    </Typography>
                    <Typography component={'a'} href='https://www.linkedin.com/in/ahmed-el-karra-ab4629249/' target='_blank' color={'white'} >
                        <LinkedInIcon sx={{ fontSize: '30px' }} />
                    </Typography>
                </Typography>
                <Typography variant='p' component={'p'} textTransform={'uppercase'} textAlign={'center'}>&copy; all rights reserved by Ahmed El Karra {date.getFullYear()}</Typography>
            </Container>
        </AppBar>
    )
}

export default Footer