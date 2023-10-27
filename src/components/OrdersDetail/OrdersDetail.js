import React from 'react'


import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import jwtInterceptor from '../../helpers/jwtInterceptor';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import MyCustomLoading from '../../object/MyCustomLoading/MyCustomLoading ';
import { useNavigate } from 'react-router-dom';



function OrdersDetail() {

    const [orders, setOrders] = useState(null);
    const [orderPrices, setOrderPrices] = useState(null);

    const [ordersToShow, setOrdersToShow] = useState(null)
    const [orderPricesToShow, setOrderPricesToShow] = useState(null)
    const [currentPagination, setCurrentPagination] = useState({
        begin: null,
        end: null,
        n: 1
    })

    const incrementPagination = () => {
        setCurrentPagination({
            begin: currentPagination.end,
            end: orders.length > (5 * (currentPagination.n + 1)) ? (5 * (currentPagination.n + 1)) : orders.length,
            n: currentPagination.n + 1
        })
    }
    const decrementPagination = () => {
        setCurrentPagination({
            begin: currentPagination.begin - 5,
            end: currentPagination.begin,
            n: currentPagination.n - 1
        })
    }
    useEffect(() => {
        ordersAndOrderPricesSlice();
    }, [currentPagination.n]);


    const ordersAndOrderPricesSlice = () => {
        let myList = []
        let myList2 = []
        for (let i = currentPagination.begin; i < currentPagination.end; i++) {
            myList.push(orders[i])
        }
        for (let i = currentPagination.begin; i < currentPagination.end; i++) {
            myList2.push(orderPrices[i])
        }
        setOrdersToShow(myList)
        setOrderPricesToShow(myList2)

    }
    useEffect(() => {
        if (orderPrices !== null) {
            setCurrentPagination({
                ...currentPagination,
                begin: 0,
                end: orders.length > 5 ? 5 : orders.length,
            })
            //ordersAndOrderPricesSlice()

        }
    }, [orderPrices]);

    // condition wa9tli awl mara bech i7ot valeuret tableau w t'afficher direct
    useEffect(() => {
        if (currentPagination.begin == 0) {
            console.log("looooooooooooooooooooool");
        } ordersAndOrderPricesSlice()
    }, [currentPagination.begin])

    const navigate = useNavigate()

    useEffect(() => {
        const userExist = JSON.parse(localStorage.getItem('user'))
        if (!userExist) {
            return navigate("/auth")

        }
        const getproductprice = async (productId) => {
            try {
                const resp = await axios.get("https://nodejs-ecommerce-agdc.onrender.com/api/product/getproductbyid/" + productId);
                return resp.data.data.price;
            } catch (err) {
                // Handle errors appropriately
            }
        }

        const getorderprice = async (order) => {
            let sum = 0;
            for (let i = 0; i < order.products.length; i++) {
                const productprice = await getproductprice(order.products[i].product);
                sum += productprice * order.products[i].quantity;
            }
            return sum;
        }

        const getordersbyid = async () => {
            try {
                const userid = JSON.parse(localStorage.getItem('user')).data._id;
                const resp = await jwtInterceptor.get("https://nodejs-ecommerce-agdc.onrender.com/api/order/getordersbyid/" + userid, { withCredentials: true });
                return resp.data.data;
            } catch (err) {
                // Handle errors appropriately
            }
        }

        const fetchOrders = async () => {
            const ordersData = await getordersbyid();
            const ordersDataWithNumbers = ordersData.map((order, index) => ({
                ...order,
                orderNumber: index + 1,
            }));

            setOrders(ordersDataWithNumbers);

            // Calculate order prices here and set them in orderPrices state
            const prices = await Promise.all(ordersData.map(order => getorderprice(order)));
            setOrderPrices(prices);
        }
        fetchOrders()
    }, []);





    return (
        (orderPricesToShow != null && ordersToShow != null && orders != null && orderPrices != null) ?
            (
                <div>
                    <Header />
                    <br />
                    <br />
                    <br />
                    <div className="container mb-4 main-container">
                        <div className="row">
                            {/* Orders Table */}
                            <div className="col-lg-12 pb-3">
                                <div className="table-responsive">
                                    <table className="table table-hover table-responsive mb-0">
                                        {
                                            orderPricesToShow.length >= 0 && <thead>
                                                <tr>
                                                    <th>Order #</th>
                                                    <th>Date Purchased</th>
                                                    <th>Status</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>

                                        }
                                        <tbody>
                                            {
                                                (new Array(orderPricesToShow.length).fill(0)).map((val, index) => (
                                                    <tr key={index}>
                                                        <td><a className="navi-link" data-toggle="modal">{ordersToShow[index].orderNumber}</a></td>
                                                        <td>{ordersToShow[index].date}</td>
                                                        <td><span className="badge bg-success">Success</span></td>
                                                        <td><span >{orderPricesToShow[index]} DNT</span></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <nav aria-label="...">
                            <ul class="pagination">
                                <li className={currentPagination.n == 1 ? "page-item disabled" : "page-item"}>
                                    <span class="page-link" style={{ "cursor": "pointer" }} onClick={decrementPagination}>Previous</span>
                                </li>

                                <li className={currentPagination.n == (orders.length % 5 == 0 ? orders.length / 5 : Math.floor(orders.length / 5) + 1) ? "page-item disabled" : "page-item"}>
                                    <a class="page-link" style={{ "cursor": "pointer" }} onClick={incrementPagination}>Next</a>
                                </li>
                            </ul>
                        </nav>

                    </div>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <Footer />
                </div>) : (
                <MyCustomLoading type="spinningBubbles" color="black" />
            )

    )
}

export default OrdersDetail