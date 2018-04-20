import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import * as api from '../api'

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
`

const REItem = styled.div`
  &&& p {
    margin-bottom: 0;
    padding-bottom: 0;
  }
`

const RestrictionSitesPreview = () => {
  const RESitesList = api.RESites.map((RESite) => {
    
    // const reverseMarker = isForwardCutAfterReverseCut ? (
    //   <span className="marker">
    //     <span className="cut-right">{_.pad('', RESite.cutsReverse, ' ')}</span>
    //     <span className="cut-center">{_.pad('', Math.abs(RESite.cutsReverse - RESite.cutsForward), ' ')}</span>
    //   </span>
    // ) : (
    //   <span className="marker">
    //     <span className="uncut">{_.pad('', RESite.cutsForward, ' ')}</span>
    //     <span className="cut-center">{_.pad('', Math.abs(RESite.cutsReverse - RESite.cutsForward), ' ')}</span>
    //     <span className="cut-right"></span>
    //   </span>
    // )
    // return (
    // <div key={RESite.seq} className="RESites-list-item">
    //   <div className="name" style={{ backgroundColor: RESite.color, color: api.pickTextColor(RESite.color) }}>{RESite.name}:</div>
    //   <div className="preview">
    //     <div className="sequence">
    //       <span className="marker"><span className="cut-right">{_.pad('', RESite.cutsForward, ' ')}</span></span>
    //       {RESite.seq}
    //     </div>
    //     <div className="sequence">
    //       {reverseMarker}
    //       {api.complementFromString(RESite.seq)}
    //     </div >
    //   </div>
    // </div>
    // )
    // cut up restriction enzyme site
    const isForwardCutAfterReverseCut = (RESite.cutsForward - RESite.cutsReverse) >= 0
    const tl = RESite.seq.slice(0, RESite.cutsForward)
    const tr = RESite.seq.slice(RESite.cutsForward)
    const bl = api.reverse(RESite.seq).slice(0, RESite.cutsReverse)
    const br = api.reverse(RESite.seq).slice(RESite.cutsReverse)
    const color = RESite.color
    return (
      <REItem>
        <div>
          <p style={{ color: RESite.color}}>{RESite.name}</p>
          <div className="sequence">
            <span className="re-site-tl" style={{backgroundColor: color}}>{tl}</span>
            <span className="re-site-tr" style={{ backgroundColor: lighten(0.15, color) }}>{tr}</span>
          </div>
          <div className="sequence">
            <span className="re-site-bl" style={{ backgroundColor: lighten(0.15, color) }}>{bl}</span>
            <span className="re-site-br" style={{ backgroundColor: color }}>{br}</span>
          </div>
        </div>
      </REItem>
    )
  })

  return (
    <Container className="RESites-list">
      {RESitesList}
    </Container>
  )
}

export default RestrictionSitesPreview