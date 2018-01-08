import React, { Component } from 'react'
import Toggle from './Toggle';

class Options extends Component {
  render() {
    return (
      <div>
        <Toggle onToggle={on => console.log('toggle', on)}>
          <Toggle.Button />
          <Toggle.On>Showing codons</Toggle.On>
          <Toggle.Off>Hiding codons</Toggle.Off>
        </Toggle>
      </div>
    )
  }
}

export default Options