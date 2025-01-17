import { Typography } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login';
import Register from '../pages/Register';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Home from '../pages/Home';
import UserEdit from '../pages/UserEdit';
import UserPhoto from '../pages/UserPhoto';
import UserMe from '../pages/UserMe';
import { IsUser } from '../context/IsUser';
import { IsChange } from '../context/IsChange';
import { UserInfo } from '../context/UserInfo';
import { useEffect, useState } from 'react';
import AlreadyUser from '../pages/AlreadyUser';
import NotFoundPage from '../pages/NotFoundPage';
import { axiosControl } from '../utils/axiosControl';
import { Cookies } from 'react-cookie';
import { PhotoInfo } from '../context/PhotoInfo';
import { axiosUpload } from '../utils/axiosUpload';
import { PhotoInfoAll } from '../context/PhotoInfoAll';
import { LikeInfo } from '../context/LikeInfo';

function App() {
  const [isUser, setIsUser] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const [userInfo, setUserInfo] = useState({ _id: '', fName: '', lName: '', email: '' })
  const [photoInfo, setPhotoInfo] = useState([])
  const [photoInfoAll, setPhotoInfoAll] = useState([])
  const [likeInfo, setLikeInfo] = useState([])
  const cookie = new Cookies()
  const token = cookie.get('token')

  const handleUserInfo = async () => {
    if (!token) {
      setIsUser(false);
      return;
    }
    try {
      const { data } = await axiosControl.get('/me', { headers: { Authorization: `${token}` } });
      setUserInfo(data.message);
      setIsUser(true);
    } catch (error) {
      setIsUser(false);
      console.log(error?.response?.data?.message);
    }
  };


  const handlePhotoInfo = async () => {
    try {
      const data = await axiosUpload.get('/', { headers: { Authorization: `${token}` } })
      setPhotoInfo(data.data.message)
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  const handlePhotoInfoAll = async () => {
    try {
      const data = await axiosUpload.get('/all')
      setPhotoInfoAll(data.data.message)
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  const handleLikeInfo = async () => {
    try {
      const data = await axiosUpload.get('/like')
      setLikeInfo(data.data.message)
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    if (token) {
      handleUserInfo();
      handlePhotoInfo();
    } else {
      setIsUser(false);
    }
    handleLikeInfo()
    handlePhotoInfoAll();
    setIsChange(false);
  }, [isChange, isUser]);

  return (
    <BrowserRouter>
      <Typography component={'div'} sx={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100dvh', justifyContent: 'space-between' }}>
        <IsUser.Provider value={{ isUser, setIsUser }}>
          <IsChange.Provider value={{ isChange, setIsChange }}>
            <UserInfo.Provider value={{ userInfo, setUserInfo }}>
              <PhotoInfo.Provider value={{ photoInfo, setPhotoInfo }}>
                <PhotoInfoAll.Provider value={{ photoInfoAll, setPhotoInfoAll }}>
                  <LikeInfo.Provider value={{ likeInfo, setLikeInfo }}>
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
                  </LikeInfo.Provider>
                </PhotoInfoAll.Provider>
              </PhotoInfo.Provider>
            </UserInfo.Provider>
          </IsChange.Provider>
        </IsUser.Provider>
      </Typography>
    </BrowserRouter>
  )
}

export default App