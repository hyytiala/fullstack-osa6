const filterAtStart = ''

const reducer = (store = filterAtStart, action) => {
  switch (action.type) {
    case 'SET':
    console.log(action.filter)
      return action.filter
    default:
      return store
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SET',
    filter: filter
  }
}

export default reducer