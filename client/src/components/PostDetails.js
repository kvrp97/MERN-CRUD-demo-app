import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

export default class PostDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      post: {}
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/post/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          post: res.data.post
        });
      }
    })
  }

  render() {
    const { topic, description, postCategory } = this.state.post;
    return (
      <div style={{ marginTop: '25px' }}>
        <h5>{topic}</h5>
        <hr />

        <Table hover>
          <tbody>
            <tr>
              <th>Description</th>
              <td>{description}</td>
            </tr>
            <tr>
              <th>Post Category</th>
              <td>{postCategory}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}
