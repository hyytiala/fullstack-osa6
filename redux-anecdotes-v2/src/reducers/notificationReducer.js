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

export const setNotification = (message) => {
  return {
    type: 'MESSAGE',
    message: message
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}

export default reducer