import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers'

const initialState = {
  restrictionSites: {
    AAGCTT: { id: 0, name: "HndIII", seq: "AAGCTT", cutsForward: 1, cutsReverse: 5 },
    ACTAGT: { id: 5, name: "SpeI", seq: "ACTAGT", cutsForward: 1, cutsReverse: 5 },
    CATATG: { id: 8, name: "NdeI", seq: "CATATG", cutsForward: 2, cutsReverse: 4 },
    CCGCGG: { id: 4, name: "SacII", seq: "CCGCGG", cutsForward: 4, cutsReverse: 2 },
    CTGCAG: { id: 3, name: "PstI", seq: "CTGCAG", cutsForward: 5, cutsReverse: 1 },
    GAATTC: { id: 1, name: "EcoRI", seq: "GAATTC", cutsForward: 1, cutsReverse: 5 },
    GCTAGC: { id: 2, name: "NheI", seq: "GCTAGC", cutsForward: 1, cutsReverse: 5 },
    GGTACC: { id: 6, name: "KpnI", seq: "GGTACC", cutsForward: 5, cutsReverse: 1 },
    GTCGAC: { id: 7, name: "SalI", seq: "GTCGAC", cutsForward: 1, cutsReverse: 5 },
    TCTAGA: { id: 8, name: "Xba1", seq: "TCTAGA", cutsForward: 1, cutsReverse: 5 },
    CTCGAG: { id: 9, name: "Xho1", seq: "CTCGAG", cutsForward: 1, cutsReverse: 5 },
    GAGCTC: { id: 10, name: "Sac1", seq: "GAGCTC", cutsForward: 5, cutsReverse: 1 },
    CCCGGG: { id: 11, name: "Sma1", seq: "CCCGGG", cutsForward: 3, cutsReverse: 3 },
    CCATGG: { id: 12, name: "NcoI", seq: "CCATGG", cutsForward: 1, cutsReverse: 5 }
  },
  formInputs: {
    FV: '',
    FG: '',
    RV: '',
    RG: ''
  }
}

const configureStore = () => {
  const middleWares = [thunk]
  middleWares.push(createLogger())

  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWares)),
  )
}

export default configureStore