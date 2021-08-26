import React, { Component } from 'react';
import Navbarnew from '../../components/NavBar';
import Footer from '../../components/Footer';
import firebase from '../../firebase/firebase';
import { connect } from 'react-redux';

import { shop_order} from '../../redux/ActionCreators';
import 'bootstrap/dist/css/bootstrap.css';
import '../../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class DelOrderRequests extends Component {
    constructor() {
        super()
        this.state = {
            tab2: "col-12 col-lg-6 col-md-4 text-center order-req-tab-active",
            tab3: "col-12 col-lg-6 col-md-4 text-center",
            tab1Content: false,
            tab2Content: true,
            tab3Content: false,
        }
    }

    async componentDidMount() {
        this.props.shop_order();
        console.log(this.props.shop_order());
    }

    static getDerivedStateFromProps(props) {
        const { user } = props
        return {
            userDetails: user,
        }
    }

    handleTabs(e) {
       if (e === "tab2") {
            this.setState({
                tab1: "col-12 col-lg-6 col-md-4 text-center",
                tab2: "col-12 col-lg-6 col-md-4 text-center order-req-tab-active",
                tab3: "col-12 col-lg-6 col-md-4 text-center",
                tab1Content: false,
                tab2Content: true,
                tab3Content: false,
            })
        } else if (e === "tab3") {
            this.setState({
                tab1: "col-12 col-lg-6 col-md-4 text-center",
                tab2: "col-12 col-lg-6 col-md-4 text-center",
                tab3: "col-12 col-lg-6 col-md-4 text-center order-req-tab-active",
                tab1Content: false,
                tab2Content: false,
                tab3Content: true,
            })
        }
    }


    handleSendToDeliveredBtn(shopId, orderId, userUid) {
        const { userDetails } = this.state;
        const deliveryUid = userDetails.userUid
        firebase
        .firestore()
        .collection('users')
        .doc(deliveryUid)
        .collection('shopOrder')
        .doc(orderId).update({
            status: "DELIVERED",
        })
        .then(() => {
            console.log("Succesfully updated the Delivery Guy")})
            .then(() => {
            firebase.firestore()
            .collection('users')
            .doc(shopId)
            .collection('orderRequest')
            .doc(orderId)
            .update({
            status: "DELIVERED",
        }).then(() => {
            console.log("Sucessfully updated Shop")})})
            .then(() => {
            firebase.firestore()
            .collection('users')
            .doc(userUid)
            .collection('myOrder')
            .doc(orderId)
            .update({
                status: "DELIVERED",
            }).then(() => {
            console.log("Sucessfully updated Cutomer ")})
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    _renderPendingOrderRequest() {
        const { orderRequest } = this.props;
        console.log(orderRequest)
        if (orderRequest) {
            return Object.keys(orderRequest).map((val) => {
                const userUid = orderRequest[val].userUid;
                const orderId = orderRequest[val].id;
                if (orderRequest[val].status === "PENDING") {
                    return (
                        <div className="container border-bottom pb-2 px-lg-0 px-md-0 mb-4" key={orderRequest[val].id}>
                            <div className="row mb-3">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <h5 className="">{orderRequest[val].userName}</h5>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12 text-lg-right text-md-right text-center ">
                                    <span className="text-uppercase text-danger order-req-status">{orderRequest[val].status}</span>
                                </div>
                            </div>
                            {
                                Object.keys(orderRequest[val].itemsList).map((val2) => {
                                    console.log(orderRequest[val].itemsList[val2])
                                    console.log(val2)
                                    return (
                                        <div className="row mb-3" key={val2}>
                                            <div className="col-lg-2 col-md-3 col-8 offset-2 offset-lg-0 offset-md-0 px-0 mb-3 text-center">
                                                <img style={{ width: "70px", height: "70px" }} alt="Goods" src={orderRequest[val].itemsList[val2].itemImageUrl} />
                                            </div>
                                            <div className="col-lg-7 col-md-6 col-sm-12 px-0">
                                                <h6 className="">{orderRequest[val].itemsList[val2].itemTitle}</h6>
                                                <p className="mb-1"><small>{orderRequest[val].itemsList[val2].itemIngredients}</small></p>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-12 px-0 text-right">
                                                <span style={{ fontSize: "14px" }} className="mx-3"><b>RS.{orderRequest[val].itemsList[val2].itemPrice}</b></span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className="row mb-3 mb-md-0 mb-lg-0">
                                <div className="col-lg-6 col-md-6 col-12 order-lg-first order-md-first order-last ">
                                    <button type="button" onClick={() => this.handleSendToInProgressBtn(userUid, orderId)} className="btn btn-warning btn-sm text-uppercase px-3"><b>Send To In Progress</b></button>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12 text-lg-right text-md-right">
                                    <p><b className="mr-4">Total Price:</b><span style={{ fontSize: '1.1rem' }}>RS.{orderRequest[val].totalPrice}</span></p>
                                </div>
                            </div>
                        </div>
                    )
                }
            })
        }
    }

    _renderInProgressOrderRequest() {
        const { shopOrder } = this.props;
        console.log(shopOrder)
        if (shopOrder) {
            return Object.keys(shopOrder).map((val) => {
                const userUid = shopOrder[val].userUid;
                const shopId = shopOrder[val].shopId;
                const orderId = shopOrder[val].id;
                console.log("orderid", orderId);
                console.log("userid", userUid);
                console.log("shopid", shopId);
                console.log(shopOrder[val].status === "IN PROGRESS")
                if (shopOrder[val].status === "IN PROGRESS") {
                    return (
                        <div className="container border-bottom pb-2 px-lg-0 px-md-0 mb-4" key={shopOrder[val].id}>
                            <div className="row mb-3">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <h5 className="">Customer : {shopOrder[val].userName}</h5>
                                    <h5 className="">{shopOrder[val].userAddress}</h5>
                                    <h5 className="">{shopOrder[val].userMobile}</h5>
                                    <br/>
                                    <h5 className="">Seller : {shopOrder[val].shopname}</h5>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12 text-lg-right text-md-right text-center ">
                                    <span className="text-uppercase text-danger order-req-status">{shopOrder[val].status}</span>
                                </div>
                            </div>
                            {
                                Object.keys(shopOrder[val].itemsList).map((val2) => {
                                    // console.log(shopOrder[val].itemsList[val2])
                                    // console.log(val2)
                                    return (
                                        <div className="row mb-3" key={val2}>
                                            <div className="col-lg-2 col-md-3 col-8 offset-2 offset-lg-0 offset-md-0 px-0 mb-3 text-center">
                                                <img style={{ width: "70px", height: "70px" }} alt="Goods" src={shopOrder[val].itemsList[val2].itemImageUrl} />
                                            </div>
                                            <div className="col-lg-7 col-md-6 col-sm-12 px-0">
                                                <h6 className="">{shopOrder[val].itemsList[val2].itemTitle}</h6>
                                                <p className="mb-1"><small>{shopOrder[val].itemsList[val2].itemIngredients}</small></p>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-12 px-0 text-right">
                                                <span style={{ fontSize: "14px" }} className="mx-3"><b>RS.{shopOrder[val].itemsList[val2].itemPrice}</b></span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className="row mb-3 mb-md-0 mb-lg-0">
                                <div className="col-lg-6 col-md-6 col-12 order-lg-first order-md-first order-last ">
                                    <button type="button" onClick={()=>{this.handleSendToDeliveredBtn(shopId, orderId,userUid)}} className="btn btn-warning btn-sm text-uppercase px-3"><b>Accept And Deliver</b></button>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12 text-lg-right text-md-right">
                                    <p><b className="mr-4">Total Price:</b><span style={{ fontSize: '1.1rem' }}>RS.{shopOrder[val].totalPrice}</span></p>
                                </div>
                            </div>
                        </div>
                    )
                }
            })
        }
    }

    _renderDeliveredOrderRequest() {
        const { shopOrder } = this.props;
        // console.log(shopOrder)
        if (shopOrder) {
            return Object.keys(shopOrder).map((val) => {
                // console.log(shopOrder[val].status === "PENDING")
                if (shopOrder[val].status === "DELIVERED") {
                    return (
                        <div className="container border-bottom pb-2 px-lg-0 px-md-0 mb-4" key={shopOrder[val].id}>
                            <div className="row mb-3">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <h5 className="">{shopOrder[val].userName}</h5>
                                    <h5 className="">{shopOrder[val].userAddress}</h5>
                                    <h5 className="">{shopOrder[val].userMobile}</h5>
                                    <br/>
                                    <h5 className="">Seller : {shopOrder[val].shopname}</h5>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12 text-lg-right text-md-right text-center ">
                                    <span className="text-uppercase text-success order-req-status">{shopOrder[val].status}</span>
                                </div>
                            </div>
                            {
                                Object.keys(shopOrder[val].itemsList).map((val2) => {
                                    // console.log(shopOrder[val].itemsList[val2])
                                    // console.log(val2)
                                    return (
                                        <div className="row mb-3" key={val2}>
                                            <div className="col-lg-2 col-md-3 col-8 offset-2 offset-lg-0 offset-md-0 px-0 mb-3 text-center">
                                                <img style={{ width: "70px", height: "70px" }} alt="Goods" src={shopOrder[val].itemsList[val2].itemImageUrl} />
                                            </div>
                                            <div className="col-lg-7 col-md-6 col-sm-12 px-0">
                                                <h6 className="">{shopOrder[val].itemsList[val2].itemTitle}</h6>
                                                <p className="mb-1"><small>{shopOrder[val].itemsList[val2].itemIngredients}</small></p>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-12 px-0 text-right">
                                                <span style={{ fontSize: "14px" }} className="mx-3"><b>RS.{shopOrder[val].itemsList[val2].itemPrice}</b></span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className="row mb-3 mb-md-0 mb-lg-0">
                                <div className="col-lg-6 col-md-6 col-12 order-lg-first order-md-first order-last ">
                                    {/* <button type="button" className="btn btn-warning btn-sm text-uppercase px-3"><b>Send To In Progress</b></button> */}
                                    <h6 style={{ fontSize: '15px' }} className="text-success">This order is successfully delivered</h6>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12 text-lg-right text-md-right">
                                    <p><b className="mr-4">Total Price:</b><span style={{ fontSize: '1.1rem' }}>RS.{shopOrder[val].totalPrice}</span></p>
                                </div>
                            </div>
                        </div>
                    )
                }
            })
        }
    }

    render() {
        const { tab1, tab2, tab3, tab1Content, tab2Content, tab3Content, userDetails } = this.state;
        return (
            <div>
                <div className="container-fluid res-details-cont1">
                    <div className="">
                        <Navbarnew history={this.props.history} />
                        <div className="container px-0 res-details-cont1-text mx-0">
                            <div className="container">
                                {
                                    userDetails ? <div className="row">
                                        <div className="col-lg-2 col-md-3 col-6 text-lg-center text-md-center pr-0 mb-2">
                                            <img className="p-2 bg-white rounded text-center" alt="Goods" style={{ width: "60%" }} src={userDetails.userProfileImageUrl} />
                                        </div>
                                        <div className="col-lg-10 col-md-9 col-12 pl-lg-0 pl-md-0">
                                            <h1 className="shop-title">{userDetails.userName}</h1>
                                        </div>
                                    </div> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ background: "#EBEDF3" }} className="container-fluid py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 col-md-10 col-sm-12 offset-lg-1 offset-md-1">
                                <div className="container">
                                    <div className="row">
                                        <div className={tab2} onClick={() => this.handleTabs("tab2")}>
                                            <p className="order-req-tab-text"><FontAwesomeIcon icon="truck" className="mr-3" />In Progress</p>
                                        </div>
                                        <div className={tab3} onClick={() => this.handleTabs("tab3")}>
                                            <p className="order-req-tab-text"><FontAwesomeIcon icon="tasks" className="mr-3" />Delivered</p>
                                        </div>
                                    </div>
                                    {tab1Content &&
                                        < div className="row pending-order-section">
                                            <div className="col-12 bg-white p-4">
                                                {this._renderPendingOrderRequest()}
                                            </div>
                                        </div>
                                    }
                                    {tab2Content && <div className="row inProgress-order-section">
                                        <div className="col-12 bg-white p-4">
                                            {this._renderInProgressOrderRequest()}
                                        </div>
                                    </div>
                                    }
                                    {tab3Content && <div className="row delivered-order-section">
                                        <div className="col-12 bg-white p-4">
                                            {this._renderDeliveredOrderRequest()}
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        );
    }
}

const mapStateToProps = state => {
    //console.log("mapStateToProps states =>> ", state);
    return {
        user: state.user,
        shopOrder: state.shopOrder,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        shop_order: () => dispatch(shop_order()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DelOrderRequests);