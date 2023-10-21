import React from 'react'
import img1 from "./img/img1.png"
import img2 from "./img/img2.png"
import img3 from "./img/img3.png"
import img4 from "./img/img4.png"


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './Slider.css';


function MySlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return (
        <section>
            <div id="containerSlider">
                <Slider {...settings} >
                    <div id="slidingImage"> <img src={img1} alt="image1" /> </div>
                    <div id="slidingImage"> <img src={img2} alt="image2" /> </div>
                    <div id="slidingImage"> <img src={img3} alt="image3" /> </div>
                    <div id="slidingImage"> <img src={img4} alt="image4" /> </div>
                </Slider>
            </div>
        </section>
    )
}

export default MySlider