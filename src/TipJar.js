import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

class TipJar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null
        }
     this.timer = null;
    };

    //only update when not loading
    shouldComponentUpdate(nextProps, nextState) {
        // only re-render when next state is not loading
        if (nextProps.isLoading) {
          console.log(' ... still loading ...')
          return false;
        }
        clearTimeout(this.timer);
        return true;
    };

    showChange(v){
      this.setState({id: v});
      this.props.handleId(v);
    };

    handleChange(event) {
      let v = event.target.value
      clearTimeout(this.timer);
      this.timer = setTimeout(function(){this.showChange(v)}.bind(this), 2000)
      this.props.setLoading();
    }

    render() {
        //TODO: display waiting state when doing timeout
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