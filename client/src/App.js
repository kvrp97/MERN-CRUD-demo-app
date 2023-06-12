import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import EditPost from './components/EditPost'
import PostDetails from './components/PostDetails'
import NavBar from './components/NavBar'

export default class App extends Component {
  render() {
    return (      
        <div className='container'>
          <NavBar/>
          <Routes> 
            <Route path='/' Component={Home} />
            <Route path='/add' Component={CreatePost} />
            <Route path='/edit/:id' Component={EditPost} />
            <Route path='/post/:id' Component={PostDetails} />
          </Routes>
        </div>      
    )
  }
}
