import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import Footer from './Footer.js'

const fill = {
    "min-height": "90vh",
};

const NODE_API = `${process.env.REACT_APP_WALLET_SERVICE}`

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address_id: null,
            address_id_png: null,
            loading: false
        }
    }

render() {
  // we're just interested in drawing the png and showing the ID
  var data = this.state.address_id_png
  if (this.state.address_id_png && this.state.address_id) {
    //const msg = this.state.address_id
    var out = (
      <Col className="centered">
        <div>{this.state.address_id}</div>
        <div><img src={`data:${this.state.address_id_png}`}/></div>
      </Col>
    );
  }

  return (
    <Container>
      <Row style={fill}>
        {out}
	    <Col>
          <Row className="centered">
            <img src={logo} className="App-logo" alt="logo" />
	      </Row>
	    </Col>
      </Row>
      <Footer />
    </Container>
    );
    }
};

export default App;
