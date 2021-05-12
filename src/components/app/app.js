import React, {Component} from 'react';

import './app.css';

import UserTable from '../user-table';

export default class App extends Component {
  render(){
    return(
      <div className="app">
      <h1>CRUD-REACT-APP</h1>
      <UserTable/>
      </div>
    )
  }
}
