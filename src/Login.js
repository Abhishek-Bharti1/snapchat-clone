import React from 'react'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux/es/exports'
import "./Login.css"
import { auth , provider} from './firebase'
import { login } from './features/appSlice'
const Login = () => {
const dispatch=useDispatch();
    const signIn=()=>{
auth.signInWithPopup(provider)
.then(result=>{
    dispatch(login({
        username:result.user.displayName,
        profilePic:result.user.photoURL,
        id:result.user.uid
    }))
}).catch(error=>alert(error.message));
    }
  return (
<div className='login'>
<div className='login__container'>
<img src='https://logos-world.net/wp-content/uploads/2020/04/Snapchat-Logo-700x394.png' alt=''/>
<Button variant='outlined' onClick={signIn}>Sign in</Button>
</div>

    </div>
  )
}

export default Login