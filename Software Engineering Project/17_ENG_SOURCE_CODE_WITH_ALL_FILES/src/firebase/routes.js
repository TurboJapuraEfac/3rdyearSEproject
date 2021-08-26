import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from '../pages/Home/HomeMain';

import RegisterDelivery from '../pages/Delivery/RegisterDel';

import RegisterUser from '../pages/Customer/RegisterUser';
import Shops from '../pages/Customer/Shops';
import ShopDetails from '../pages/Customer/ShopDetails';
import MyOrders from '../pages/Customer/MyOrders';

import AddMenuItems from '../pages/Seller/AddItems';
import OrderRequests from '../pages/Seller/OrderRequest';
import MyItems from '../pages/Seller/MyItems';
import RegisterShop from '../pages/Seller/RegisterShop';
import Delivery from '../pages/Seller/DeliveryGuys';
import DelOrderRequests from '../pages/Delivery/DeliveryOrderReq';


const customHistory = createBrowserHistory();


const MyRoutes = () => (
    <Router history={customHistory}>
        <div>
            <Route exact path='/' component={Home}></Route>
            <Route path='/register-shop' component={RegisterShop}></Route>
            <Route path='/register-delivery' component={RegisterDelivery}></Route>
            <Route path='/login' component={RegisterUser}></Route>
            <Route path='/shops' component={Shops}></Route>
            <Route path='/shop-details' component={ShopDetails}></Route>
            <Route path='/add-menu-items' component={AddMenuItems}></Route>
            <Route path='/order-requests' component={OrderRequests}></Route>
            <Route path='/my-orders' component={MyOrders}></Route>
            <Route path='/my-items' component={MyItems}></Route>
            <Route path='/delivery-guys' component={Delivery}></Route>
            <Route path='/delivery-requests' component={DelOrderRequests}></Route>    
        </div>
    </Router>
)

export default MyRoutes
