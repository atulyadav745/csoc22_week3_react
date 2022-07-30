import { useEffect, useState, useContext, createContext } from 'react'
import { useCookies } from 'react-cookie'
import axios from '../utils/axios'
import { useRouter } from 'next/router'
import authRequired from '../middlewares/auth_required'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [profileName, setProfileName] = useState('')
  const [avatarImage, setAvatarImage] = useState('#')
  const [cookies, setCookies, removeCookies] = useCookies(['auth'])
  const token = cookies.token
  authRequired();

  const setToken = (newToken) => setCookies('token', newToken, { path: '/' })
  const deleteToken = () => removeCookies('token')
  const logout = () => {
    deleteToken()
    toast.success("Logged Out Successfully .....",{position: "bottom-right",autoClose: 2000})
    setTimeout(()=>router.reload(),2000)
  }

  useEffect(() => {
    if (token) {
      axios
        .get('auth/profile/', {
          headers: {
            Authorization: 'Token ' + token,
          },
        })
        .then((response) => {
          console.log(children);
          console.log(response.data.name);
          setAvatarImage(
            'https://ui-avatars.com/api/?name=' +
              response.data.name +
              '&background=fff&size=33&color=007bff'
          )
          setProfileName(response.data.name)
        })
        .catch((error) => {
          toast.error('Some error occurred')
        })
    }
  }, [setAvatarImage, setProfileName, token])

  return (
    
    <>
    <ToastContainer />
    <AuthContext.Provider value={{token,setToken,deleteToken,profileName,setProfileName,avatarImage,setAvatarImage,logout,}}>
      {children}
    </AuthContext.Provider>
    </>
  )
}

export const useAuth = () => useContext(AuthContext)
