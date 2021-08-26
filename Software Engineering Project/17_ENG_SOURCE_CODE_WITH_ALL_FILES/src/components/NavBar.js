import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { update_user, remove_user } from '../redux/ActionCreators';
import { Navbar } from 'react-bootstrap'

class Navbarnew extends Component {
    constructor() {
        super()
        this.state = {
            homeIconLink: '/'
        }
        this._renderWithLogin = this._renderWithLogin.bind(this);

    }

    async componentDidMount() {
        this.props.update_user();
        if (this.props.user) {
        }
    }

    static getDerivedStateFromProps(props) {
        if (props.user) 
        {
            if (props.user.isSeller) {
                return {
                    updated_user: props.user,
                    homeIconLink: '/order-requests',
                }
            } 
            else if (props.user.isCustomer) {
                return {
                    updated_user: props.user,
                    homeIconLink: '/shops',
                }
            } 
            else if (props.user.isDelivery) {
                return {
                    updated_user: props.user,
                    homeIconLink: '/delivery-requests',
                }
            } 
            else if (props.user.isAdmin) {
                return {
                    updated_user: props.user,
                    homeIconLink: '/users',
                }
            } 
        } 
        else 
        {
            return {
                updated_user: {
                    isLogin: false,
                    homeIconLink: '/',
                }
            }
        }
    }

    handleLogOutBtn() {
        this.props.remove_user()
        this.props.history.push('/')
    }

    _renderWithOutLogin() {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <span className="nav-link active text-uppercase mr-2"><Link to="/shops">Shops</Link></span>
                </li>

                <li className="nav-item">
                    <span className="nav-link text-uppercase mr-2"><Link to="/login">Login / Register</Link></span>
                </li>

                <li className="nav-item">
                    <Link to="/register-shop">
                        <button type="button" className="btn btn-warning btn-sm text-uppercase mr-2 mr-1 px-3">Register A Shop</button>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/register-delivery">
                        <button type="button" className="btn btn-warning btn-sm text-uppercase mr-2 mr-1 px-3">Register A Delivery</button>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/register-admin">
                        <button type="button" className="btn btn-warning btn-sm text-uppercase mr-2 mr-1 px-3">Admin</button>
                    </Link>
                </li>

            </ul>
        )
    }

    _renderWithLogin() {
        const { updated_user } = this.state
        if (updated_user.isSeller) {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/add-menu-items">Add Items</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/my-items">My Items</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/order-requests">Order Requests</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/delivery-guys">delivery</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2">{updated_user.userName}</span>
                    </li>
                    <li className="nav-item">
                        <button type="button" className="btn btn-warning btn-sm text-uppercase mr-2 mr-1 px-3" onClick={() => this.handleLogOutBtn()}>Log Out</button>
                    </li>
                </ul>
            )
        } else if (updated_user.isCustomer){
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/shops">Shops</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/my-orders">My Orders</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2">{updated_user.userName}</span>
                    </li>
                    
                    <li className="nav-item">
                        <button type="button" className="btn btn-warning btn-sm text-uppercase mr-2 mr-1 px-3" onClick={() => this.handleLogOutBtn()}>Log Out</button>
                    </li>
                </ul>
            )
        }
        else if (updated_user.isDelivery)
        {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/shops">Shops</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/my-orders">My Orders</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2">{updated_user.userName}</span>
                    </li>
                    <li className="nav-item">
                        <button type="button" className="btn btn-warning btn-sm text-uppercase mr-2 mr-1 px-3" onClick={() => this.handleLogOutBtn()}>Log Out</button>
                    </li>
                </ul>
            )
        }
        else if (updated_user.isAdmin) {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/shops">Registered Shops</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/users">Registered Users </Link></span>
                    </li>
                     <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/delivery">Registered Delivery </Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2">{updated_user.userName}</span>
                    </li>
                    <li className="nav-item">
                        <button type="button" className="btn btn-warning btn-sm text-uppercase mr-2 mr-1 px-3" onClick={() => this.handleLogOutBtn()}>Log Out</button>
                    </li>
                </ul>
            )
        }
    }

    render() {
        const { updated_user, homeIconLink } = this.state
        return (
            // Navbar
            <Navbar variant="dark" expand="lg">

                {/* Brand image */}
                <Navbar.Brand >
                    <Link className="navbar-brand" to={homeIconLink}>
                        <img style={{ width: "50px", height: "50px" }} alt="Logo" src={require("../assets/image/logo/home.png")} />
                    </Link>
                </Navbar.Brand>

                {/* Collapse button */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Navbar Links */}
                <Navbar.Collapse id="basic-navbar-nav">
                    {updated_user.isLogin ? this._renderWithLogin() :  this._renderWithOutLogin()}
                </Navbar.Collapse>

            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update_user: () => dispatch(update_user()),
        remove_user: () => dispatch(remove_user())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbarnew);




