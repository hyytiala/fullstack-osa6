import React from 'react'
import { setFilter } from './../reducers/filteringReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  handleChange = (event) => {
    this.props.setFilter(event.target.value.toLowerCase())
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange} />
      </div>
    )
  }
}

export default connect(
  null,
  { setFilter }
)(Filter)