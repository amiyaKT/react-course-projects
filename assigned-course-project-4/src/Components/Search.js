import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

export default class Search extends Component {
  state = {
    username: '',
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.getProfile(this.state.username);
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className='search-box w-50 mx-auto text-left mt-2'>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label htmlFor='username'>Username: </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter username'
              name='username'
              id='username'
              onChange={this.onChange}
              required
            ></Form.Control>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
