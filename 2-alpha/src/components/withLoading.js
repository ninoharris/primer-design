// Higher order component
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllExercises } from '../actions'

const withLoading = (alwaysFetch = false) => (WrappedComponent) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  class WithLoading extends Component {
    componentDidMount() {
      this.props.fetchAllExercises(alwaysFetch)
    }
    render() {
      if (this.props.loading) {
        return <div className="loading">Loading</div>
      }
      return <WrappedComponent {...this.props} />
    }
  }
  const mapStateToProps = ({ loading}) => ({ loading })
  WithLoading.displayName = `withLoading(${displayName})`
  return connect(mapStateToProps, { fetchAllExercises })(WithLoading)
  }


export default withLoading