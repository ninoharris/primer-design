import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers'

const initialState = {
  restrictionSites: {
    AAGCTT: { seq: "AAGCTT", name: "HndIII", cutsForward: 1, cutsReverse: 5 },
    ACTAGT: { seq: "ACTAGT", name: "SpeI", cutsForward: 1, cutsReverse: 5 },
    CATATG: { seq: "CATATG", name: "NdeI", cutsForward: 2, cutsReverse: 4 },
    CCGCGG: { seq: "CCGCGG", name: "SacII", cutsForward: 4, cutsReverse: 2 },
    CTGCAG: { seq: "CTGCAG", name: "PstI", cutsForward: 5, cutsReverse: 1 },
    GAATTC: { seq: "GAATTC", name: "EcoRI", cutsForward: 1, cutsReverse: 5 },
    GCTAGC: { seq: "GCTAGC", name: "NheI", cutsForward: 1, cutsReverse: 5 },
    GGTACC: { seq: "GGTACC", name: "KpnI", cutsForward: 5, cutsReverse: 1 },
    GTCGAC: { seq: "GTCGAC", name: "SalI", cutsForward: 1, cutsReverse: 5 },
    TCTAGA: { seq: "TCTAGA", name: "Xba1", cutsForward: 1, cutsReverse: 5 },
    CTCGAG: { seq: "CTCGAG", name: "Xho1", cutsForward: 1, cutsReverse: 5 },
    GAGCTC: { seq: "GAGCTC", name: "Sac1", cutsForward: 5, cutsReverse: 1 },
    CCCGGG: { seq: "CCCGGG", name: "Sma1", cutsForward: 3, cutsReverse: 3 },
    CCATGG: { seq: "CCATGG", name: "NcoI", cutsForward: 1, cutsReverse: 5 }
  },
  formInputs: {
    FV: 'tctaga', // Xba1
    FG: '',
    RV: 'ccatgg', //NcoI
    RG: ''
  }
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

export default configureStore()