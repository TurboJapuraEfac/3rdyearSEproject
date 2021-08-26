import React, { Component } from "react";
import Navbarnew from "../../components/NavBar";
import Footer from "../../components/Footer";

import { signUp, logIn } from "../../firebase/firebase";
import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";

export default class RegisterDel extends Component {
  constructor() {
    super();
    this.state = {
      isRegisterForm: false,
      registerFormError: "",
      userProfileImageLable: "Choose image",
      userName: "",
      userEmail: "",
      userNIC: "",
      userMobile: "",
      userPassword: "",
      userConfirmPassword: false,
      userCity: "",
      userVehicleNum : "",
      userAddress: "",
      userGender: "Male",
      userAge: "",
      userProfileImage: null,
      userTNC: false,
      showError: false,
      userLoginEmail: "",
      userLoginPassword: "",
    };
    this.handleForms = this.handleForms.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handleUserEmail = this.handleUserEmail.bind(this);
    this.handleUserNIC = this.handleUserNIC.bind(this);
    this.handleUserMobile = this.handleUserMobile.bind(this);
    this.handleUserPassword = this.handleUserPassword.bind(this);
    this.handleUserConfirmPassword = this.handleUserConfirmPassword.bind(this);
    this.handleUserCity = this.handleUserCity.bind(this);
    this.handleUserVehicleNumber = this.handleUserVehicleNumber.bind(this);
    this.handleUserAddress = this.handleUserAddress.bind(this);
    this.handleUserAge = this.handleUserAge.bind(this);
    this.handleCreateAccountBtn = this.handleCreateAccountBtn.bind(this);
    this.handleUserProfileImage = this.handleUserProfileImage.bind(this);
    this.handleUserTNC = this.handleUserTNC.bind(this);
    this.handleUserGender = this.handleUserGender.bind(this);
    this.handleLoginNowBtn = this.handleLoginNowBtn.bind(this);
  }

  handleForms() {
    const { isRegisterForm } = this.state;
    if (isRegisterForm) {
      this.setState({ isRegisterForm: false });
    } else {
      this.setState({ isRegisterForm: true });
    }
  }

  handleUserName(e) {
    const userName = e;
    const userNameFormate = /^([A-Za-z.\s_-]).{5,}$/;
    if (userName.match(userNameFormate)) {
      this.setState({
        showError: false,
        registerFormError: "",
        userName: userName,
      });
    } else {
      this.setState({
        showError: true,
        registerFormError: "Please enter a valid name.",
        userName: "",
      });
    }
  }
  
  handleUserVehicleNumber(e){
    const userVehicleNum = e;
    const userVehicleFormate = /^([a-zA-Z]{1,3}|((?!0*-)[0-9]{1,3}))-[0-9]{4}(?<!0{4})/;
    if (userVehicleNum.match(userVehicleFormate))
    {
      this.setState({
        showError: false,
        registerFormError: "",
        userVehicleNum:userVehicleNum,
      });
    } else {
      this.setState({
        showError: true,
        registerFormError: "Please enter a valid vehicle Number.",
        userVehicleNum: "",
      });
    }
  }

  handleUserNIC(e) {
    const userNIC = e;
    const userNICFormate = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;
    if (userNIC.match(userNICFormate)) {
      this.setState({
        showError: false,
        registerFormError: "",
        userNIC: userNIC,
      });
    } else {
      this.setState({
        showError: true,
        registerFormError: "Please enter a valid NIC.",
        userNIC: "",
      });
    }
  }

  handleUserMobile(e) {
    const userMobile = e;
    const userMobileFormate = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    if (userMobile.match(userMobileFormate)) {
      this.setState({
        showError: false,
        registerFormError: "",
        userMobile: userMobile,
      });
    } else {
      this.setState({
        showError: true,
        registerFormError: "Please enter a valid Phone Number",
        userMobile: "",
      });
    }
  }

