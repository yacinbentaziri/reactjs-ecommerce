import './Auth.css';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import axios from 'axios';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/Header';


function Auth() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const [username, setUsername] = useState("")
  const [confirmPwd, setconfirmPwd] = useState("")

  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    const url = "http://localhost:8000/api/auth/signin"
    setLoading(true)
    try {
      const resp = await axios.post(url, { email: email, pwd: pwd }, {
        withCredentials: true,
      })
      setLoading(false)
      let data = resp.data
      //Reflect.deleteProperty(data.data, 'pwd');
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/")
    } catch (err) {
      setLoading(false)
      toast.error(err.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }
  const handleSignUp = async (e) => {
    e.preventDefault()
    if (!email.includes("@")) return
    if (pwd != confirmPwd) return
    const url = "http://localhost:8000/api/auth/signup"
    setLoading(true)
    try {
      const resp = await axios.post(url, { username, email, pwd })
      setLoading(false)
      toast.success(resp.data.msg, {
        position: toast.POSITION.TOP_RIGHT
      });
      setIsSignUp(false)
    } catch (err) {
      setLoading(false)
      toast.error(err.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      navigate("/")
    }
  }, [])

  const [isSignUp, setIsSignUp] = useState(false);
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };
  return (
    <div>
      {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <Header />

      <ToastContainer closeButton={false} />

      

      <div className={`container ${isSignUp ? 'change' : ''}`}>
        <div className="forms-container">
          {isSignUp ? (
            <div className="form-control signup-form">
              <form action="#">
                <h2>Signup</h2>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" required />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
                <input value={pwd} onChange={(e) => setPwd(e.target.value)} type="password" placeholder="Password" required />
                <input value={confirmPwd} onChange={(e) => setconfirmPwd(e.target.value)} type="password" placeholder="Confirm password" required />
                <button onClick={(e) => handleSignUp(e)}>Signup</button>
              </form>
            </div>
          ) : (
            <div className="form-control signin-form">
              <form action="#">
                <h2>Signin</h2>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" required />
                <input value={pwd} onChange={(e) => setPwd(e.target.value)} type="password" placeholder="Password" required />
                <button onClick={(e) => handleLogin(e)}>Signin</button>
              </form>
            </div>
          )}
        </div>
        <div className="intros-container">
          <div className={`intro-control ${isSignUp ? 'signup-intro' : 'signin-intro'}`}>
            <div className="intro-control__inner">
              <h2>{isSignUp ? 'Come join us!' : 'Welcome back!'}</h2>
              <p>
                {isSignUp
                  ? "We are so excited to have you here. If you haven't already, create an account to get access to exclusive offers, rewards, and discounts."
                  : "Welcome back! We are so happy to have you here. It's great to see you again. We hope you had a safe and enjoyable time away."}
              </p>
              <button onClick={toggleForm}>
                {isSignUp ? 'Already have an account? Signin.' : 'No account yet? Signup.'}
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Auth;
