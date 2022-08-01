import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import WebcamCapture from "./WebcamCapture";
import Preview from "./Preview";
import Chats from "./Chats.js";
import ChatView from "./ChatView.js";
import { login, logout, selectUser } from "./features/appSlice";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Login.js";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
          <>
          <img
              className="app__logo"
              src="https://logos-world.net/wp-content/uploads/2020/04/Snapchat-Logo-700x394.png"
              alt=""
            />
        <div className="app__body">
         
          <div className="app__bodyBackground">
            <Routes>
              <Route path="/preview" element={<Preview />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/chats/view" element={<ChatView />} />

              <Route path="/" element={<WebcamCapture />} />
            </Routes>
          </div>
        </div>
          </>
      )}
    </div>
  );
}

export default App;
