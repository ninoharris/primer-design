import React, { Component } from 'react'
import style from './style'
import axios from 'axios'
import { withRouter } from 'react-router-dom';

class ExerciseEditor extends Component {
  state = {
    author: '',
    question: '',
    start_pos: 1,
    end_pos: 1,
    haystack_seq: '',
    haystack_helper: '',
    plasmid_seq: '',
    plasmid_helper: '',
    isSaved: false,
  }
  loadServerOneExercise = (_id) => {
    return axios.get('http://localhost:3005/exercise/' + _id)
      .then(res => res.data)
      .catch(e => {
        this.props.history.push('/create')
      })
  }
  handleAuthorChange = (e) => {
    this.setState({ author: e.target.value })
  }
  handleQuestionChange = (e) => {
    this.setState({ question: e.target.value })
  }
  handleHaystackChange = (e) => {
    let { value } = e.target
    this.setState({ haystack_seq: value })
  }
  handleHaystackHelperChange = (e) => {
    let { value } = e.target
    this.setState({ haystack_helper: value })
  }
  handlePlasmidChange = (e) => {
    let { value } = e.target
    this.setState({ plasmid_seq: value })
  }
  handlePlasmidHelperChange = (e) => {
    let { value } = e.target
    this.setState({ plasmid_helper: value })
  }
  handleStartPosChange = (e) => {
    let val = e.target.value.replace(/\D/, '')
    val = Number(val).toFixed(0)
    if(isNaN(val) || val < 0) {
      return // NOTE: not sure what this does, lets find out
    }
    this.setState({
      start_pos: val,
    })
  }
  handleEndPosChange = (e) => {
    let val = e.target.value.replace(/\D/, '')
    val = Number(val).toFixed(0)
    if (isNaN(val) || val < 0) {
      return
    }
    this.setState({
      end_pos: val,
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    console.log({state: this.state})
    const exercise = {
      author_id: this.state.author,
      question: this.state.question,
      difficulty: 3, // Defaulting for now. TODO: add in difficulty functionality
      haystack: {
        start_pos: this.state.start_pos,
        end_pos: this.state.end_pos,
        seq: this.state.haystack_seq,
        helper_text: this.state.haystack_helper,
      },
      plasmid: {
        seq: this.state.plasmid_seq,
        helper_text: this.state.plasmid_helper,
      },
      lastUpdated: Date.now(),
    }

    this.props.onSubmit(exercise, this.props._id)
  }
  componentDidMount() {
    // check if ID exists, if so then load data from database:
    if(!this.props._id) return
    this.loadServerOneExercise(this.props._id).then(exercise => {
      console.log(exercise)
      const { author_id: author, question, haystack, plasmid, _id } = exercise
      const { start_pos, end_pos, helper_text: haystack_helper, seq: haystack_seq } = haystack
      const { helper_text: plasmid_helper, seq: plasmid_seq } = plasmid
      this.setState({
        author,
        question,
        start_pos,
        end_pos,
        haystack_seq,
        haystack_helper,
        plasmid_seq,
        plasmid_helper,
        isSaved: true,
      })
    })
  }

  render() {
    const { author, question, start_pos, end_pos, haystack_seq, plasmid_seq, isSaved, haystack_helper, plasmid_helper} = this.state
    return (
      <form style={style.exerciseEditor} onSubmit={this.handleSubmit}>
        <label>
          Author of exercise
          <input 
            type="text"
            onChange={this.handleAuthorChange}
            value={author}
            placeholder="Your name"
          />
        </label>
        <label>
          Exercise question
          <input
            type="text"
            onChange={this.handleQuestionChange}
            value={question}
            placeholder="Exercise question (exam style)"
          />
        </label>
        <label>
          Start of gene
          <input
            type="text"
            onChange={this.handleStartPosChange}
            value={start_pos}
            placeholder="Start Position"
          />
        </label>
        <label>
          End of gene
          <input
            type="text"
            onChange={this.handleEndPosChange}
            value={end_pos}
            placeholder="End Position"
          />
        </label>
        <label>
          Haystack sequence
          <input
            type="text"
            onChange={this.handleHaystackChange}
            value={haystack_seq}
            placeholder="This will include the gene"
          />
        </label>
        <label>
          Haystack helper
          <input
            type="text"
            onChange={this.handleHaystackHelperChange}
            value={haystack_helper}
            placeholder="Helper text for haystack"
          />
        </label>
        <label>
          Plasmid sequence
          <input
            type="text"
            onChange={this.handlePlasmidChange}
            value={plasmid_seq}
            placeholder="This contains the restriction sites"
          />
        </label>
        <label>
          Plasmid helper
          <input
            type="text"
            onChange={this.handlePlasmidHelperChange}
            value={plasmid_helper}
            placeholder="Helper text for plasmid"
          />
        </label>
        <button type="submit">
          {isSaved ? 'Update' : 'Upload'} exercise
        </button>
      </form>
    )
  }
}

export default withRouter(ExerciseEditor)