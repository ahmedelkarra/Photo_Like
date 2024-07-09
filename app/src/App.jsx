import { Typography } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../components/Login';
import Register from '../components/Register';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Home from '../components/Home';
import Me from '../components/Me';

function App() {
  return (
    <Typography component={'div'} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' ,justifyContent:'space-between'}}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/me' element={<Me />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Typography>
  )
}

export default App
