import _ from 'lodash'
import { getAllEvaluations } from './evaluations'

expect.extend({
  toContainObjWith: function (util, customEqualityTesters) {
    return {
      compare: function (actual, expected) {
        if (expected === undefined) {
          expected = '';
        }
        var result = {};
        _.map(actual, function (item) {
          _.map(item, function (subItem, key) {
            result.pass = util.equals(subItem,
              expected[key], customEqualityTesters);
          });
        });
        if (result.pass) {
          result.message = 'Expected ' + actual + 'to contain ' + expected;
        }
        else {
          result.message = 'Expected ' + actual + 'to contain ' + expected + ' but it was not found';
        }
        return result;
      }
    };
  }
})

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
            haystack: 'GTACACGGTGGTAACCCATAGGTCCGCTCCCCCAGCTTGGTGCATCAGGTCCTAATACAGCGGCCGGCTGCTGTAGGCCGTTGTAGAAACAGTAGACACGGGCACTCGGAACCTGCAGACCTCAGTGAGCTGAGTCGCCTTCTTTTGTCCCAAAGTGGCGTGCGCAGCACATGCCCCTCAGCGGGTGGCTATTACTGTCCAAGGGGGTCACACCCACCAATGTGCGACCGCGGAGCTGGACCACTTGTGCAAAGCTGTGCCACCCGACTTCGCTCGTGCAGGGTACGTGGGGCACAGCGA',
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

    test('FV and RV shouldnt have the same restriction site', () => {
      state = {
        ...state,
        formInputs: {
          FV: 'actagt',
          RV: 'actagt',
          FG: '',
          RG: '',
        }
      }
      const result = getAllEvaluations(state)
      expect(result).toMatchObject([
        { ID: "FV_MATCHES_ONCE" },
        { ID: "RV_MATCHES_ONCE" },
        { ID: "SAME_RESTRICTION_SITES" },
        { ID: "VECTOR_OVERLAP" },
        { ID: "VECTORS_TOO_CLOSE" },
      ])
    })

    test('FV and RV are tested for overlap', () => {
      state = {
        ...state,
        formInputs: {
          FV: 'ccgcgg',
          RV: 'aagctt',
          FG: '',
          RG: '',
        }
      }
      const result = getAllEvaluations(state)
      expect(result).toMatchObject([
        { ID: "FV_MATCHES_ONCE" },
        { ID: "RV_MATCHES_ONCE" },
        { ID: "VECTORS_TOO_CLOSE" },
      ])
    })

    test('FV and RV are tested for being too close', () => {
      state = {
        ...state,
        formInputs: {
          FV: 'aagctt',
          RV: 'ccgcgg',
          FG: '',
          RG: '',
        }
      }
      const result = getAllEvaluations(state)
      expect(result).toMatchObject([
        { ID: "FV_MATCHES_ONCE" },
        { ID: "RV_MATCHES_ONCE" },
        { ID: "VECTOR_OVERLAP" },
        { ID: "VECTORS_TOO_CLOSE" },
      ])
    })

    test('FG is tested for being too short but still is shown to be correct so far', () => {
      state = {
        ...state,
        formInputs: {
          FV: '',
          RV: '',
          FG: 'ACGGTG',
          RG: '',
        }
      }
      const result = getAllEvaluations(state)
      expect(result).toMatchObject([
        { ID: "FORWARD_HAYSTACK_MATCH" },
        { ID: "FORWARD_TOO_SHORT" },
      ])
    })

    test('FG is tested for being correct', () => {
      state = {
        ...state,
        formInputs: {
          FV: '',
          RV: '',
          FG: 'ACGGTGGTAACC',
          RG: '',
        }
      }
      const result = getAllEvaluations(state)
      expect(result).toMatchObject([
        { ID: "FORWARD_HAYSTACK_MATCH" },
      ])
    })

    test('FG is tested for being the right strand', () => {
      state = {
        ...state,
        formInputs: {
          FV: '',
          RV: '',
          FG: 'TGCCACCATTGG',
          RG: '',
        }
      }
      const result = getAllEvaluations(state)
      expect(result).toMatchObject([
        { ID: "FORWARD_WRONG_STRAND" },
      ])
    })

    test('FG is tested for being the right strand', () => {
      state = {
        ...state,
        formInputs: {
          FV: '',
          RV: '',
          FG: 'CCAATGGTGGCA',
          RG: '',
        }
      }
      const result = getAllEvaluations(state)
      expect(result).toMatchObject([
        { ID: "FORWARD_WRONG_DIRECTION" },
      ])
    })

    test('FG is tested for being the right frame, and provides the right frame context', () => {
      state = {
        ...state,
        formInputs: {
          FV: '',
          RV: '',
          FG: 'CACGGTGGTAACC',
          RG: '',
        }
      }
      const result = getAllEvaluations(state)
      expect(result).toMatchObject([
        { ID: "FORWARD_HAYSTACK_MATCH" },
        { ID: "FORWARD_HAYSTACK_OUT_OF_FRAME" },
      ])
    })


    test('Tests if a restriction site is contained within the haystack', () => {
      state = {
        ...state,
        formInputs: {
          FV: 'ccgcgg',
          RV: '',
          FG: '',
          RG: '',
        }
      }
      const result = getAllEvaluations(state)
      expect(result).toMatchObject([
        { ID: "HAYSTACK_CONTAINS_FV_SITE" },
      ])
    })

  })







})