  handleUserEmail(e) {
    const userEmail = e;
    const userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (userEmail.match(userEmailFormate)) {
      this.setState({
        showError: false,
        registerFormError: "",
        userEmail: userEmail,
      });
    } else {
      this.setState({
        showError: true,
        registerFormError: "Please enter a valid email address.",
        userEmail: "",
      });
    }
  }

  handleUserPassword(e) {
    const userPassword = e;
    const userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    if (userPassword.match(userPasswordFormate)) {
      this.setState({
        showError: false,
        registerFormError: "",
        userPassword: userPassword,
      });
    } else {
      this.setState({
        showError: true,
        registerFormError:
          "Use alphanumeric, uppercase, lowercase & greater than 10 characters.",
        userPassword: "",
      });
    }
  }

  handleUserConfirmPassword(e) {
    const userConfirmPassword = e;
    const { userPassword } = this.state;
    if (userConfirmPassword.match(userPassword)) {
      this.setState({
        showError: false,
        registerFormError: "",
        userConfirmPassword: true,
      });
    } else {
      this.setState({
        showError: true,
        registerFormError: "Confirmation password not matched.",
        userConfirmPassword: false,
      });
    }
  }

  handleUserCity(e) {
    const userCity = e;
    const userCityFormate = /^([A-Za-z.\s_-]).{5,}$/;
    if (userCity.match(userCityFormate)) {
      this.setState({
        showError: false,
        registerFormError: "",
        userCity: userCity,
      });
    } else {
      this.setState({
        showError: true,
        registerFormError: "Please enter a valid city name.",
        userCity: "",
      });
    }
  }

  handleUserAddress(e) {
    const userAddress = e;
    const userAddressFormate = /^([A-Za-z.\s_-]).{5,}$/;
    if (userAddress.match(userAddressFormate)) {
      this.setState({
        showError: false,
        registerFormError: "",
        userAddress: userAddress,
      });
    } else {
      this.setState({
        showError: true,
        registerFormError: "Please enter a valid Address.",
        userAddress: "",
      });
    }
  }

  handleUserGender(e) {
    this.setState({
      userGender: e.target.value,
    });
  }

  handleUserAge(e) {
    const userAge = e;
    if (userAge > 0 && userAge < 101) {
      this.setState({
        showError: false,
        registerFormError: "",
        userAge: userAge,
      });
    } else {
      this.setState({
        showError: true,
        registerFormError: "Please enter a valid age.",
        userAge: "",
      });
    }
  }

  handleUserProfileImage(e) {
    if (e.target.files[0] != null) {
      this.setState({
        showError: false,
        registerFormError: "",
        userProfileImageLable: e.target.files[0].name,
        userProfileImage: e.target.files[0],
      });
    } else {
      this.setState({
        showError: true,
        registerFormError: "Please select a profile image.",
        userProfileImageLable: "Choose image...",
        userProfileImage: "",
      });
    }
  }

  handleUserTNC() {
    const { userTNC } = this.state;
    if (!userTNC) {
      this.setState({
        userTNC: true,
        showError: false,
        registerFormError: "",
      });
    } else {
      this.setState({
        userTNC: false,
        showError: true,
        registerFormError: "Please accept terms and conditions.",
      });
    }
  }

