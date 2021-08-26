import React, { Component } from "react";
import Navbarnew from "../../components/NavBar";
import Footer from "../../components/Footer";
import { connect } from "react-redux";

import { shop_list } from "../../redux/ActionCreators";  
import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

class Shops extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            defaultSearchValue: "",
            renderShopList: true,
            renderCategorizedShops: false,
            renderSearchShops: false,
        };
        this.handleCategoriesCheckbox = this.handleCategoriesCheckbox.bind(this);
        this.handleSearchBar = this.handleSearchBar.bind(this);
    }

    async componentDidMount() {
        this.props.shop_list();
        const { state } = this.props.location;
        if (state) {
            this.setState({
                defaultSearchValue: state,
            });
            this.handleSearchBar(state);
        }
    }

    handleCategoriesCheckbox(event) {
        const { categories } = this.state;
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        if (value) {
            categories.push(name);
            this.setState({
                categories: categories,
                renderShopList: false,
                renderCategorizedShops: true,
            });
            if (categories.length > 0) {
                this._renderCategorizedShops();
            } else {
                this.setState({
                    renderShopList: true,
                    renderCategorizedShops: false,
                });
            }
        } else {
            const index = categories.indexOf(name);
            if (index > -1) {
                categories.splice(index, 1);
                this.setState({
                    categories: categories,
                    renderShopList: false,
                    renderCategorizedShops: true,
                });
                if (categories.length > 0) {
                    this._renderCategorizedShops();
                } else {
                    this.setState({
                        renderShopList: true,
                        renderCategorizedShops: false,
                    });
                }
            }
        }
    }

    handleSearchBar(event) {
        const searchText = event;
        const { shopList } = this.props;
        if (shopList) {
            Object.keys(shopList).map((val) => { });
            const result = shopList.filter((val) => {
                return (
                    val.userName
                        .toLocaleLowerCase()
                        .indexOf(searchText.toLocaleLowerCase()) !== -1
                );
            });
            if (searchText.length > 0) {
                this.setState({
                    renderShopList: false,
                    renderCategorizedShops: false,
                    renderSearchShops: true,
                    searchShops: result,
                    searchText: searchText,
                    defaultSearchValue: searchText,
                });
            } else {
                this.setState({
                    renderShopList: true,
                    renderCategorizedShops: false,
                    renderSearchShops: false,
                    searchShops: result,
                    searchText: searchText,
                    defaultSearchValue: searchText,
                });
            }
        }
    }

    handleViewMenuBtn(shopDetails) {
        this.props.history.push("/shop-details", shopDetails);  
    }

    _renderShopList() {
        const { shopList } = this.props;
        if (shopList) {
            return Object.keys(shopList).map((val) => {
                return (
                    <div
                        className="container bg-white p-3 px-0 mb-4"
                        key={shopList[val].id}
                    >
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-12 px-0 text-center">
                                <img
                                    style={{ width: "70%" }}
                                    alt="Goods"
                                    src={shopList[val].userProfileImageUrl}
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
                                    <small>Reviews </small>
                                </p>
                                <h5 className="">{shopList[val].userName}</h5>
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
                                <button
                                    type="button"
                                    onClick={() => this.handleViewMenuBtn(shopList[val])}
                                    className="btn btn-warning btn-sm text-uppercase"
                                    style={{ marginBottom: "8px" }}
                                >
                                    View Menu
                                </button>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 px-0 text-center">
                                <h6 className="">{shopList[val].userAddress}</h6>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 px-0">
                                <small className="">Call us : {shopList[val].userMobile}</small>
                            </div>
                        </div>
                    </div>
                );
            });
        }
    }

    _renderCategorizedShops() {
        const { shopList } = this.props;
        const { categories } = this.state;
        if (shopList) {
            return Object.keys(shopList).map((val) => {
                return shopList[val].typeOfGood.map((e1) => {
                    return categories.map((e2) => {
                        if (e1 === e2) {
                            return (
                                <div
                                    className="container bg-white p-3 px-0 mb-4"
                                    key={shopList[val].id}
                                >
                                    <div className="row">
                                        <div className="col-lg-3 col-md-3 col-sm-12 px-0 text-center">
                                            <img
                                                style={{ width: "70%" }}
                                                alt="Goods"
                                                src={shopList[val].userProfileImageUrl}
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 px-0">
                                            <p>
                                                <small className="">
                                                    <FontAwesomeIcon
                                                        icon="star"
                                                        className="rating mr-1"
                                                    />
                                                    <FontAwesomeIcon
                                                        icon="star"
                                                        className="rating mr-1"
                                                    />
                                                    <FontAwesomeIcon
                                                        icon="star"
                                                        className="rating mr-1"
                                                    />
                                                    <FontAwesomeIcon
                                                        icon="star"
                                                        className="rating mr-1"
                                                    />
                                                    <FontAwesomeIcon
                                                        icon="star"
                                                        className="rating mr-1"
                                                    />
                                                </small>
                                                <small>Reviews</small>
                                            </p>
                                            <h5 className="">{shopList[val].userName}</h5>
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
                                                <FontAwesomeIcon
                                                    icon="heart"
                                                    className="text-success"
                                                />

                                            </span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    this.handleViewMenuBtn(shopList[val])
                                                }
                                                className="btn btn-warning btn-sm text-uppercase"
                                                style={{ marginBottom: "8px" }}
                                            >
                                                View Menu
                      </button>
                                        </div>
                                         <div className="col-lg-3 col-md-3 col-sm-12 px-0 text-center">
                                        <h6 className="">{shopList[val].userAddress}</h6>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 px-0">
                                            <small className="">Call us : {shopList[val].userMobile}</small>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    });
                });
            });
        }
    }

    _renderSearchShops() {
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
                                    alt="Goods"
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
                                <button
                                    type="button"
                                    onClick={() => this.handleViewMenuBtn(searchShops[val])}
                                    className="btn btn-warning btn-sm text-uppercase"
                                    style={{ marginBottom: "8px" }}
                                >
                                    View Menu
                                </button>
                            </div>
                             <div className="col-lg-3 col-md-3 col-sm-12 px-0 text-center">
                                <h6 className="">{searchShops[val].userAddress}</h6>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 px-0">
                                <small className="">Call us : {searchShops[val].userMobile}</small>
                            </div>
                        </div>
                    </div>
                );
            });
        }
    }

    render() {
        const {
            renderShopList,
            renderCategorizedShops,
            renderSearchShops,
            defaultSearchValue,
        } = this.state;
        return (
            <div>
                <div className="container-fluid shop-cont1">
                    <div className="">
                        {/* <Navbarn history={this.props.history} /> */}
                        <Navbarnew history={this.props.history} />
                        <div className="container px-0 shop-cont1-text">
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
                                                placeholder="SHOP NAME"
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
                                <div className="listing-filter">
                                    <div className="filter-heading py-2 mb-3">
                                        <h6 className="m-0">
                                            <FontAwesomeIcon icon="utensils" className="mr-2" />
                      Categories
                    </h6>
                                    </div>
                                    <div>
                                        <ul className="filter-list">
                                            <li>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="dryfood"
                                                        name="Dry Food"
                                                        onChange={this.handleCategoriesCheckbox}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="dry-food"
                                                    >
                                                        Dry Food
                                                     </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="meatitems"
                                                        name="MeatItems"
                                                        onChange={this.handleCategoriesCheckbox}
                                                    />
                                                    <label className="custom-control-label" htmlFor="meatitems">
                                                        Meat Items
                                            </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="milk"
                                                        name="Milk"
                                                        onChange={this.handleCategoriesCheckbox}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="milk"
                                                    >
                                                        Milk
                          </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="ice-cream"
                                                        name="Ice Cream"
                                                        onChange={this.handleCategoriesCheckbox}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="ice-cream"
                                                    >
                                                        Ice Cream
                          </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="cannedgoods"
                                                        name="Canned Goods"
                                                        onChange={this.handleCategoriesCheckbox}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="cannedgoods"
                                                    >
                                                        Canned Goods
                          </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="health-and-beauty"
                                                        name="HealthAndBeauty"
                                                        onChange={this.handleCategoriesCheckbox}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="health-and-beauty"
                                                    >
                                                        Health And Beauty
                                                    </label>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="paper-products"
                                                        name="PaperProducts"
                                                        onChange={this.handleCategoriesCheckbox}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="paper-products"
                                                    >
                                                        Paper Products
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-12">
                                <h4 className="mb-3"> Shops's Found</h4>
                                <div className="container px-0">
                                    <div className="col-lg-12 col-md-12 col-sm-12 mb-4 px-0">
                                        {renderSearchShops && this._renderSearchShops()}
                                        {renderCategorizedShops &&
                                            this._renderCategorizedShops()}
                                        {renderShopList && this._renderShopList()}
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
        shopList: state.shopList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        shop_list: () => dispatch(shop_list()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shops);
