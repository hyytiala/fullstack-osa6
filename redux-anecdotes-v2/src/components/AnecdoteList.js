import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { setNotification, clearNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {

  vote = (content) => async () => {
    const votedAnecdote = {
      id: content.id,
      content: content.content,
      votes: content.votes + 1
    }
    const updated = await anecdoteService.update(content.id, votedAnecdote)
    this.props.anecdoteVote(updated.id)
    this.props.setNotification(`you voted ${updated.content}`)
    setTimeout(() => {
      this.props.clearNotification()
    }, 5000)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes} votes
              <button onClick={
                this.vote(anecdote)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(
    anecdote => anecdote.content.toLowerCase().includes(filter)
  ).sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    anecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  { anecdoteVote, setNotification, clearNotification }
)(AnecdoteList)