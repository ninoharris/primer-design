import { 
  seqInVector
} from './index'

test('seqInVector gets the correct number of matches and positions', () => {
  const vector = 'CCCGGGTCTAGACCATGGGTCGACCTCGAGGAGCCCCGGGTC'
  const matchesOne = 'GGTCTAGA' //ggg.tct.aga MATCHES Xba1
  const matchesTwice = 'CCCGGGTC'
  const doesntMatch = 'GTCGTGTC'


  expect(seqInVector(vector, matchesOne)).toEqual([4])
  expect(seqInVector(vector, matchesTwice ).length).toEqual(2)
  expect(seqInVector(vector, doesntMatch ).length).toEqual(0)
})

