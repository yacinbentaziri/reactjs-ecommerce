
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';

import { store } from './redux/store';
import { Provider } from 'react-redux';
import Cart from './components/Cart/Cart';
import PaymentStatus from './components/PaymentStatus/PaymentStatus';
import EditProfile from './components/EditProfile/EditProfile';
import OrdersDetail from './components/OrdersDetail/OrdersDetail';
import Reasearch from './components/Research/Reasearch';


function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/product' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/paymentstatus' element={<PaymentStatus />} />
            <Route path='/profile' element={<EditProfile />} ></Route>
            <Route path='/ordersdetail' element={<OrdersDetail />}></Route>
            <Route path='/research' element={<Reasearch />}></Route>

          </Routes>
        </BrowserRouter>
      </Provider>

    </div>
  );
}

export default App;
