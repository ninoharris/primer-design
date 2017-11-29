import React, { Component } from 'react';
import './App.css';

import InputForm from './components/InputForm'
import Display from './components/Display'
import RESites from './components/RESites'

class App extends Component {
  constructor() {
    super()
    this.state = {
      plasmidSeq: '',
      startPos: null,
      endPos: null,
      matches: {},
    }
  }
  onChange = (name, value) => {
    this.setState({
      [name]: value,
    })
  }
  render() {
    const state = this.state
    return (
      <div className="App">
        <div className="sidebar">
          <InputForm {...state} onChange={this.onChange} />
          <RESites />
        </div>
        <div className="main">
          <Display {...state} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}

export default App;
