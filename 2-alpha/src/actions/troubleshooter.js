export const TOGGLE_FV_TS = 'TOGGLE_FV_TS'
export const TOGGLE_RV_TS = 'TOGGLE_RV_TS'

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

export const troubleshootRV = (dispatch) => {
  setTimeout(() => dispatch({
    type: TOGGLE_RV_TS,
    payload: false,
  }), 600)

  dispatch({
    type: TOGGLE_RV_TS,
    payload: true,
  })
}