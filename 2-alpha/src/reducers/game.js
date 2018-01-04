const game = (state = {}, action) => {
  switch(action.type) {
  case 'SET_EXERCISE':
    return action.payload
  default:
    return state
  }
}

export default game
