import React, { useEffect, useRef, useState } from 'react'
import './ProductDetails.css';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../redux/features/products';



import { Unstable_NumberInput as NumberInput } from '@mui/base';
import { StyledInputRoot, StyledInput, StyledButton } from '../../object/Qteinput/QuantityInput';


import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';


function ProductDetails() {
    const [productDetails, setProductDetails] = useState()

    const [picSelected, setPicSelected] = useState(null)

    // LOCATION USED TO GET THE VALUE SENT FROM USE NAVIGATE
    const location = useLocation();

    const dispatch = useDispatch()

    // SET THE STATE OF CART PRODUCT HAS BEEN SET TO CART OR NO
    const [cartState, setCartState] = useState(false)

    let state = useSelector((state) => state.products.value)

    let qte = useRef(null)

    useEffect(() => {
        setProductDetails(location.state)
        
        // CHECK IF THE PRODUCT HAS BEEN ADDED IN CART ALREADY OR NO
        let getStateLength = state.length
        state = state.filter(item => item._id !== location.state._id)

        if (state.length < getStateLength) setCartState(true)
    }, [])
    
    const handleImageClick = (pic) => {
        setPicSelected("http://localhost:8000/images/" + pic)
    }

    const handleAddItemToCart = () => {
        const inputElement = qte.current.querySelector('input').value
        dispatch(addItem({ ...location.state, qte: inputElement }))
        setCartState(true)
    }
    const handleRemoveItemFromCart = () => {
        dispatch(removeItem(location.state))
        setCartState(false)
    }


    return (
        productDetails && (
            <div>
                <Header />
                <div className="containerProduct">
                    <div className="containerD">
                        <div className="imageSection">
                            <img id="imgDetails" src={picSelected || "http://localhost:8000/images/" + productDetails.images[0]} alt={productDetails.productName} />
                        </div>
                        <div className="productDetails" >
                            <div className="top">
                                <h2 style={{ color: "black" }}>{productDetails.productName}</h2>
                            </div>
                            <div>
                                <h4 style={{ color: '#4682B4' }}>{productDetails.brand}</h4>
                                <h4 style={{ color: "black" }}>{productDetails.price} DNT</h4>
                                <h4>Description</h4>
                                <p>{productDetails.description}</p>
                            </div>
                            <NumberInput ref={qte} min={1} defaultValue={productDetails.qte || 1}
                                slots={{
                                    root: StyledInputRoot,
                                    input: StyledInput,
                                    incrementButton: StyledButton,
                                    decrementButton: StyledButton,
                                }}
                                slotProps={{
                                    incrementButton: {
                                        children: <AddIcon />,
                                        className: 'increment',
                                    },
                                    decrementButton: {
                                        children: <RemoveIcon />,
                                    },
                                }}
                            />
                            <br />
                            <div className="productPreview">
                                <h4>Product Preview</h4>
                                {productDetails.images.map((photo, index) => (
                                    <img
                                        key={index}
                                        id="previewImg"
                                        src={"http://localhost:8000/images/" + photo}
                                        alt={`Preview ${index}`}
                                        onClick={() => handleImageClick(photo)}
                                    />
                                ))}
                            </div>
                            <button
                                className="button"
                                onClick={cartState ? () => handleRemoveItemFromCart() : () => handleAddItemToCart()}>
                                {cartState ? "Remove from cart" : "Add to cart"}
                            </button>

                        </div>
                    </div>
                </div>
                <Footer />
            </div>)
    )
}




export default ProductDetails