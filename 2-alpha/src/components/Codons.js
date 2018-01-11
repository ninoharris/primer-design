import React from 'react';
import { connect } from 'react-redux'
import { getAASeq } from '../api'
// import { showCodons } from '../selectors/index';

const Codons = ({ seq = '', showCodons }) => {
  // getChildContext = () => {}
  console.log(showCodons)
  if(!showCodons) return null
  return (
    <div className="codons">
      <div className="codon sequence">
        {getAASeq({ seq, separator: '  ' })}
      </div>
      <div className="codon sequence">
        {' '}{getAASeq({ seq, offset: 1, separator: '  ' })}
      </div>
      <div className="codon sequence">
        {'  '}{getAASeq({ seq, offset: 2, separator: '  ' })}
      </div>
    </div>
  )
}

const mapStateToProps = ({ showCodons }) => ({ showCodons })

export default connect(mapStateToProps)(Codons)