import React, { useEffect } from 'react'

import MySlider from '../Slider/MySlider';
import Content from '../Content/Content';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import jwtInterceptor from '../../helpers/jwtInterceptor';

function Home() {
    /*let showOneTime = true
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user && showOneTime) {
            showOneTime = false
            toast.success(user.msg, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, [])*/

    const inter = async () => {
        const user = JSON.parse(localStorage.getItem("user"))
        const resp = await jwtInterceptor.get("http://localhost:8000/api/auth/test/" + user.data._id, {
            withCredentials: true,
        })
        console.log(resp)
    }
    return (
        <div>
            {/* <ToastContainer /> */}

            <Header />
            <MySlider />
            <Content />
            <Footer /></div>
    )
}

export default Home