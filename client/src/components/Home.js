import React, { Component } from 'react'
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        this.retrievePosts();
    }

    retrievePosts() {
        axios.get("/posts").then((response) => {
            if (response.data.success) {
                this.setState({
                    posts: response.data.existingPosts
                })

                console.log(this.state.posts);
            }
        })
    }

    onDelete = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/post/delete/${id}`).then(() => {
                    this.retrievePosts();
                    Swal.fire(
                        'Deleted!',
                        'Your post has been deleted.',
                        'success'
                    )
                });
            }
        })

    }

    filterData(posts, searchKey) {
        const result = posts.filter((post) => (
            post.topic.toLowerCase().includes(searchKey) ||
            post.description.toLowerCase().includes(searchKey) ||
            post.postCategory.toLowerCase().includes(searchKey)
        ))
        this.setState({ posts: result })
    }

    handleSearch = (e) => {
        e.preventDefault();
        const searchKey = e.currentTarget.value;

        axios.get("/posts").then((response) => {
            if (response.data.success) {
                this.filterData(response.data.existingPosts, searchKey);
            }
        })
    }

    render() {
        return (
            <Container>
                <Row className="mt-4 mb-4">
                    <Col>
                        <h4>All Posts</h4>
                    </Col>
                    <Col lg="4">
                        <Form.Control
                            name="search"
                            type="search"
                            placeholder="Search"
                            onChange={this.handleSearch}
                        />
                    </Col>
                </Row>
                <hr />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Topic</th>
                            <th>Description</th>
                            <th>Post Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.posts?.map((post, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <a href={`/post/${post._id}`} style={{ textDecoration: 'none' }}>{post.topic}</a>
                                    </td>
                                    <td>{post.description}</td>
                                    <td>{post.postCategory}</td>
                                    <td>
                                        <Button variant="warning" href={`/edit/${post._id}`}>
                                            <i className="fas fa-edit"></i>&nbsp;Edit
                                        </Button>{'  '}
                                        <Button variant="danger" onClick={() => this.onDelete(post._id)}>
                                            <i className="far fa-trash-alt"></i>&nbsp;Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Button variant="success"><a href='/add' style={{ textDecoration: 'none', color: 'white' }}>Create New Post</a></Button>{' '}
            </Container>
        )
    }
}
