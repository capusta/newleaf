import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import logo from './logo.svg';

class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: props.loading
        };
        console.log(this.state.loading + ' - dane')
    };

    componentWillReceiveProps(nextProps) {
      this.setState({ loading: nextProps.loading });
    }

    render() {
        return (
          <React.Fragment>
            <Row className="justify-content-sm-center flex-grow-1">
                <img src={logo} className="App-logo" alt="logo" />
            </Row>
            <Row className="justify-content-sm-center flex-grow-1">
            {this.state.loading + ''}
            </Row>
          </React.Fragment>
        )
    };
};

export default Logo;