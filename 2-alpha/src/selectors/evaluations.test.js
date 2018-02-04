import { getAllEvaluations } from './evaluations'

describe('Evaluations', () => {
  let defaults
  beforeEach(() => {
    defaults = {
      restrictionSites: {
        AAGCTT: { seq: 'AAGCTT', name: 'HndIII', cutsForward: 1, cutsReverse: 5, color: '#eff75c' }, ACTAGT: { seq: 'ACTAGT', name: 'SpeI', cutsForward: 1, cutsReverse: 5, color: '#6050c5' }, CATATG: { seq: 'CATATG', name: 'NdeI', cutsForward: 2, cutsReverse: 4, color: '#027a7a' }, CCGCGG: { seq: 'CCGCGG', name: 'SacII', cutsForward: 4, cutsReverse: 2, color: '#67a77f' }, CTGCAG: { seq: 'CTGCAG', name: 'PstI', cutsForward: 5, cutsReverse: 1, color: '#aa4fc3' }, GAATTC: { seq: 'GAATTC', name: 'EcoRI', cutsForward: 1, cutsReverse: 5, color: '#ac8a7a' }, GCTAGC: { seq: 'GCTAGC', name: 'NheI', cutsForward: 1, cutsReverse: 5, color: '#ef2cef' }, GGTACC: { seq: 'GGTACC', name: 'KpnI', cutsForward: 5, cutsReverse: 1, color: '#30e3ed' }, GTCGAC: { seq: 'GTCGAC', name: 'SalI', cutsForward: 1, cutsReverse: 5, color: '#dd904d' }, TCTAGA: { seq: 'TCTAGA', name: 'Xba1', cutsForward: 1, cutsReverse: 5, color: '#bd5e7e' }, CTCGAG: { seq: 'CTCGAG', name: 'Xho1', cutsForward: 1, cutsReverse: 5, color: '#eb3d4e' }, GAGCTC: { seq: 'GAGCTC', name: 'Sac1', cutsForward: 5, cutsReverse: 1, color: '#a13c7c' }, CCCGGG: { seq: 'CCCGGG', name: 'Sma1', cutsForward: 3, cutsReverse: 3, color: '#4f4367' }, CCATGG: { seq: 'CCATGG', name: 'NcoI', cutsForward: 1, cutsReverse: 5, color: '#eec6d3' }
      }
    }
  })

  describe('Exercise example 1', () => {
    let state
    beforeEach(() => {
      state = {
        ...defaults,
        exercisesById: {
          '-L3d6TNs2PKt-fMf7_lS': {
            haystack: 'GTACACGGTGGTAACCCATAGGTCCGCTCCCCCAGCTTGGTGCATCAGGTCCTAATACAGCGGCCGGCTGCTGTAGGCCGTTGTAGAAACAGTAGACACGGGCACTCGGAACCTGCAGACCTCAGTGAGCTGAGTCGCCTTCTTTTGTCCCAAAGTGGCGTGCGCAGCACATGCCCCTCAGCGGGTGGCTATTACTGTCCAAGGGGGTCACACCCACCAATGTGCGACCGATTAGCTGGACCACTTGTGCAAAGCTGTGCCACCCGACTTCGCTCGTGCAGGGTACGTGGGGCACAGCGA',
            vector: 'ACAGCGAAATAGTTTCTAGATCTAGACGCTGATAGTGACTAGTATCTACCGCGGAAGAAGCTTCCGACTAGCTGCATACTGACTGATCGAT',
            constructEnd: 160,
            constructStart: 4,
            fusionEnd: true,
            fusionStart: true,
            vectorEnd: 79,
            vectorStart: 12
          }
        },
        currentExercise: '-L3d6TNs2PKt-fMf7_lS',
      }
    })
    test('Evaluations array is empty if given no inputs', () => {
      state = {
        ...state,
        formInputs: {
          FV: '',
          RV: '',
          FG: '',
          RG: '',
        }
      }
      const result = getAllEvaluations(state)
      expect(result).toEqual([])
    })
    test('Should have no matches', () => {
      state = { ...state, 
        formInputs: {
          FV: 'ccatgga',
          FG: 'cacagctacga',
          RV: 'gtcgac',
          RG: 'tcatgcatat',
        }
      }

      const result = getAllEvaluations(state)
      expect(result).toContainEqual({ "ID": "FORWARD_NO_MATCH", "inputs": ["FG"], "success": false })
      expect(result).toContainEqual({ "ID": "REVERSE_NO_MATCH", "inputs": ["RG"], "success": false })
      expect(result).toContainEqual({ "ID": "NO_MATCH_FV", "inputs": ["FV"], "success": false })
      expect(result).toContainEqual({ "ID": "NO_MATCH_RV", "inputs": ["RV"], "success": false })
    })

    test('Should have exceeded matches when only FV is entered', () => {
      state = { ...state,
        formInputs: {
          FV: 'tctaga',
          RV: '',
          FG: '',
          RG: '',
        }
      }
      const result = getAllEvaluations(state)
      expect(result).toContainEqual({ "ID": "EXCEED_MATCH_FV", "inputs": ["FV"], "success": false })
    })

    test('FV should succeed with just one match', () => {
      state = {
        ...state,
        formInputs: {
          FV: 'actagt',
          RV: '',
          FG: '',
          RG: '',
        }
      }
      const result = getAllEvaluations(state)
      expect(result).toContainEqual({ "ID": "FV_MATCHES_ONCE", "inputs": ["FV"], "success": true })
    })

    test('RV should succeed with just one match', () => {
      state = {
        ...state,
        formInputs: {
          FV: '',
          RV: 'actagt',
          FG: '',
          RG: '',
        }
      }
      const result = getAllEvaluations(state)
      expect(result).toContainEqual({ "ID": "RV_MATCHES_ONCE", "inputs": ["RV"], "success": true })
    })

  })







})
