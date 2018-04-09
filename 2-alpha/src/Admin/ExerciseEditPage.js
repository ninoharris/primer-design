import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components';

import { getExercise } from '../selectors' 
import { updateExercise, removeExercise } from '../actions/admin'

import AdminHeader from './AdminHeader'
import ExerciseEditor from './ExerciseEditor'
import { CTAButton } from '../components/Button'

const Container = styled.div`
`

class ExerciseEditPage extends Component {
  outerSubmit = (values) => {
    const id = this.props.id
    this.props.updateExercise(id, values).then(() => {
      this.props.history.push('/admin')
    })
  }
  removeExercise = () => {
    const carryOn = window.confirm('Are you sure? This cant be undone')
    if(carryOn) {
      this.props.removeExercise(this.props.id).then(() => {
        this.props.history.push('/admin')
      })
    }
  }
  render() {
    const { id } = this.props
    return (
      <Container>
        <AdminHeader title={`Editing exercise with id: ${id}`}>
          <CTAButton onClick={this.removeExercise}>Delete exercise</CTAButton>
        </AdminHeader>
        <ExerciseEditor outerSubmit={this.outerSubmit} data={this.props.exercise} submitText='Update exercise' />
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const exercise = getExercise(state, { id })
  console.log('exercise is:', exercise)
  return {
    exercise,
    id,
  }
}

export default withRouter(connect(mapStateToProps, { updateExercise, removeExercise })(ExerciseEditPage))