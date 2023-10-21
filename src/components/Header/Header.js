import React, { useEffect } from 'react'
import './Header.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserImage } from '../../redux/features/userImage';
import axios from 'axios';
function Header() {
    const navigate = useNavigate()
    const location = useLocation()

    const state = useSelector((state) => state.products.value)
    const userImage = useSelector((state) => state.userImage.value)

    // I CALL THIS TO REFRESH THE IMAGE WHEN READING THE HEADER
    const dispatch = useDispatch()

    const handleGetProfile = (e) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem("user"))
        if (!user)
            navigate("/auth")
        else
            navigate("/profile")
    }

    const manageHeader = (id) => {
        if (location.pathname != "/") {
            navigate("/", { state: id })
        } else {
            const element = document.getElementById(id);
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    useEffect(() => {
        const userLocalStorage = localStorage.getItem('user');
        const user = userLocalStorage && JSON.parse(userLocalStorage);
        const image = user && user.data.image ? user.data.image : ''
        dispatch(setUserImage(image))
    }, [])

    const research = async (key) => {
        try {
            if (key.length > 0) {
                const resp = await axios.post("http://localhost:8000/api/product/getproductbynameordescription", { key: key })
                console.log(resp.data);
                navigate("/research", { state: resp.data.data })
            }
        } catch (err) {
            
        }
    }
    return (
        <header>
            <section>
                <div id="container">
                    <div id="shopName"><a style={{ cursor: 'pointer' }} onClick={() => navigate("/")}> <b>SHOP</b>YACIN </a></div>
                    <div id="collection">
                        <div id="clothing"><a style={{ cursor: 'pointer' }} onClick={() => manageHeader("CLOTHING")}> CLOTHING </a></div>
                        <div id="accessories"><a style={{ cursor: 'pointer' }} onClick={() => manageHeader("ACCESSORIES")}> ACCESSORIES </a></div>
                    </div>
                    <div id="search">
                        <i className="fas fa-search search"></i>
                        <input type="text" id="input" name="searchBox" placeholder="Search for Clothing and Accessories"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    const key = e.target.value
                                    e.target.value = ''
                                    research(key)
                                }
                            }} />

                    </div>
                    <div id="user">
                        <a style={{ cursor: 'pointer' }} onClick={() => navigate("/cart")}> <i className="fas fa-shopping-cart addedToCart"><div id="badge"> {state.length} </div></i></a>
                        <a style={{ cursor: 'pointer' }} onClick={() => navigate("/ordersdetail")}> <i className="fas fa-credit-card addedToCart"></i></a>

                        {(userImage == '' ? <i style={{ "cursor": "pointer" }} onClick={(e) => handleGetProfile(e)} className="fas fa-user-circle userIcon"></i> : <img onClick={(e) => handleGetProfile(e)} style={{
                            "width": "50px",
                            "height": "50px",
                            "borderRadius": "50%",
                            "overflow": "hidden",
                            "cursor": "pointer",

                        }} src={`http://localhost:8000/images/${userImage}`} />)}

                    </div>
                </div>
            </section>
        </header>
    )
}

export default Header