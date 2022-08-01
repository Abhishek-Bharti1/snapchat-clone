import { Avatar } from '@mui/material'
import React from 'react'
import "./Chat.css"
import StopRoundedIcon from "@mui/icons-material/StopRounded"
import ReactTimeago from 'react-timeago'
import { selectImage } from './features/appSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { db } from './firebase'
const Chat = ({id,profilePic,username,timestamp,
    imageUrl,read}) => {
        const dispatch = useDispatch();
        const history = useNavigate();
        const open = ()=>{
            if(!read){
                dispatch(selectImage(imageUrl));
                db.collection('posts').doc(id).set({
                  read:true,  
                },{merge:true}
                )
history("/chats/view");
            }
        };
  return (
    <div onClick={open} className='chat'>
        <Avatar className='chat__avatar' src={profilePic}/>
        <div className='chat__info'>
            <h4>{username}</h4>
            <p>{!read && "Tap to view -"}{""} <ReactTimeago date={new Date(
                timestamp?.toDate()).toUTCString()}/></p>
        </div>
        {!read && <StopRoundedIcon className='chat__readIcon'/>}
    </div>
  )
}

export default Chat