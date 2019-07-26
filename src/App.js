import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Footer from './Footer.js'

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
  var msg = '-'
  var data = this.state.address_id_png
  if (this.state.address_id_png) {
    msg = this.state.address_id
  }

  return (
    <Row>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div> id { msg } </div>
      <Footer />
    </div>
    </Row>
    );
    }
};

export default App;
