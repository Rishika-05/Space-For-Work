import React, { useState, useEffect } from 'react'
import './components/login.css'
import SignIn from './components/SignIn/SignIn.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import Home from './components/Home/Home.js'
import Navbar from './components/Navbar/Navbar.js'
// import Profile from './components/Profile/Profile.jsx'
import QuestionForm from './components/QuestionForm/QuestionForm.jsx'
import PuzzleForm from './components/PuzzleForm/PuzzleForm.jsx'
import Profile from './components/Profile/Profile.jsx'
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

function App() {

  const [user, setLoginUser] = useState({});
  const [interview, setInterview] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('adminMain')) {
      let u = JSON.parse(localStorage.getItem('adminMain'));
      setLoginUser(u);
    }
  }, []);

  return (
    <>
      <Router>
        {
          (user && user._id) && interview ? <Navbar user={user} setLoginUser={setLoginUser} /> : <></>
        }
        <Routes>
          <Route exact path="/login" element={<SignIn setLoginUser={setLoginUser} />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/" element={
            user && user._id ? <Home user={user} setInterview={setInterview} setLoginUser={setLoginUser} /> : <SignIn setLoginUser={setLoginUser} />
          } />
          <Route path="/profile/:id" element={<Profile user={user} setLoginUser={setLoginUser} />} />
          <Route path="/questionUpload" element={<QuestionForm user={user} />} />
          <Route path="/puzzleUpload" element={<PuzzleForm user={user} />} />
          {/* <Route exact path='/unauthorized' element={<Unauthorized />} />
          <Route path='*' element={<Error404 setInterview={setInterview} />} /> */}
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;