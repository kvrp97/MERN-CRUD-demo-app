import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default class CreatePost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      topic: "",
      description: "",
      postCategory: ""
    };
  }

  handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { topic, description, postCategory } = this.state;
    const data = {
      topic: topic,
      description: description,
      postCategory: postCategory
    }

    console.log(data);

    axios.post("/post/save", data).then((res) => {
      console.log(res);
      if (res.data.success) {
        this.setState(
          {
            topic: "",
            description: "",
            postCategory: ""
          }
        )
      }
    });
  }

  render() {
    return (
      <div style={{ width: '80%', marginTop: '30px', marginLeft: 'auto', marginRight: 'auto' }}>
        <h3>Create New Post</h3>
        <hr />
        <Form onSubmit={this.onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Topic</Form.Label>
            <Form.Control
              name='topic'
              type="text"
              placeholder="Enter Topic"
              value={this.state.topic}
              onChange={this.handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name='description'
              as="textarea"
              rows={3}
              placeholder="Enter Description"
              value={this.state.description}
              onChange={this.handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Post Category</Form.Label>
            <Form.Control
              name='postCategory'
              type="text"
              placeholder="Enter Category"
              value={this.state.postCategory}
              onChange={this.handleInputChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            <i className="far fa-check-square"></i>
            &nbsp; Save
          </Button>
        </Form>
      </div>
    )
  }
}
