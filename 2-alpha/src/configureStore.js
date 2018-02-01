import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers'

const initialState = {
  restrictionSites: {
    AAGCTT: { seq: "AAGCTT", name: "HndIII", cutsForward: 1, cutsReverse: 5, color: '#eff75c' },
    ACTAGT: { seq: "ACTAGT", name: "SpeI", cutsForward: 1, cutsReverse: 5, color: '#6050c5' },
    CATATG: { seq: "CATATG", name: "NdeI", cutsForward: 2, cutsReverse: 4, color: '#027a7a' },
    CCGCGG: { seq: "CCGCGG", name: "SacII", cutsForward: 4, cutsReverse: 2, color: '#67a77f' },
    CTGCAG: { seq: "CTGCAG", name: "PstI", cutsForward: 5, cutsReverse: 1, color: '#aa4fc3' },
    GAATTC: { seq: "GAATTC", name: "EcoRI", cutsForward: 1, cutsReverse: 5, color: '#ac8a7a' },
    GCTAGC: { seq: "GCTAGC", name: "NheI", cutsForward: 1, cutsReverse: 5, color: '#ef2cef' },
    GGTACC: { seq: "GGTACC", name: "KpnI", cutsForward: 5, cutsReverse: 1, color: '#30e3ed' },
    GTCGAC: { seq: "GTCGAC", name: "SalI", cutsForward: 1, cutsReverse: 5, color: '#dd904d' },
    TCTAGA: { seq: "TCTAGA", name: "Xba1", cutsForward: 1, cutsReverse: 5, color: '#bd5e7e' },
    CTCGAG: { seq: "CTCGAG", name: "Xho1", cutsForward: 1, cutsReverse: 5, color: '#eb3d4e' },
    GAGCTC: { seq: "GAGCTC", name: "Sac1", cutsForward: 5, cutsReverse: 1, color: '#a13c7c' },
    CCCGGG: { seq: "CCCGGG", name: "Sma1", cutsForward: 3, cutsReverse: 3, color: '#4f4367' },
    CCATGG: { seq: "CCATGG", name: "NcoI", cutsForward: 1, cutsReverse: 5, color: '#eec6d3' }
  },
  formInputs: {
    FV: 'actagt', 
    FG: 'acggtggtaac',
    RV: 'aagctt', //NcoI
    RG: 'cgccactttgg'
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