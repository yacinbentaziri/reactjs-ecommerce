import React from 'react'
import ReactLoading from 'react-loading';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function MyCustomLoading(props) {
    return <div>
        <Header />
        <div style={{
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "height": "100vh",
        }}>
            <ReactLoading type={props.type} color={props.color} height={'10%'} width={'10%'} />

        </div>

        <Footer />
    </div>

}

export default MyCustomLoading