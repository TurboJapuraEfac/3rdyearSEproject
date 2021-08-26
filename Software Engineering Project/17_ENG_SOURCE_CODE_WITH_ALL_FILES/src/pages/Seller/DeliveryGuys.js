import React, { Component } from "react";
import Navbarnew from "../../components/NavBar";
import Footer from "../../components/Footer";
import firebase from '../../firebase/firebase';

import { SelectDeliveryPerson } from '../../firebase/firebase';
import { connect } from "react-redux";
import Swal from 'sweetalert2';
import { delivery_list ,order_request } from "../../redux/ActionCreators";  
import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

class Delivery extends Component {
    constructor() {
        super();
        this.state = {
            defaultSearchValue: "",
            renderDeliveryList: true,
            renderSearchDelivery: false,
        };
        this.handleSearchBar = this.handleSearchBar.bind(this);
    }

    async componentDidMount() {
        this.props.delivery_list();
        this.props.order_request();
        const { state } = await this.props.location;
        if (state) {
            this.setState({
                defaultSearchValue: state,
            });
            this.handleSearchBar(state);
        }
    }
    
    static getDerivedStateFromProps(props) {
        const { state } = props.location;
        const { user } = props
        return {
            shopDetails: state,
            userDetails: user,
        }
    }

    handleSearchBar(event) {
        const searchText = event;
        const { deliveryList  } = this.props;
        if (deliveryList) {
            Object.keys(deliveryList).map((val) => { });
            const result = deliveryList.filter((val) => {
                return (
                    val.userName
                        .toLocaleLowerCase()
                        .indexOf(searchText.toLocaleLowerCase()) !== -1
                );
            });
            if (searchText.length > 0) {
                this.setState({
                    renderDeliveryList: false,
                    renderSearchDelivery: true,
                    searchText: searchText,
                    defaultSearchValue: searchText,
                });
            } else {
                this.setState({
                    renderDeliveryList: true,
                    renderSearchDelivery: false,
                    searchText: searchText,
                    defaultSearchValue: searchText,
                });
            }
        }
    }
     
    handleViewMenuBtn(deliveryDetails) {
        this.props.history.push("/delivery-details", deliveryDetails);  
    }

