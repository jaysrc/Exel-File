import React, { Component } from 'react'
import {BrowserRouter as Router, Route , Link, Switch } from 'react-router-dom'
import FileImport from './Components/FileImport'
import Showtable from './Components/Showtable'
export default class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Link to='/upload' className='btn btn-link'>File Import</Link>
        <Link to='/Showdata' className='btn btn-link'>Show data</Link>
      </div>
      <Switch>
        <Route path='/upload' component={FileImport}/>
        <Route path = '/Showdata' component={Showtable}/>
      </Switch>
      </Router>
    )
  }
}
