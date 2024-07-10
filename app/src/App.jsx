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
import { IsUser } from '../context/IsUser';
import { IsChange } from '../context/IsChange';
import { UserInfo } from '../context/UserInfo';
import { useEffect, useState } from 'react';
import AlreadyUser from '../components/AlreadyUser';
import NotFoundPage from '../components/NotFoundPage';
import { axiosControl } from '../utils/axiosControl';
import { Cookies } from 'react-cookie';

function App() {
  const [isUser, setIsUser] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const [userInfo, setUserInfo] = useState({ _id: '', fName: '', lName: '', email: '' })
  const cookie = new Cookies()

  const handleUserInfo = () => {
    axiosControl.get('/me', { Cookie: { token: cookie.get('token') } })
      .then((e) => {
        if (e?.data?.message) {
          setUserInfo(e?.data?.message)
          setIsUser(true)
        }
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
      })
  }

  useEffect(() => {
    handleUserInfo()
  }, [isChange, isUser])
  return (
    <BrowserRouter>
      <Typography component={'div'} sx={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100dvh', justifyContent: 'space-between' }}>
        <IsUser.Provider value={{ isUser, setIsUser }}>
          <IsChange.Provider value={{ isChange, setIsChange }}>
            <UserInfo.Provider value={{ userInfo, setUserInfo }}>
              <Header />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={isUser ? <AlreadyUser /> : <Login />} />
                <Route path='/register' element={isUser ? <AlreadyUser /> : <Register />} />
                {isUser && <Route path='/me' element={<UserMe />} >
                  <Route path='edit' element={<UserEdit />} />
                  <Route path='photo' element={<UserPhoto />} />
                </Route>}
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
              <Footer />
            </UserInfo.Provider>
          </IsChange.Provider>
        </IsUser.Provider>
      </Typography>
    </BrowserRouter>
  )
}

export default App