  async handleCreateAccountBtn() {
    const {
      userName,
      userEmail,
      userNIC,
      userMobile,
      userPassword,
      userConfirmPassword,
      userCity,
      userAddress,
      userGender,
      userAge,
      userVehicleNum,
      userProfileImage,
      userTNC,
    } = this.state;

    const userNameFormate = /^([A-Za-z.\s_-]).{5,}$/;
    const userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    const userNICFormate = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;
    const userMobileFormate = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    const userVehicleFormate = /^([a-zA-Z]{1,3}|((?!0*-)[0-9]{1,3}))-[0-9]{4}(?<!0{4})/;
    const userAddressFormate = /^([A-Za-z.\s_-]).{5,}$/;
    const userCityFormate = /^([A-Za-z.\s_-]).{5,}$/;

    if (!userName.match(userNameFormate)) {
      this.setState({
        showError: true,
        registerFormError: "Please enter a valid name.",
      });
    } else if (!userNIC.match(userNICFormate)) {
      this.setState({
        showError: true,
        registerFormError: "Please enter a valid NIC.",
      });
    } else if (!userMobile.match(userMobileFormate)) {
      this.setState({
        showError: true,
        registerFormError: "Please enter a valid phone number.",
      });
    } else if (!userEmail.match(userEmailFormate)) {
      this.setState({
        showError: true,
        registerFormError: "Please enter a valid email address.",
        userEmail: "",
      });
    } 
    else if (!userVehicleNum.match(userVehicleFormate)) {
      this.setState({
        showError: true,
        registerFormError: "Please enter a valid vehicle Number.",
        userVehicleNum: "",
      });
    }else if (!userPassword.match(userPasswordFormate)) {
      this.setState({
        showError: true,
        registerFormError:
          "Use alphanumeric, uppercase, lowercase & greater than 10 characters.",
        userPassword: "",
      });
    } else if (!userConfirmPassword) {
      this.setState({
        showError: true,
        registerFormError: "Confirmation password not matched.",
        userConfirmPassword: false,
      });
    } else if (!userCity.match(userCityFormate)) {
      this.setState({
        showError: true,
        registerFormError: "Please enter a valid city name.",
        userCity: "",
      });
    } else if (!userAddress.match(userAddressFormate)) {
      this.setState({
        showError: true,
        registerFormError: "Please enter a valid Address.",
        userCountry: "",
      });
    } else if (!(userAge > 0 && userAge < 101)) {
      this.setState({
        showError: true,
        registerFormError: "Please enter a valid age.",
        userAge: "",
      });
    } else if (userProfileImage == null) {
      this.setState({
        showError: true,
        registerFormError: "Please select a profile image.",
        userProfileImageLable: "Choose image...",
        userProfileImage: "",
      });
    } else if (!userTNC) {
      this.setState({
        userTNC: false,
        showError: true,
        registerFormError: "Please accept terms and conditions.",
      });
    } else {
      // console.log(userName, userEmail, userPassword, userConfirmPassword, userCity, userCountry, userGender, userAge, userProfileImage, userTNC)
      const userDetails = {
        userName: userName,
        userEmail: userEmail,
        userNIC: userNIC,
        userMobile: userMobile,
        userPassword: userPassword,
        userCity: userCity,
        userAddress: userAddress,
        userGender: userGender,
        userAge: userAge,
        userProfileImage: userProfileImage,
        userVehicleNum:userVehicleNum,
        isCustomer: false,
        isSeller: false,
        isDelivery: true,
        isAdmin: false,
        propsHistory: this.props.history,
        typeOfGood: [],
      };
      try {
        const signUpReturn = await signUp(userDetails);
        // console.log(signUpReturn)
      } catch (error) {
        console.log("Error in Sign up => ", error);
      }
    }
  }

  async handleLoginNowBtn() {
    const { userLoginEmail, userLoginPassword } = this.state;
    const userLoginDetails = {
      userLoginEmail: userLoginEmail,
      userLoginPassword: userLoginPassword,
      propsHistory: this.props.history,
    };
    try {
      const LoginReturn = await logIn(userLoginDetails);
      // console.log(LoginReturn)
    } catch (error) {
      console.log("Error in Login => ", error);
    }
  }

