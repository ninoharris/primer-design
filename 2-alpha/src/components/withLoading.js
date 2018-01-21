// Higher order component
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadingSelector } from '../selectors'
import { fetchExercises } from '../actions'

// const withLoading = (WrappedComponent) => (props) => { // Cant do stateless!
//   (
//     props.loading === false ? 
//       <WrappedComponent {...props} /> :
//       <div className="loading">Loading...</div>
//   )
// }


const withLoading = (alwaysFetch = false, admin = false) => (WrappedComponent) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  class WithLoading extends Component {
    componentDidMount() {
      this.props.fetchExercises(alwaysFetch).then(() => {
        if(admin) {
          
        }
      })
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
  return connect(mapStateToProps, { fetchExercises })(WithLoading)
  }


export default withLoading