const anecdotesAtStart = ''

const reducer = (store = anecdotesAtStart, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return action.message
    case 'CLEAR':
      return anecdotesAtStart
    default:
      return store
  }
}

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch({
      type: 'MESSAGE',
      message: message
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}

export default reducer