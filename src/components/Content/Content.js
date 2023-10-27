import React, { useEffect, useState } from 'react'
import './Content.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function Content() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const location = useLocation();

    const handleGetProducts = async () => {
        try {
            const products = await axios.get("https://nodejs-ecommerce-agdc.onrender.com/api/product/getallproducts")
            setProducts(products.data.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchDataAndScroll = async () => {
            await handleGetProducts();
            if (location.state) {
                const element = document.getElementById(location.state);
                element.scrollIntoView({ behavior: 'smooth' });
            }
        };
        fetchDataAndScroll();

    }, []);

    const goToProductDetails = (product) => {
        navigate('/product', { state: product });
    }

    const DynamicClothingSection = (props) => {
        return (
            <div id="box">
                <a style={{ cursor: 'pointer' }} onClick={() => goToProductDetails(props.product)}>
                    <img src={"https://nodejs-ecommerce-agdc.onrender.com/images/" + props.product.images[0]} alt={props.product.productName} />
                    <div id="details">
                        <h4 style={{"color":"black","padding-top":"10px"}}>{props.product.productName}</h4>
                        <h4 style={{"color":"#4682B4"}}>{props.product.brand}</h4>
                        <h4 style={{color:"black"}}>{props.product.price} DNT</h4>
                    </div>
                </a>
            </div>)
    }

    return (
        <div>
            <div id="mainContainer">
                <h1 id="CLOTHING"> clothing for men and women </h1>
                <div id="containerClothing">
                    {
                        (new Array(products.length).fill(0)).map((val, index) => (
                            products[index].type == "clothing" && <DynamicClothingSection product={products[index]} key={index} />
                        ))
                    }
                </div>
                <h1 id="ACCESSORIES"> accessories for men and women </h1>

                <div id="containerAccessories">
                    {
                        (new Array(products.length).fill(0)).map((val, index) => (
                            products[index].type == "accessories" && <DynamicClothingSection product={products[index]} key={index} />
                        ))
                    }
                </div>

            </div>
        </div>
    );
}

export default Content