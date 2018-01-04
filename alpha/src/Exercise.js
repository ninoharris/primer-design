import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import style from './style'



class Exercise extends Component {
  handleDelete = () => {
    this.props.onDelete(this.props._id)
  }
  render() {
    const { author, lastUpdated, question, _id } = this.props
    const lastUpdatedDate = new Date(lastUpdated)
    console.log(this.props)
    return (
      <div style={style.exercise}>
        <h4>{author} at {lastUpdatedDate.toLocaleDateString()} : {lastUpdatedDate.toLocaleTimeString()}</h4>
        <Link to={`/exercise/${_id}`}>{question}</Link>
        <a onClick={this.handleDelete}>X</a>
      </div>
    )
  }
}

export default Exercise