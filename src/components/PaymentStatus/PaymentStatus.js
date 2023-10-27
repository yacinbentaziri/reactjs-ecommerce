import React, { useEffect, useState } from 'react'
import './PaymentStatus.css';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllItem } from '../../redux/features/products';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import jwtInterceptor from '../../helpers/jwtInterceptor';

function PaymentStatus() {
    const [serachParams] = useSearchParams()
    const [PaymentStatus, setPaymentStatus] = useState(null)

    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.products.value)

    const paymentid = serachParams.get("payment_id")
    let dontAddTwoTimes = false

    useEffect(() => {
        const userid = JSON.parse(localStorage.getItem('user')).data._id
        const handleCheckPaymentStatus = async () => {
            try {
                const resp = await jwtInterceptor.post("https://nodejs-ecommerce-agdc.onrender.com/api/payment/verify/" + paymentid + "/" + userid, {}, { withCredentials: true });
                setPaymentStatus(resp.data.data.result.status)
                if (resp.data.data.result.status === "SUCCESS") {
                    addorder()
                    dispatch(removeAllItem())
                }

            } catch (err) {
                console.log(err);
            }
        }

        const addorder = async () => {
            try {
                let all_payment_id = JSON.parse(localStorage.getItem('all_payment_id'))
                if (all_payment_id == null) all_payment_id = []
                if (!(all_payment_id.includes(paymentid))) {
                    all_payment_id.push(serachParams.get("payment_id"))
                    localStorage.setItem("all_payment_id", JSON.stringify(all_payment_id));

                    const resp = await jwtInterceptor.post("https://nodejs-ecommerce-agdc.onrender.com/api/order/addorder", { cart: cartItems, user: userid }, { withCredentials: true })
                }

            } catch (err) {
            }
        }
        if (!dontAddTwoTimes) {
            dontAddTwoTimes = true
            handleCheckPaymentStatus()
        }

    }, [])

    return (
        <div>
            <Header />
            {PaymentStatus === null ? <MyCustomLoading type="spinningBubbles" color="black" />
                :
                PaymentStatus === "SUCCESS" ?
                    <div id="orderContainer">
                        <div id="check"><i className="fas fa-check-circle"></i></div>
                        <div id="aboutCheck">
                            <h2 style={{ color: "black" }}> Order Placed Successfully! </h2>
                            <p> We've sent you an email with the Order details. </p>
                        </div>
                    </div> :
                    <div id="orderContainer">
                        <i style={{ color: "red" }} className="fas fa-exclamation"></i>
                        <div id="aboutCheck">
                            <h2 style={{ color: "black" }}> Payment failure! </h2>
                        </div>
                    </div>}
            <Footer />
        </div>
    )
}

export default PaymentStatus