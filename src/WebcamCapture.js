import React, { useCallback, useRef} from 'react'
import Webcam from 'react-webcam';
import { useDispatch } from 'react-redux';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { setCameraImage } from './features/cameraSlice';
import { useNavigate } from 'react-router-dom';
import "./WebcamCapture.css"
const videoConstraints={
    width:250,
    height:400,
    facingMode:"user",
};



const WebcamCapture = () => {
    const webcamRef=useRef(null);
    const dispatch = useDispatch();
    const history = useNavigate();


const capture = useCallback(()=>{
const imageSrc=webcamRef.current.getScreenshot();
dispatch(setCameraImage(imageSrc));
history("/preview")
},[webcamRef,dispatch,history])

  return (
    <div className='webcamCapture'>
<Webcam 
   audio={false}
   height={videoConstraints.height}
    ref={webcamRef}
    screenshotFormat="image/jpeg"
    width={videoConstraints.width}
    videoConstraints={videoConstraints}
  mirrored={true}
/>
<RadioButtonUncheckedIcon  className='webcamCapture_button'
    onClick={capture}
    fontSize="large"
/>

    </div>
  )
}

export default WebcamCapture