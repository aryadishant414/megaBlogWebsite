import React from 'react'
import {useDispatch} from 'react-redux'
import authService from "../../appwrite/auth"
import {logout} from "../../store/authSlice"  

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())  // dispatch ne yaha logout krne ka action perform kiya hai mtlb ki state mai Updation hogya hai ki haa user logout hogya hai
        })
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn