import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import logo from './logo.svg';
import SVG from 'react-inlinesvg';

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
        const animate = this.state.loading ? 'App-logo-thinking' : 'App-logo'
        const fillColor = this.state.loading ? 'fill="#94d31b"' : 'fill="#323232"'
        const Icon = () => <SVG src={logo}
                                preProcessor={code => code.replace(/fill=".*?"/g, fillColor)} />;
        return (
          <React.Fragment>
            <Row className="justify-content-sm-center flex-grow-1">
            <div className={animate} ><Icon /></div>
            </Row>
          </React.Fragment>
        )
    };
};

export default Logo;