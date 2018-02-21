import React from 'react';
import { showCodons } from '../selectors'
import { connect } from 'react-redux'
import { getAASeq, properSpacing } from '../api'

const Codons = ({ seq = '', showCodons }) => {
  const firstLine = getAASeq({ seq, separator: '  ' }).join('')
  const secondLine = getAASeq({ seq, offset: 1, separator: '  ' }).join('')
  const thirdLine = getAASeq({ seq, offset: 2, separator: '  ' }).join('')
  if(!showCodons) return null
  return (
    <div className="codons">
      <div className="codon sequence">
        {properSpacing(firstLine)}
      </div>
      <div className="codon sequence">
        {properSpacing(secondLine)}
      </div>
      <div className="codon sequence">
        {properSpacing(thirdLine)}
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