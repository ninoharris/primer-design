import React, { Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getCurrentAuthorUid } from '../selectors/admin'
import { updateAdminName } from '../actions/admin'

import AdminHeader from './AdminHeader'

export class MyAccountPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.name
    }
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.props.updateAdminName(this.props.uid, this.state.name)
    this.props.history.push('/admin')
  }
  onNameChange = (e) => {
    this.setState({ name: e.target.value })
  }
  render() {
    return (
      <div className="container-fluid">
        <AdminHeader title="My Account" />
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.onSubmit}>
              <label className="col-12" htmlFor="name">Your full name</label>
              <input id="name" className="col-12" type="text" value={this.state.name} onChange={this.onNameChange} />
              <button className="btn btn-primary" type="submit">Update details</button>
            </form>
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  const uid = getCurrentAuthorUid(state)
  const author = state.authors[uid]
  return {
    uid,
    name: (author && author.name) ? author.name : ''
  }
}

export default withRouter(connect(mapStateToProps, { updateAdminName })(MyAccountPage))