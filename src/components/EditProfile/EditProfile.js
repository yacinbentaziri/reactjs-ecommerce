import React, { useRef, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';
import jwtInterceptor from '../../helpers/jwtInterceptor';
import { Box, LinearProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserImage } from '../../redux/features/userImage';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user')).data
        setState({
            ...state,
            "username": data.username,
            "email": data.email,
            "pwd": '',
            "confirmPwd": '',
            "phone": data.phone != undefined ? data.phone : '',
            "cin": data.cin != undefined ? data.cin : '',
            "address": data.address != undefined ? data.address : '',
            "image": data.image != undefined ? data.image : '',
            "newImage": ''
        })
    }, [])

    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false)
    const handleChange = (event) => {
        //console.log(event);
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        });
    };
    // FOR UPDATING THE IMAGE IN THE HEADER IMMEDIATELY WHEN CHANGING IMAGE IN EDIT PROFILE
    const dispatch = useDispatch()


    const handleSubmit = async (event) => {
        setLoading(true)
        try {
            event.preventDefault();
            let data = {
                "username": state.username,
                "email": state.email,
                "pwd": JSON.parse(localStorage.getItem('user')).data.pwd,
                "phone": state.phone,
                "cin": state.cin,
                "address": state.address,
                "image": state.image
            }
            if (state.address == '') {
                alert("check your address")
                return
            }
            if (state.phone == '') {
                alert("check your phone")
                return
            }
            if (state.cin == '') {
                alert("check your cin")
                return
            }
            if (state.confirmPwd != state.pwd) {
                alert("check your password")
                return
            } else if (state.confirmPwd == state.pwd && state.pwd == '') {

            } else {
                data.pwd = state.pwd
            }
            if (state.newImage != '') {
                data.image = state.newImage
                setState({
                    ...state,
                    "image": state.newImage
                })
            }

            const _id = JSON.parse(localStorage.getItem('user')).data._id
            const resp = await jwtInterceptor.put("https://nodejs-ecommerce-agdc.onrender.com/api/user/updateuser/" + _id, data, { withCredentials: true })
            if (resp.data.success) {
                setLoading(false)
                toast.success(resp.data.msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setState({
                    ...state,
                    "pwd": "",
                    "confirmPwd": ""
                })
                localStorage.setItem("user", JSON.stringify(resp.data))
            }
        } catch (err) {
            setLoading(false)
            toast.error(err.response.data.msg, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    const handleImageChange = async (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            const formData = new FormData()
            formData.append('image', selectedFile)
            const path = await handleSaveImageInServer(formData)
            setState({
                ...state,
                "newImage": path
            })
            dispatch(setUserImage(path))
        }
    }

    const handleSaveImageInServer = async (formData) => {
        const id = JSON.parse(localStorage.getItem('user')).data._id
        try {
            console.log(formData);
            const response = await jwtInterceptor.post(`https://nodejs-ecommerce-agdc.onrender.com/api/upload/${id}`, formData, { withCredentials: true })
            return response.data.data
        } catch (err) {

        }
    }

    const navigate = useNavigate()
    const logOut = () => {
        localStorage.setItem("user", null);
        navigate("/auth")
    }

    return (
        <div>
            {loading && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )}

            <Header />
            <ToastContainer closeButton={false} />

            <br />
            <br />
            <br />
            <br />


            <div class="container-xl px-4 mt-4">
                <div class="row">
                    <div class="col-xl-4">
                        <div class="card mb-4 mb-xl-0">
                            <div class="card-header">Profile Picture</div>
                            <div class="card-body text-center">
                                {state.image != '' ? (
                                    <img style={{
                                        "width": "100px",
                                        "height": "100px",
                                        "border-radius": "50%",
                                        "overflow": "hidden",
                                    }} src={state.newImage == '' ? `https://nodejs-ecommerce-agdc.onrender.com/images/${state.image}` : `https://nodejs-ecommerce-agdc.onrender.com/images/${state.newImage}`} alt="User Image" />
                                ) : (
                                    <div className="fas fa-user-circle userIcon" style={{ "fontSize": '6em' }}></div>
                                )}
                                <div class="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                <label class="btn btn-primary" for="fileInput">Upload new image</label>
                                <input onChange={(e) => handleImageChange(e)} type="file" id="fileInput" style={{ "display": "none" }} />
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-8">
                        <div class="card mb-4">
                            <div class="card-header">Account Details</div>
                            <div class="card-body">
                                <form>
                                    <div class="mb-3">
                                        <label class="small mb-1" for="inputUsername">Username (how your name will appear to other users on the site)</label>
                                        <input name='username' onChange={(e) => handleChange(e)} class="form-control" id="inputUsername" type="text" placeholder="Enter your username" value={state.username} />
                                    </div>
                                    <div class="mb-3">
                                        <label class="small mb-1" for="inputEmailAddress">Email address</label>
                                        <input class="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={state.email} disabled />
                                    </div>
                                    <div class="mb-3">
                                        <label class="small mb-1" for="inputAddress">Address</label>
                                        <input onChange={(e) => handleChange(e)} name='address' class="form-control" id="inputAddress" type="text" placeholder="Enter you address" value={state.address} />
                                    </div>
                                    <div class="row gx-3 mb-3">
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputPhone">Phone number</label>
                                            <input name='phone' onChange={(e) => handleChange(e)} class="form-control" id="inputPhone" type="number" placeholder="Enter your phone number" value={state.phone} />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputCin">CIN</label>
                                            <input name='cin' onChange={(e) => handleChange(e)} class="form-control" id="inputCin" type="number" placeholder="Enter your CIN" value={state.cin} />
                                        </div>
                                    </div>
                                    <div class="row gx-3 mb-3">
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputPwd">Password</label>
                                            <input name='pwd' onChange={(e) => handleChange(e)} class="form-control" id="inputPwd" type="password" placeholder="Enter your new password" value={state.pwd} />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputConfirmPwd">Confirm Password</label>
                                            <input name='confirmPwd' onChange={(e) => handleChange(e)} class="form-control" id="inputConfirmPwd" type="password" placeholder="Confirm your new password" value={state.confirmPwd} />
                                        </div>
                                    </div>
                                    <button onClick={(e) => handleSubmit(e)} class="btn btn-primary" type="button">Save changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button style={{ "margin": auto }} onClick={() => logOut()} class="btn btn-danger" type="button">Logout</button>
            <Footer />
        </div>
    );
}

export default EditProfile;