import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import './App.css';
import Footer from './Footer.js'
import TipJar from './TipJar.js'
import Logo from './Logo.js'

const NODE_API = `${process.env.REACT_APP_WALLET_SERVICE}`

class App extends Component {
    constructor(props) {
        super(props);

        // bind props that are passed down to children
        this.handleId = this.handleId.bind(this)
        this.setLoading = this.setLoading.bind(this)

        this.state = {
            address_id_png: null,
            loading: false,
            error: false
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
                that.setState({loading: false, error: true})
            }
        })
        .then(data => {
            if (data['data']){
                that.setState({
                    address_id_png: data.data,
                    address: data.address,
                    loading: false,
                    error: false
                })
            }
          })
        };

    setLoading() {
        console.log(`loading called`)
        this.setState({loading: true});
    };

render() {
  // we're just interested in drawing the png and showing the ID
  if (this.state.address_id_png && this.state.address) {
    var out = (
      <Row className="justify-content-sm-center">
        <div><img src={`data:${this.state.address_id_png}`} alt=""/></div>
      </Row>
    );
    var id = (
      <Row className="justify-content-sm-center">
        <div>{this.state.address}</div>
      </Row>
    );
  }

  return (
    <Container>
        <Logo loading = {this.state.loading} />
        {out}
        {id}
	    <TipJar handleId = {this.handleId} setLoading = {this.setLoading} isLoading = {this.state.loading} hasError={this.state.error}/>
      <Footer />
    </Container>
    );
    }
};

export default App;
