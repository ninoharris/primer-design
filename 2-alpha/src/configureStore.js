import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers'

const initialState = {
  // formInputs: { // no start no stop
  //   FV: 'actagt', 
  //   FG: 'acggtggtaac',
  //   RV: 'aagctt', //NcoI
  //   RG: 'cgccactttgg'
  // },
  // formInputs: { // no start, a stop.
  //   FV: 'ccatgga',
  //   FG: 'cacagctacga',
  //   RV: 'gtcgac', //NcoI
  //   RG: 'tcatgcatat'
  // },
  formInputs: {
    FV: '',
    FG: '',
    RV: '',
    RG: '',
  },
  showCodons: false,
}

const configureStore = () => {
  const middleWares = [thunk]
  middleWares.push(createLogger({
    collapsed: true,
  }))

  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWares)),
  )
}

export default configureStore