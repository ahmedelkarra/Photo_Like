import { Typography } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../components/Login';
import Register from '../components/Register';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Home from '../components/Home';
import UserEdit from '../components/UserEdit';
import UserPhoto from '../components/UserPhoto';
import UserMe from '../components/UserMe';

function App() {
  return (
    <BrowserRouter>
      <Typography component={'div'} sx={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100dvh', justifyContent: 'space-between' }}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/me' element={<UserMe />} >
            <Route path='edit' element={<UserEdit />} />
            <Route path='photo' element={<UserPhoto />} />
          </Route>
        </Routes>
        <Footer />
      </Typography>
    </BrowserRouter>
  )
}

export default App
