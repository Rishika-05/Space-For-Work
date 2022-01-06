import React from 'react'
import { useLayoutEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';



import {
    Button, Modal,
    ModalHeader, ModalBody
} from "reactstrap"
import './profile.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile(props) {
    const [userProfile, setuserProfile] = useState();
    const [avatar, setAvatar] = useState();
    const [modal, setModal] = useState(false);
    
    

    const { id } = useParams();

    const toggle = () => {
        setModal(!modal);
    }
   
    useLayoutEffect(() => {

        getUserProfile();
        document.title = `${props.user.name} | Space`;
        // eslint-disable-next-line
    }, [id, props.user]);


   
    const getUserProfile = async () => {

        let res = await fetch(`https://space-for-work-backend.herokuapp.com/profile/${id}`, {
            method: "GET", headers: {
                'Content-Type': 'application/json'
            },
        });

        let userData = await res.json();
        setuserProfile(userData.user);
        
        
        const fullName = userData.user.name.split(' ');
        const nameString = fullName[0] + '+' + fullName[fullName.length - 1]
        let av = await fetch(`https://ui-avatars.com/api/?name=${nameString}&background=171C3D&color=FFFFFF`)
        setAvatar(av);
        
        if(userData.user._id === props.user._id){
            localStorage.setItem('userMain',JSON.stringify(userData.user));
            
        }
    }
    const handleSubmit = (event) => {

        event.preventDefault()
        let data = { name: event.target.name.value, country: event.target.country.value, loggedIn: props.user._id }

        fetch(`https://space-for-work-backend.herokuapp.com/update/summary/${id}`, {
            method: "POST", body: JSON.stringify(data), headers: {
                'Content-Type': 'application/json'
            },
        });
        
        
        
        getUserProfile();
        window.location.reload(false);

        toast.success('Details Updated Successfully', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    

   

    if (props.user._id === undefined) {
        return (
            <></>
        )
    }
    if (userProfile) {
        return (
            <div className="container-fluid" style={{ "backgroundColor": "#F5F5F5",height:"100vh" }}>
                <div id="outer-div" className="container">

                    <div id="left-profile-data">
                        <div className="left-card">
                            <div id="profile-summary-card">
                                <span id="initials-avatar" className="d-flex justify-content-between">
                                    <img src={(avatar) ? avatar.url : ""} alt="Avatar" />
                                    {(props.user._id !== userProfile._id) ? null : <button onClick={toggle} type="button" className="summary-edit-button">
                                        <i class="fas fa-edit"></i>
                                    </button>}
                                </span>
                                <h1 id="profile-heading">{userProfile.name}</h1>
                                <p id="profile-user-name">{userProfile.email}</p>
                            </div>
                            <p id="profile-user-name">{(userProfile.country) ? userProfile.country : "-"}</p>

                        </div>
                       
                        
                    </div>
                    <div id="right-profile-data">
                        <div className="right-card">
                            <h6 className="px-3 pt-2"><i class="fas fa-clipboard-check"></i> &nbsp; Questions Created</h6>
                            <hr></hr>
                            <div id = "submissions-box">
                                {
                                    userProfile.questionsCreated.slice(0).reverse().map((element) => {

                                        return <><div id="profile-submissions" className="d-flex">
                                            <Link id="ques-link" to = {"/"} ><h6>{element.title}</h6></Link>
                                            
                                        </div>
                                            {/* <hr></hr>   */}
                                        </>
                                        // console.log(element);
                                    })
                                }
                            </div>
                        </div>
                        <div className="right-card">
                            <h6 className="px-3 pt-2"><i class="fas fa-clipboard-check"></i> &nbsp; Puzzles Created</h6>
                            <hr></hr>
                            <div id = "submissions-box">
                                {
                                    userProfile.puzzlesCreated.slice(0).reverse().map((element) => {

                                        return <><div id="profile-submissions" className="d-flex">
                                            <Link id="ques-link" to = {"/"} ><h6>{element.title}</h6></Link>
                                            
                                        </div>
                                            {/* <hr></hr>   */}
                                        </>
                                        // console.log(element);
                                    })
                                }
                            </div>
                        </div>
                        
                    </div>
                </div>
                {/* modal for profile summary */}
                <Modal isOpen={modal} toggle={toggle} className="modal-40w" centered >
                    <ModalHeader
                        toggle={toggle} className="modal-cen" centered >Edit Intro</ModalHeader>
                    <ModalBody className='modal-col d-flex justify-content-center' centered>
                        <form id="schedule-form" onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row">
                                    <fieldset className="col-xs-12 col-sm-6 col-md-6">

                                        <div className="input-area my-4" style={{ "textAlign": "center" }}>
                                            <input className='modal-in' type="text" autoComplete="off" placeholder="Name" name="name" required />
                                            <label className="label-name"></label>
                                        </div>

                                        <div className="input-area my-4" style={{ "textAlign": "center" }}>
                                            <input className='modal-in' type="country" autoComplete="off" placeholder="Country" name="country" />
                                            <label className="label-name"></label>
                                        </div>
                                    </fieldset>

                                </div>

                            </div>
                            <div style={{ "margin": "auto" }}>
                                <Button type="submit" color="dark" onClick={toggle} id="schedule-submit-btn" >Submit</Button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
                
                <ToastContainer />
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}
