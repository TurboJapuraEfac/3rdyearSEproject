import React, { Component } from "react";
import { Carousel } from "react-bootstrap";

import Bread from "../images/slide/img1.jpg";
import Pizza from "../images/slide/img2.jpg";
import Steak from "../images/slide/img3.jpg";

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div
          className="carouselWrapper container"
          style={{ width: "950", height: "500" }}
        >
          <Carousel>
            <Carousel.Item>
              <img width={1200} height={500} alt="900x500" src={Bread} />
            </Carousel.Item>
            <Carousel.Item>
              <img width={1200} height={500} alt="900x500" src={Pizza} />
            </Carousel.Item>
            <Carousel.Item>
              <img width={1200} height={500} alt="900x500" src={Steak} />
            </Carousel.Item>
          </Carousel>
          
        </div>
      </div>
    );
  }
}