    async handleConfirmOrderBtn() {
        const { userDetails , deliveryDetails } = this.state;
         const { orderRequest } = this.props;
        if (orderRequest) {
            return Object.keys(orderRequest).map((val) => {
                const userUid = orderRequest[val].userUid;
                const orderId = orderRequest[val].id;
               
        
        if (userDetails) {
            if (userDetails.isSeller) {
                    try {
                        const history = this.props.history;
                        const orderNowReturn =  SelectDeliveryPerson(userDetails, orderId, deliveryDetails, history)
                        console.log(orderNowReturn)
                        Swal.fire({
                            title: 'Success',
                            text: 'Successfully Ordered',
                            type: 'success',
                        }).then(() => {
                            history.push("/my-orders");
                        })
                    } catch (error) {
                        Swal.fire({
                            title: 'Error',
                            text: error,
                            type: 'error',
                        })
                    }
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'You are not able to order',
                    type: 'error',
                })
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: 'You must first Log in to the system',
                type: 'error',
            }).then(() => {
                this.props.history.push('/login')
            })
        }
            })
        }

    }


    _renderDeliveryList() {
        const { deliveryList } = this.props;
        if (deliveryList) {
            return Object.keys(deliveryList).map((val) => {
                return (
                    <div
                        className="container bg-white p-3 px-0 mb-4"
                        key={deliveryList[val].id}
                    >
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-12 px-0 text-center">
                                <img
                                    style={{ width: "70%" }}
                                    src={deliveryList[val].userProfileImageUrl}
                                />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 px-0">
                                <p>
                                    <small className="">
                                        <FontAwesomeIcon icon="star" className="rating mr-1" />
                                        <FontAwesomeIcon icon="star" className="rating mr-1" />
                                        <FontAwesomeIcon icon="star" className="rating mr-1" />
                                        <FontAwesomeIcon icon="star" className="rating mr-1" />
                                        <FontAwesomeIcon icon="star" className="rating mr-1" />
                                    </small>
                                    <small> Reviews </small>
                                </p>
                                <h5 className="">{deliveryList[val].userName}</h5>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 py-4 px-0">
                            </div>
                        </div>
                    </div>
                );
            });
        }
    }

   

    _renderSearchDelivery() {
        const { searchText, searchShops } = this.state;
        if (searchShops) {
            return Object.keys(searchShops).map((val) => {
                return (
                    <div
                        className="container bg-white p-3 px-0 mb-4"
                        key={searchShops[val].id}
                    >
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-12 px-0 text-center">
                                <img
                                    style={{ width: "70%" }}
                                    src={searchShops[val].userProfileImageUrl}
                                />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 px-0">
                                <p>
                                    <small className="">
                                        <FontAwesomeIcon icon="star" className="rating mr-1" />
                                        <FontAwesomeIcon icon="star" className="rating mr-1" />
                                        <FontAwesomeIcon icon="star" className="rating mr-1" />
                                        <FontAwesomeIcon icon="star" className="rating mr-1" />
                                        <FontAwesomeIcon icon="star" className="rating mr-1" />
                                    </small>
                                    <small>Reviews</small>
                                </p>
                                <h5 className="">{searchShops[val].userName}</h5>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 py-4 px-0">
                                <span
                                    style={{
                                        display: "inline-block",
                                        textAlign: "center",
                                        borderRadius: "3px",
                                        border: "1px solid #dddddd",
                                        padding: "6px 7px 0px 7px",
                                        marginRight: "16px",
                                    }}
                                >
                                    <FontAwesomeIcon icon="heart" className="text-success" />
                                </span>
                            </div>
                        </div>
                    </div>
                );
            });
        }
    }

    render() {
        const {
            renderDeliveryList,
            renderSearchDelivery,
            defaultSearchValue,
        } = this.state;
        return (
            <div>
                <div className="container-fluid delivery-cont1">
                    <div className="">
                        {/* <Navbar history={this.props.history} /> */}
                        <Navbarnew history={this.props.history} />
                        <div className="container px-0 shops-cont1-text">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span
                                                    className="input-group-text"
                                                    id="inputGroup-sizing-sm"
                                                >
                                                    <FontAwesomeIcon icon="search" />
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                value={defaultSearchValue}
                                                onChange={(e) => this.handleSearchBar(e.target.value)}
                                                className="form-control"
                                                placeholder="DELIVERY PERSON NAME"
                                                aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ background: "#EBEDF3" }} className="container-fluid py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2 col-md-2 col-sm-12">
                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-12">
                                <h4 className="mb-3"> Delivery Persons Found</h4>
                                <div className="container px-0">
                                    <div className="col-lg-12 col-md-12 col-sm-12 mb-4 px-0">
                                        {renderSearchDelivery && this._renderSearchDelivery()}
                                        {renderDeliveryList && this._renderDeliveryList()}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12">
                                <div className="container bg-white py-3 sort-by">
                                    <h5>Sort By</h5>
                                    <ul>
                                        <li>
                                            <FontAwesomeIcon icon="thumbs-up" className="mr-3" />
                                            <span>Best Match</span>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon
                                                icon="sort-alpha-down"
                                                className="mr-3"
                                            />
                                            <span>Alphabetical</span>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon="star" className="mr-3" />
                                            <span>Ratings</span>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon="user-minus" className="mr-3"/>
                                            <span>Minimum order value</span>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon="dollar-sign" className="mr-3"/>
                                            <span>Delivery fee</span>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon="angle-double-right" className="mr-3"/>
                                            <span>Fastest delivery</span>
                                        </li> 
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        orderRequest: state.orderRequest,
        deliveryList: state.deliveryList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        delivery_list: () => dispatch(delivery_list()),
        order_request: () => dispatch(order_request())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
