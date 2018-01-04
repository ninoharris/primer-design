import React from 'react'
import { connect } from 'react-redux'

const PrimerPreviewSmall = ({ strand, plasmidSegment, geneSegment, animatingPreview }) => {
  const displayBases = (bases) => bases.split('').map((l,i) =>
    <span className="l" key={i}>{l}</span>
  )
  const activeClass = animatingPreview ? 'active' : ''
  if(strand === 'reverse') {
    return (
      <div className={`primer-preview-reverse ` + activeClass}>
        <span className='RV'>
          <span className='prime-5 l'>5</span>
          <span className='prime-5 l'>-</span>
          {displayBases(plasmidSegment)}
        </span>
        <span className='RG'>
          {displayBases(geneSegment)}
          <span className='prime-3 l'>-</span>
          <span className='prime-3 l'>3</span>
        </span>
      </div>
    )
  }
  if(strand === 'forward') { // doing a double if because I dont like silent errors.
    return (
      <div className={`primer-preview-forward` + activeClass}>
        <span className='FV'>
          <span className='prime-5'>5</span>
          <span className='prime-5'>-</span>
          {displayBases(plasmidSegment)}
        </span>
        <span className='FG'>
          {displayBases(geneSegment)}
          <span className='prime-3'>-</span>
          <span className='prime-3'>3</span>
        </span>
      </div>
    )
  }
}

const mapStateToProps = ({formInputs, animatingPreview }, ownProps) => {
  const plasmidSegment = ownProps.strand === 'forward' ? 'FV' : 'RV'
  const geneSegment = ownProps.strand === 'forward' ? 'FG' : 'RG'
  return {
    strand: ownProps.strand,
    plasmidSegment: formInputs[plasmidSegment],
    geneSegment: formInputs[geneSegment],
    animatingPreview
  }
}

export default connect(mapStateToProps)(PrimerPreviewSmall)