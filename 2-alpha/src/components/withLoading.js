// // Higher order component
// import React from 'react'
// import { connect } from 'react-redux'
// import { loadingSelector } from '../selectors'

// const withLoading = () => {
//   return (WrappedComponent) => (props) => {
//     if (props.loading) {
//       return <div class="loading">Loading</div>
//     }
//     return <WrappedComponent {...props} />
//   }
// }
  
// export default withLoading


// Higher order component
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadingSelector } from '../selectors'
import { fetchExercises } from '../actions'

const withLoading = (WrappedComponent, alwaysFetch) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  class WithLoading extends Component {
    componentDidMount() {
      this.props.fetchExercises(alwaysFetch)
    }
    render() {
      if (this.props.loading) {
        return <div class="loading">Loading</div>
      }
      return <WrappedComponent {...this.props} />
    }
  }
  const mapStateToProps = ({ loading}) => ({ loading })
  WithLoading.displayName = `withLoading(${displayName})`
  return connect(mapStateToProps, { fetchExercises })(WithLoading)
  }


export default withLoading