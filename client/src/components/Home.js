import React, { Component } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
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

    render() {
        return (
            <div className='container'>
                <p>All Posts</p>
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
            </div>
        )
    }
}
