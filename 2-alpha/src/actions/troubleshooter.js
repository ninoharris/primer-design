export const TOGGLE_FV_TS = 'TOGGLE_FV_TS'

export const troubleshootFV = (dispatch) => {
  setTimeout(() => dispatch({
    type: TOGGLE_FV_TS,
    payload: false,
  }), 600)

  dispatch({ 
    type: TOGGLE_FV_TS,
    payload: true,
  })
}