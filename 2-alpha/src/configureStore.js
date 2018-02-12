import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { loadState } from './reducers/localStorage'

import reducer from './reducers'

const initialState = {
  formInputs: {
    FV: '',
    FG: '',
    RV: '',
    RG: '',
  },
  showCodons: false,
  ...loadState()
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