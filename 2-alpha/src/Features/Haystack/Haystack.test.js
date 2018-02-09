import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { Haystack } from './index'

const props = {
  "forward": "GTACACGGTGGTAACCCATAGGTCCGCTCCCCCAGCTTGGTGCATCAGGTCCTAATACAGCGGCCGGCTGCTGTAGGCCGTTGTAGAAACAGTAGACACGGGCACTCGGAACCTGCAGACCTCAGTGAGCTGAGTCGCCTTCTTTTGTCCCAAAGTGGCGTGCGCAGCACATGCCCCTCAGCGGGTGGCTATTACTGTCCAAGGGGGTCACACCCACCAATGTGCGACCGCGGAGCTGGACCACTTGTGCAAAGCTGTGCCACCCGACTTCGCTCGTGCAGGGTACGTGGGGCACAGCGA",
  "reverse": "CATGTGCCACCATTGGGTATCCAGGCGAGGGGGTCGAACCACGTAGTCCAGGATTATGTCGCCGGCCGACGACATCCGGCAACATCTTTGTCATCTGTGCCCGTGAGCCTTGGACGTCTGGAGTCACTCGACTCAGCGGAAGAAAACAGGGTTTCACCGCACGCGTCGTGTACGGGGAGTCGCCCACCGATAATGACAGGTTCCCCCAGTGTGGGTGGTTACACGCTGGCGCCTCGACCTGGTGAACACGTTTCGACACGGTGGGCTGAAGCGAGCACGTCCCATGCACCCCGTGTCGCT",
  "FG": "",
  "RG": "",
  "restrictionSites": [
    {
      "seq": "CTGCAG",
      "name": "PstI",
      "len": 6,
      "cutsForward": 5,
      "cutsReverse": 1,
      "color": "#aa4fc3",
      "pos": 112
    }, {
      "seq": "CCGCGG",
      "name": "SacII",
      "len": 6,
      "cutsForward": 4,
      "cutsReverse": 2,
      "color": "#67a77f",
      "pos": 227
    },
  ]
}

test('Haystack displays, example -L3d6TNs2PKt-fMf7_lS', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<Haystack {...props} />)
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})