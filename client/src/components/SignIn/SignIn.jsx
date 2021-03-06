import React, { useState, useLayoutEffect } from 'react'
import '../login.css'
import logo from '../../assets/images/space1.gif'
import logoText from '../../assets/images/Space (4).png'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


export default function SignIn(props) {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [key, setKey] = useState("");
    useLayoutEffect(() => {

        if (localStorage.getItem('admin')) {
            let token = localStorage.getItem('admin');
            const passer = { token: token }
            axios.post("https://space-for-work-backend.herokuapp.com/check", passer)
                .then(res => {
                    if (res.data.message === 200) {
                        console.log(res.data.user);
                        props.setLoginUser(res.data.user);
                    }
                })
        }
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const keyChange = e => {
        setKey(e.target.value)
    }

    const signin = () => {
        const { email, password } = user
        if (email && password) {

            console.log("aaa ", process.env.REACT_APP_ADMIN_KEY);
            if (key === process.env.REACT_APP_ADMIN_KEY) {

                axios.post("https://space-for-work-backend.herokuapp.com/login", user)
                    .then(res => {
                        toast(res.data.message, {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })

                        props.setLoginUser(res.data.user)
                        if (res.data.user) {
                            localStorage.setItem('adminMain', JSON.stringify(res.data.user));
                            localStorage.setItem('admin', res.data.token);
                            navigate('/')
                        }
                        else
                            navigate('/login')
                    });
            }
            else {
                toast('incorrect key', { position: "top-center", autoClose: 2000 })
            }
        }
        else {
            toast('invalid input', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setUser({
                email: "",
                password: ""
            })
        }
    }

    return (
        <div>
            <div className="login-parent">
                <div className="container upperBox">
                    <div className="container left">
                        <img src={logo} className="gif_left phone" alt="logo"></img>
                        <img src={logoText} className="gif_left pull" alt="main_logo"></img>
                        <p className="text mt-5 mb-4">Building Space to achieve DREAMS</p>
                    </div>
                    <div className="container right">
                        <div className="container box">
                            <div className="form-group">
                                <input name="key" type="text" value={key} className='form-control' placeholder="Admin Key"
                                    onChange={keyChange}
                                />
                            </div>
                            <div className="form-group">
                                <input name="email" type="email" value={user.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Work Email"
                                    onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" value={user.password} className="form-control" id="show_hide_password" placeholder="Password"
                                    onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={signin}>Log In</button>
                            <div style={{ textAlign: "center" }}>or</div>
                            <Link className="btn btn-primary newAcc" to="/SignUp">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}