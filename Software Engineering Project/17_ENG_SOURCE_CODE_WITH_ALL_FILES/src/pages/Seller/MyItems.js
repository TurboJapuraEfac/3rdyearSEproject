import React, { Component } from 'react';
import Navbarnew from '../../components/NavBar';
import Footer from '../../components/Footer';
import { connect } from 'react-redux';

import { my_items } from '../../redux/ActionCreators';
import 'bootstrap/dist/css/bootstrap.css';
import '../../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MyItems extends Component {

    constructor() {
        super()
        this.state = {}
    }

    async componentDidMount() {
        this.props.my_items();
    }

    static getDerivedStateFromProps(props) {
        const { user, myItems } = props
        return {
            userDetails: user,
            myItems: myItems,
        }
    }

    _renderMyItemsList() {
        const { myItems } = this.state;
        if (myItems) {
            console.log(myItems);
            return Object.keys(myItems).map((val) => {
                return (
                    <div className="container pt-4 pb-2 border-bottom" key={val}>
                        <div className="row">
                            <div className="col-lg-2 col-md-3 col-8 offset-2 offset-lg-0 offset-md-0 px-0 mb-3 text-center">
                                <img style={{ width: "70px", height: "70px" }} alt="Quality Guranteed Items" src={myItems[val].itemImageUrl} />
                            </div>
                            <div className="col-lg-7 col-md-6 col-sm-12 px-0">
                                <h6 className="">{myItems[val].itemTitle}</h6>
                                <p className="mb-1"><small>{myItems[val].itemIngredients}</small></p>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 px-0 text-right">
                                <span className="mx-3"><b>RS.{myItems[val].itemPrice}</b></span>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    render() {
        const { userDetails } = this.state;
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
                                            <img className="p-2 bg-white rounded text-center" alt="Quality Guranteed Items" style={{ width: "60%" }} src={userDetails.userProfileImageUrl} />
                                        </div>
                                        <div className="col-lg-10 col-md-9 col-12 pl-lg-0 pl-md-0">
                                            <h1 className="shop-title">{userDetails.userName}</h1>
                                            <p className="shop-text">{userDetails.typeOfGood.join(', ')}</p>
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
                                    < div className="row">
                                        <div className="col-12 bg-white p-4">
                                            <h4 className="text-center">My Items List</h4>
                                            {this._renderMyItemsList()}
                                        </div>
                                    </div>
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
    return {
        user: state.user,
        myItems: state.myItems,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        my_items: () => dispatch(my_items()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyItems);