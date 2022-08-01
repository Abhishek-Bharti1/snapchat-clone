import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import "./Preview.css";
import CloseIcon from "@mui/icons-material/Close"
import TextFieldsIcon from "@mui/icons-material/TextFields"
import CreateIcon from "@mui/icons-material/Create"
import NoteIcon from "@mui/icons-material/Note"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import CropIcon from "@mui/icons-material/Crop"
import TimerIcon from "@mui/icons-material/Timer"
import SendIcon from "@mui/icons-material/Send";
import {v4 as uuid} from "uuid";
import { db, storage } from './firebase';
import firebase from "firebase";
import { selectUser } from './features/appSlice';


const Preview = () => {
const cameraImage = useSelector(selectCameraImage);
const history  = useNavigate();
const dispatch = useDispatch();
const user = useSelector(selectUser)
useEffect(()=>{
if(!cameraImage){
history("/");
}
},[history,cameraImage]);

const closePreview=()=>{
dispatch(resetCameraImage());
history("/");
}

const sendPost=()=>{
const id = uuid(); //uuid for uploading unique=====>
//uploading to firebase=====>
const uploadTask = storage.ref(`posts/${id}`)
.putString(cameraImage,'data_url');

uploadTask.on('state_changed',
null,
(error)=>{
    //Error function=====>
    console.log(error);
},
()=>{
    //Complete function======>
    storage.ref('posts').child(id).getDownloadURL()
    .then((url)=>{
        db.collection('posts').add({
            imageUrl:url,
            username:'Abhishek',
            read:false,
            profilePic: user.profilePic,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        
        });
        history("/chats"); //navigate to chats after completing function=====>
    });
}
);

}

  return (
    <div className='preview'>
    <CloseIcon onClick={closePreview} className='preview__close'/>
<div className='preview__toolbarRight'>
    <TextFieldsIcon/>
    <CreateIcon/>
    <NoteIcon/>
    <MusicNoteIcon/>
    <AttachFileIcon/>
    <CropIcon/>
    <TimerIcon/>
</div>

        <img src={cameraImage} alt=''/>
        <div onClick={sendPost} className='preview__footer'>
            <h2>Send Now</h2>
            <SendIcon fontSize='small' className='preview__sendIcon'/>
        </div>
    </div>
  )
}

export default Preview