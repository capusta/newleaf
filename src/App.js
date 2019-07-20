import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Footer from './Footer.js'

const NODE_API = `${process.env.REACT_APP_WALLET_SERVICE}`
const NODE_QRY = '/ping'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address_id: null
        }
    }

render() {
  var msg = 'Please Enter ID'
  var id = this.state.address_id
  if (id && id === parseInt(id, 10)) {
    msg = this.state.address_id
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div> id { msg } </div>
      <Footer />
    </div>
    );
    }
};

export default App;
