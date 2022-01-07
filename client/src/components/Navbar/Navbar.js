import React from 'react'
import Logo from '../../assets/images/navLogo (1).svg'
import UserPic from '../../assets/images/user.png'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar(props) {

    const navigate = useNavigate();
    let loc = useLocation();

    const userProfile = () => {
        navigate(`/profile/${props.user._id}`)
    }
    
    const logOut = () => {
        props.setLoginUser(null);
        localStorage.removeItem('admin');
        localStorage.removeItem('adminMain');
        toast("Logged out successfully!", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg sticky-top navbar-light nav-topper" style={{ "backgroundColor": "white",  "boxShadow": "0px 2px 10px #EAEAEA" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand ms-3" to="/" style={{ "marginLeft": "10px" }}><img src={Logo} className="mt-1" alt="Space Logo" height='48px' /> </Link>
                    <button className="navbar-toggler mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-4 mb-lg-0 me-4 " style={{ "fontSize": "18px" }}>
                            <li className="nav-item me-4">
                                <Link className={`nav-link ${loc.pathname === '/problemset' ? "active" : ""}`} aria-current="page" to="/questionUpload">Problem Set</Link>
                            </li>
                            <li className="nav-item  me-4">
                                <Link className={`nav-link ${loc.pathname === '/puzzle' ? "active" : ""}`} to="/puzzleUpload">Puzzles</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={UserPic} alt="" style={{ "height": "25px", "marginRight": "10px" }} />{props.user.name}
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ "fontSize": "18px" }}>
                                    <li><div className="dropdown-item" onClick={userProfile}>Profile</div></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" onClick={logOut} to="/login">Logout</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <ToastContainer />
        </>
    )
}


