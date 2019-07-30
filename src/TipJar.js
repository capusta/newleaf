import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

class TipJar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null
        }
    };

    handleChange(event) {
        let v = event.target.value
        if(v == Number.parseInt(v)){
          this.setState({id: v});
          this.props.handleId(v);
        };
    }

    render() {
        return (
          <Row className="justify-content-sm-center">
            <Form.Group>
              <br/>
              <Form.Control size="sm" type="text" placeholder="1234" onChange={this.handleChange.bind(this)}/>
            </Form.Group>
          </Row>
        );
    };
};

export default TipJar;