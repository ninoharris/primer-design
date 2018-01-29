import React from 'react';
import { showCodons } from '../selectors'
import { connect } from 'react-redux'
import { getAASeq } from '../api'

const Codons = ({ seq = '', showCodons }) => {

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

const mapStateToProps = (state, ownProps) => {
  return { 
    showCodons: ownProps.showCodons || showCodons(state)
  } 
}

export default connect(mapStateToProps)(Codons)