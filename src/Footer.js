import React, { Component } from 'react';
import { Row,Col } from 'react-bootstrap';

const NODE_API = `${process.env.REACT_APP_WALLET_SERVICE}`
const NODE_QRY = '/ping'

const footerStyle = {
  fontSize: "15px",
  textAlign: "center",
  alignSelf: "flex-end",
};

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appSha: `${process.env.REACT_APP_MNEMONIC_TAIL}`,
            serverId: '...Loading...'
        };
    }

    componentDidMount() {
      var that = this;
        fetch(NODE_API + NODE_QRY)
        .then(res => {
          if(res.ok){
            return res.json()
          } else {
            that.setState({serverId: 'error'})
          }
        })
        .then(data => that.setState({serverId: data.sha}))
    };

render() {
    return (
    <Row style={footerStyle}>
        <Col><b> env: </b><br/>{process.env.NODE_ENV}</Col>
        <Col><b> server:</b><br/> {this.state.serverId}</Col>
        <Col><b>client: </b><br/>{this.state.appSha}</Col>
    </Row>
    );
    }
};

export default Footer;
