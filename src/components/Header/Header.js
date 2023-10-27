import React, { useEffect, useState } from 'react'
import './Header.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserImage } from '../../redux/features/userImage';
import axios from 'axios';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
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
                const resp = await axios.post("https://nodejs-ecommerce-agdc.onrender.com/api/product/getproductbynameordescription", { key: key })
                console.log(resp.data);
                navigate("/research", { state: resp.data.data })
            }
        } catch (err) {

        }
    }

    const [searchVisible, setSearchVisible] = useState(false);
    const openSearchBar = () => {
        setSearchVisible(!searchVisible);
    };

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Function to update windowWidth when the window is resized
    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        // Add an event listener to listen for window resize events
        window.addEventListener('resize', updateWindowWidth);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', updateWindowWidth);
        };
    }, []); // Empty dependency array means this effect only runs once, like componentDidMount

    return (
        <header>
            <section>
                <div id="container">


                    {windowWidth > 1090 ? < div id="shopName"><a style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>myshop</a></div> : < div id="shopName"><a style={{ cursor: 'pointer' }} onClick={() => openSearchBar()}><ManageSearchIcon style={{ "font-size": "40px" }} /></a></div>}
                    <div id="collection">

                        <div id="clothing"><a style={{ cursor: 'pointer' }} onClick={() => manageHeader("CLOTHING")}> CLOTHING </a></div>
                        <div id="accessories"><a style={{ cursor: 'pointer' }} onClick={() => manageHeader("ACCESSORIES")}> ACCESSORIES </a></div>
                    </div>
                    <div id="search">
                        <i className="fas fa-search search"></i>
                        <input type="text" id="input" name="searchBox" placeholder="Search"
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

                        {(userImage == '' ? <i style={{ "cursor": "pointer" }} onClick={(e) => handleGetProfile(e)} className="fas fa-user-circle userIcon"></i> : <img className='userImage' onClick={(e) => handleGetProfile(e)} style={{

                        }} src={`https://nodejs-ecommerce-agdc.onrender.com/images/${userImage}`} />)}

                    </div>
                </div>
                <div><br /><br /><br /><br /></div>
                <div style={{ "z-index": "1", "width": "100%", "position": "fixed", "display": "flex", "justifyContent": "space-between" }}>
                    {searchVisible && (<div style={{ "z-index": "1", "width": "100%", "color": "white" }} className="mySecondSearch">
                        <i className="fas fa-search search"></i>
                        <input style={{ "border-radius": "0px" }} type="text" id="input" name="searchBox" placeholder="Search"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    const key = e.target.value
                                    e.target.value = ''
                                    research(key)
                                }
                            }} />

                    </div>)
                    }
                </div>








            </section>


        </header >
    )
}

export default Header