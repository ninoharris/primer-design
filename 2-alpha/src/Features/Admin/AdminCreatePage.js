import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ExerciseEditor from './ExerciseEditor'

// const data = {
//   // used to populate "account" reducer when "Load" is clicked
//   constructStart: '4',
//   constructEnd: '100',
//   haystack: 'TCGCATATTACAAGCGACAAGATTCGTATAAATGGTCCAATTAGTGACCAGTGAGATCGATGTATTGTGTCCCCGACCACATCTACGTATATTGCAAGCTATGTATCGCATAAGAGACTTCGTTATTATAAGTTTCTTCTCCGGGACTGTGTATCACGCCTGGGCGTGTGCGGGCATGGCGTCGGTCCGCGTGATTATGC',
//   vectorFusionEnd: false,
//   vectorFusionStart: false,
//   vectorStart: '14',
//   vectorEnd: '78',
//   vector: 'ACAGCGACCGCGAGTTCTAGCCTAACAAATTCCGGGTACATCTTCTGGACACCACCGTATGGAAGTATTGTATTGTGACGCAATAGATCGGTAATTCCAC',
//   helpers: {
//     4: {
//       name: 'TAG',
//       pos: 4,
//       len: 6,
//       color: '#e5e5e5'
//     }
//   }
// }

class AdminCreatePage extends Component {
  doSomething = (values) => {
    console.log(values)
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="Nav">
            <div className="Logo">
              <h2>Create an exercise</h2>
            </div>
            <div>
              <Link to="/admin"><button className="btn btn-primary">Back to home</button></Link>
            </div>
          </div>
        </div>
        <ExerciseEditor onSubmit={this.doSomething} />
      </div>
    )
  }
} 

export default connect()(AdminCreatePage)