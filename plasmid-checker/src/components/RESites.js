import React, { Component } from 'react'

import RESitesJSON from '../utils/data.json'

export default class RESites extends Component {
  render() {
    return (
      <div>
        <h3>Here are some RE Sites to test</h3>
        {RESitesJSON.res.map(RE => {
          return (
          <div key={RE.id} style={{color: `rgba(${RE.color}, 1`}}>
            <strong>{RE.name}: </strong>
            {RE.seq}
          </div>
          )
        })}
      </div>
    )
  }
}