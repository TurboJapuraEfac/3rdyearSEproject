import React, { Component } from "react";
import Navbarnew from '../../components/NavBar';
import Content from "../../components/HomeContent";
import Slider from "../../components/HomeSlider";
import Footer from "../../components/Footer";
import 'bootstrap/dist/css/bootstrap.css';
import '../../App.css'

export default class Home extends Component {
  constructor() {
    super();
        this.state = {homeSearchBarText: "",}
        this.handleSearchBar = this.handleSearchBar.bind(this);
  }

     handleSearchBar() {
        const { homeSearchBarText } = this.state
        if (homeSearchBarText) {
            this.props.history.push('/shops', this.state.homeSearchBarText)
        }
    }

  render() {
    return (
      <div>
        <div className="container-fluid home-cont1">
        <Navbarnew history={this.props.history} />
        <div className="container home-cont1-text">
              <h1 className="h1 text-uppercase text-white text-center mb-4"><strong>EVERY THING YOU NEED IS<br /> JUST ONE TAP AWAY</strong></h1>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                    <input type="text" className="form-control text-uppercase" id="searchText" placeholder="Shop Name" onChange={(e) => { this.setState({ homeSearchBarText: e.target.value }) }} />
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-12">
                    <button type="button" className="btn btn-warning mb-2 text-uppercase btn-block rounded-0" onClick={this.handleSearchBar}><b>Search</b></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <br></br>
        <Slider />
        <br></br>
        <Content />
          <br></br>
          <br></br>
        <Footer/> 
      </div>
    );
  }
}

