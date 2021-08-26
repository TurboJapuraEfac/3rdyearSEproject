import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import img1 from "../images/img1.png";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <content className="content">
        <Container>
          <Row>
            <Col>
              <img src={img1} width={350} height={250} alt="img1" />
            </Col>
            <Col>
              <img src={img2} width={350} height={250} alt="img2" />
            </Col>
            <Col>
              <img src={img3} width={350} height={250} alt="img3" />
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
          </Row>
        </Container>
      </content>
    );
  }
}
