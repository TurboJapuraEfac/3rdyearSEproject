import React, { Component } from 'react';
import Navbarnew from '../../components/NavBar';
import Footer from '../../components/Footer';
import { addItem } from '../../firebase/firebase';
import Swal from 'sweetalert2'

import 'bootstrap/dist/css/bootstrap.css';
import '../../App.css'


export default class AddMenuItems extends Component {
    constructor() {
        super()
        this.state = {
            itemImageLable: "Choose image",
            itemTitle: "",
            itemDescription: "",
            itemPrice: "",
            itemImage: "",
            chooseItemType: "",
            chooseYourLocation:"",
            showError: false,
            registerFormError: "",
        }
        this.handleItemImage = this.handleItemImage.bind(this)
        this.handleAddYourItemBtn = this.handleAddYourItemBtn.bind(this)
    }

    handleItemImage(e) {
        if (e.target.files[0] != null) {
            this.setState({
                itemImageLable: e.target.files[0].name,
                itemImage: e.target.files[0]
            });
        } else {
            this.setState({
                itemImageLable: "Choose image",
                itemImage: "",
            });
        }
    }

    async handleAddYourItemBtn() {
        const { itemTitle, itemDescription, itemPrice, itemImage, chooseItemType,chooseYourLocation } = this.state
        if (!itemTitle) {
            this.setState({
                showError: true,
                registerFormError: "Invalid item title."
            })
        } else if (!itemDescription) {
            this.setState({
                showError: true,
                registerFormError: "Invalid item Description."
            })
        } else if (!itemPrice) {
            this.setState({
                showError: true,
                registerFormError: "Invalid item price."
            })
        }
        else if (!itemImage) {
            this.setState({
                showError: true,
                registerFormError: "Image is required."
            })
        }
        else if (!chooseItemType) {
            this.setState({
                showError: true,
                registerFormError: "Must be selected any one."
            })}
        else if (!chooseYourLocation) {
                this.setState({
                    showError: true,
                    registerFormError: "Must be selected any one."
                })    
        } else {
            this.setState({
                showError: false,
                registerFormError: ""
            })
            const itemDetails = {
                itemTitle, itemDescription, itemPrice, itemImage, chooseItemType,chooseYourLocation, propsHistory: this.props.history,
            }
            try {
                const addItemReturn = await addItem(itemDetails)
                Swal.fire({
                    title: 'Success',
                    text: addItemReturn,
                    type: 'success',
                }).then(() => {
                    this.props.history.push('/my-items')
                })
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error,
                    type: 'error',
                })
            }
        }
    }

    render() {
        const { itemImageLable, showError, registerFormError } = this.state;
        return (
            <div>
                <div className="container-fluid seller-details-cont1">
                    <div className="">
                        <Navbarnew history={this.props.history} />
                        <div className="container register-cont1-text">
                            <h1 className="text-uppercase text-white text-center mb-4"><strong>Add Your Items</strong></h1>
                        </div>
                    </div>
                </div>
                <div className="container-fluid py-5 bg-light">
                    <div className="col-lg-6 col-md-6 col-sm-12 mx-auto bg-white shadow p-4">

                        <h2 className="text-center mb-4">Add Menu Items</h2>

                        <form action="javascript:void(0)">

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="itemTitle"><b>Item Title</b></label>
                                    <input type="text" className="form-control" id="itemTitle" placeholder="Full name of item" onChange={(e) => this.setState({ itemTitle: e.target.value })} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="itemDescription"><b>Item Description</b></label>
                                    <input type="text" className="form-control" id="itemDescription" placeholder="Item Ingredients Name" onChange={(e) => this.setState({ itemDescription: e.target.value })} />
                                </div>

                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="itemPrice"><b>Price</b></label>
                                    <input type="number" className="form-control" id="itemPrice" placeholder="Price in number" onChange={(e) => this.setState({ itemPrice: e.target.value })} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="mb-2"><b>Item Image</b></label>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="itemImage" onChange={this.handleItemImage} />
                                        <label className="custom-file-label" htmlFor="itemImage">{itemImageLable}</label>
                                    </div>
                                </div>
                            </div>
                            
                            <label className="mb-2"><b>Choose Item Type</b></label>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="dryfood" value="dryfood" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="dryfood">Dry Food</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="meatitems" value="meatitems" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="meatitems">Meat Items</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="milk" value="milk" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="milk">Milk</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="icecream" value="icecream" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="icecream">Ice cream</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="cannedgoods" value="cannedgoods" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="cannedgoods">Canned Goods</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="healthandbeauty" value="healthandbeauty" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="healthandbeauty">Health and Beauty</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="pharmacy" value="pharmacy" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="pharmacy">Pharmacy</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="paperproducts" value="paperproducts" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="paperproducts">Paper Produtcs</label>
                                    </div>
                                </div>
                            </div>

                            <label className="mb-2"><b>Choose Nearest City</b></label>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="Naththandiya" value="Naththandiya" name="chooseYourLocation" onChange={(e) => this.setState({ chooseYourLocation: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="Naththandiya">Naththandiya</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="Koswaththa" value="Koswaththa" name="chooseYourLocation" onChange={(e) => this.setState({ chooseYourLocation: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="Koswaththa">Koswaththa</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="Kirimatiyana" value="Kirimatiyana" name="chooseYourLocation" onChange={(e) => this.setState({ chooseYourLocation: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="Kirimatiyana">Kirimatiyana</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="Lunuwila" value="Lunuwila" name="chooseYourLocation" onChange={(e) => this.setState({ chooseYourLocation: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="Lunuwila">Lunuwila</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="Wennappuwa" value="Wennappuwa" name="chooseYourLocation" onChange={(e) => this.setState({ chooseYourLocation: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="Wennappuwa">Wennappuwa</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="Dankotuwa" value="Dankotuwa" name="chooseYourLocation" onChange={(e) => this.setState({ chooseYourLocation: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="Dankotuwa">Dankotuwa</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="Marawila" value="Marawila" name="chooseYourLocation" onChange={(e) => this.setState({ chooseYourLocation: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="Marawila">Marawila</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="Katuneriya" value="Katuneriya" name="chooseYourLocation" onChange={(e) => this.setState({ chooseYourLocation: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="Katuneriya">Katuneriya</label>
                                    </div>
                                </div>
                            </div>

                            {showError ? <p className="text-danger">{registerFormError}</p> : null}
                            <button type="submit" className="btn btn-warning text-uppercase mb-3" onClick={this.handleAddYourItemBtn} ><b>Add your item</b></button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}