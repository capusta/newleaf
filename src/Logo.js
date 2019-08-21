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
//        TODO: dont make svg src - embed directly to change color
        const animate = this.state.loading ? 'App-logo-thinking' : 'App-logo'
        return (
          <React.Fragment>
            <Row className="justify-content-sm-center flex-grow-1">
                <img src={logo} className={animate} alt="logo" />
            </Row>
          </React.Fragment>
        )
    };
};

export default Logo;