  render() {
    const {
      isRegisterForm,
      showError,
      registerFormError,
      userProfileImageLable,
      userTNC,
      userGender,
    } = this.state;
    return (
      <div>
        <div className="container-fluid register-cont1">
          <div className="">
            {/* <Navbar history={this.props.history} /> */}
            <Navbarnew history={this.props.history} />
            <div className="container register-cont1-text">
              <h1 className="text-uppercase text-white text-center mb-4">
                <strong>Delivery Person Login / Register</strong>
              </h1>
            </div>
          </div>
        </div>

        <div className="container-fluid py-5 bg-light">
          {isRegisterForm ? (
            <div className="col-lg-6 col-md-8 col-sm-12 mx-auto bg-white shadow p-4">
              <h2 className="text-center mb-4">Create an Account</h2>
              <form action="javascript:void(0)">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="userFullName"> Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      placeholder="Name"
                      onKeyUp={(e) => this.handleUserName(e.target.value)}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="userEmail">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="userEmail"
                      placeholder="Email"
                      onKeyUp={(e) => this.handleUserEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="userNIC"> NIC </label>
                    <input
                      type="text"
                      className="form-control"
                      id="userNIC"
                      placeholder="National ID Card Number"
                      onKeyUp={(e) => this.handleUserNIC(e.target.value)}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="userMobile">Mobile</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userMobile"
                      placeholder="Mobile"
                      onKeyUp={(e) => this.handleUserMobile(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="userVehicleNum"> Vehicle Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      placeholder="Vehicle Number"
                      onKeyUp={(e) => this.handleUserVehicleNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="userPassword">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="userPassword"
                      placeholder="Password"
                      onKeyUp={(e) => this.handleUserPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="userConfirmPassword">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="userConfirmPassword"
                      placeholder="Password"
                      onKeyUp={(e) =>
                        this.handleUserConfirmPassword(e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="userCity">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userCity"
                      onKeyUp={(e) => this.handleUserCity(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="userAddress">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userAddress"
                      onKeyUp={(e) => this.handleUserAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="userGender">Gender</label>
                    <select
                      id="userGender"
                      className="form-control"
                      value={userGender}
                      onChange={this.handleUserGender}
                    >
                      <option defaultValue>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="userAge">Age</label>
                    <input
                      type="number"
                      className="form-control"
                      id="userAge"
                      onKeyUp={(e) => this.handleUserAge(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <p className="mb-2">Profile Image</p>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="userProfileImage"
                        onChange={this.handleUserProfileImage}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="userProfileImage"
                      >
                        {userProfileImageLable}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="userTNC"
                      defaultChecked={userTNC}
                      onChange={this.handleUserTNC}
                    />
                    <label className="custom-control-label" htmlFor="userTNC">
                      Accept Terms and Conditions
                    </label>
                  </div>
                </div>
                <p className="text-danger">
                  {showError ? registerFormError : null}
                </p>
                <button
                  type="submit"
                  className="btn btn-warning text-uppercase mb-3"
                  onClick={this.handleCreateAccountBtn}
                >
                  <b>Create an Account</b>
                </button>
              </form>
              <p className="m-0">
                Already have an account?{" "}
                <span
                  className="cursor-pointer text-warning"
                  onClick={this.handleForms}
                >
                  Login Here
                </span>
              </p>
            </div>
          ) : (
            <div className="col-lg-4 col-md-6 col-sm-12 mx-auto bg-white shadow p-4">
              <h2 className="text-center mb-4">Login Your Account</h2>
              <form action="javascript:void(0)">
                <div className="form-group">
                  <label htmlFor="userLoginEmail">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="userLoginEmail"
                    placeholder="Email"
                    onChange={(e) =>
                      this.setState({ userLoginEmail: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="userLoginPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="userLoginPassword"
                    placeholder="Password"
                    onChange={(e) =>
                      this.setState({ userLoginPassword: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-warning text-uppercase mb-3"
                  onClick={this.handleLoginNowBtn}
                >
                  <b>Login Now</b>
                </button>
              </form>
              <p className="m-0">
                Don't have an account yet?{" "}
                <span
                  className="cursor-pointer text-warning"
                  onClick={this.handleForms}
                >
                  Create an Account
                </span>
              </p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}
