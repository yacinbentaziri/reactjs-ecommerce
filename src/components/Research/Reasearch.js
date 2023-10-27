import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

import "./Research.css"
function Reasearch() {

    const location = useLocation();
    const navigate = useNavigate()

    const [searchedProducts, setSearchedProducts] = useState(null)
    const [countNumberOfClothings, setCountNumberOfClouthings] = useState(null)
    const [countNumberOfAccessories, setcountNumberOfAccessories] = useState(null)

    useEffect(() => {
        console.log(location.state);
        setSearchedProducts(location.state)
        let numberOfAccessories = 0
        let numberOfClothings = 0

        new Array(location.state.length).fill(0).map((val, index) => {
            if (location.state[index].type == 'accessories') {
                numberOfAccessories++
            } else {
                numberOfClothings++
            }
        })
        setCountNumberOfClouthings(numberOfClothings)
        setcountNumberOfAccessories(numberOfAccessories)

    }, [location.state])

    const DynamicClothingSection = (props) => {
        return (
            <div id="box">
                <a style={{ cursor: 'pointer' }} onClick={() => goToProductDetails(props.product)}>
                    <img src={"https://nodejs-ecommerce-agdc.onrender.com/images/" + props.product.images[0]} alt={props.product.productName} />
                    <div id="details">
                        <h4 style={{ "color": "black", "padding-top": "10px" }}>{props.product.productName}</h4>
                        <h4 style={{ "color": "#4682B4" }}>{props.product.brand}</h4>
                        <h4 style={{ color: "black" }}>{props.product.price} DNT</h4>
                    </div>
                </a>
            </div>)
    }
    const goToProductDetails = (product) => {
        navigate('/product', { state: product });
    }

    return (
        searchedProducts && (
            <div>

                <Header />
                <br />
                <br />
                <br />

                <div>
                    <div id="mainContainer">
                        {
                            countNumberOfClothings > 0 &&
                            (<div><h1 id="CLOTHING"> clothing for men and women </h1>
                                <div id="containerClothing">
                                    {
                                        (new Array(searchedProducts.length).fill(0)).map((val, index) => (
                                            searchedProducts[index].type == "clothing" && <DynamicClothingSection product={searchedProducts[index]} key={index} />
                                        ))
                                    }
                                </div></div>)
                        }
                        {
                            countNumberOfAccessories > 0 && (<div>
                                <h1 id="ACCESSORIES"> accessories for men and women </h1>

                                <div id="containerAccessories">
                                    {
                                        (new Array(searchedProducts.length).fill(0)).map((val, index) => (
                                            searchedProducts[index].type == "accessories" && <DynamicClothingSection product={searchedProducts[index]} key={index} />
                                        ))
                                    }
                                </div>

                            </div>)
                        }
                    </div>
                </div>

                <Footer />
            </div >)
    );

}

export default Reasearch