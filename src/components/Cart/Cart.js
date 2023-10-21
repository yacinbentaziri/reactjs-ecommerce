import React, { useState } from 'react'
import styles from "./Cart.module.css"
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useNavigate } from 'react-router-dom'

import DeleteIcon from '@mui/icons-material/Delete';
import { removeItem } from '../../redux/features/products'
import jwtInterceptor from '../../helpers/jwtInterceptor'


function Cart() {
    const navigate = useNavigate()

    const cartItems = useSelector((state) => state.products.value)
    const [totalAmount, setTotalAmount] = useState(() => {
        let s = 0
        for (let i = 0; i < cartItems.length; i++) {
            s += cartItems[i].price * parseInt(cartItems[i].qte)
        }
        return s
    })

    const dispatch = useDispatch()


    const handleGoToProductDetails = (cartItem) => {
        navigate('/product', { state: cartItem })
    }

    const handleDeleteClick = (event, cartItem) => {
        event.stopPropagation();
        dispatch(removeItem(cartItem))
        setTotalAmount(totalAmount - cartItem.price * cartItem.qte)
    };

    const pay = async () => {
        if (localStorage.getItem('user')) {
            try {
                if (JSON.parse(localStorage.getItem('user')).data.address == undefined) {
                    alert("please complete all your information details")
                    navigate("/profile")
                    return
                }
                if (cartItems.length > 0) {
                    const user = JSON.parse(localStorage.getItem('user')).data._id
                    const resp = await jwtInterceptor.post("http://localhost:8000/api/payment/send/" + user, { amount: totalAmount }, { withCredentials: true })
                    window.location.href = resp.data.data.result.link
                }else{
                    alert("0 item")
                }
            } catch (err) {

            }
        } else {
            navigate("/auth")
        }

    }

    return (
        <div>
            <Header />
            <div id={styles.cartMainContainer}>
                <h2 style={{ color: 'black' }}> Checkout </h2>
                <h3 style={{ "font-weight": "bold" }} id={styles.totalItem}> Total Items: {cartItems.length} </h3>

                <div id={styles.cartContainer}>
                    <div id={styles.cartItemsContainer}>
                        {cartItems.map((cartItem, index) => (
                            <div style={{ cursor: 'pointer' }} onClick={() => handleGoToProductDetails(cartItem)} key={index} id={styles.boxContainer}>
                                <div id={styles.box}>
                                    <img src={"http://localhost:8000/images/" + cartItem.images[0]} alt={cartItem.productName} />
                                    <h4>{cartItem.productName}</h4>
                                    <h4>Quantity : {cartItem.qte} </h4>
                                    <h4>Amount: {cartItem.price} DNT</h4>

                                    <DeleteIcon onClick={(e) => handleDeleteClick(e, cartItem)} color='error' style={{
                                        position: "absolute",
                                        bottom: 10,
                                        right: 10,
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div id={styles.totalContainer}>
                        <div>
                            <h2>Total Amount</h2>
                            <h4>Amount: {totalAmount} DNT</h4>
                            <div>
                                <button onClick={() => pay()}>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cart