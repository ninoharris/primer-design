import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Nav from '../components/Nav'
import { PLight } from '../components/Text'


export class AdminNav extends Component {
 render() {
   return (
     <Nav>
       <Nav.Left>

       </Nav.Left>
     </Nav>
   )
 }
}

const mapStateToProps = (state) => {
}
const mapDispatchToProps = (dispatch) => {
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminNav)