import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <div className="row">
        <div className="Nav">
          <div className="Logo">
            <h3 className="mb-0">Primer Designer</h3>
          </div>
          <div>
            <button onClick={() => { }} className="btn btn-info" /* TODO: update with tutorial pages */>
              See tutorial
              </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Header