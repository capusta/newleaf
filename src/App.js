import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import Footer from './Footer.js'
import TipJar from './TipJar.js'

const NODE_API = `${process.env.REACT_APP_WALLET_SERVICE}`

class App extends Component {
    constructor(props) {
        super(props);

        // bind props that are passed down to children
        this.handleId = this.handleId.bind(this)

        this.state = {
            address_id: null,
            address_id_png: null,
            loading: false
        }
    };

    handleId(id) {
        var that = this;
        // fetch a wallet id's corresponding image
        console.log(`app fetching ${id}`)
        fetch(`${NODE_API}/${id}`)
        .then(res => {
            if(res.ok){
                return res.json()
            } else {
                that.setState({address_id: null})
            }
        })
        .then(data => that.setState({
            //TODO: do not update state when data.data is null
            address_id_png: data.data,
            address_id: id
            }))
        }

render() {
  // we're just interested in drawing the png and showing the ID
  if (this.state.address_id_png && this.state.address_id) {
    //const msg = this.state.address_id
    var out = (
      <Row className="justify-content-sm-center">
        <div><img src={`data:${this.state.address_id_png}`} alt=""/></div>
      </Row>
    );
  }

  return (
    <Container>
        <Row className="justify-content-sm-center flex-grow-1">
          <img src={logo} className="App-logo" alt="logo" />
        </Row>
        {out}
	    <TipJar handleId = {this.handleId} />
      <Footer />
    </Container>
    );
    }
};

export default App;
