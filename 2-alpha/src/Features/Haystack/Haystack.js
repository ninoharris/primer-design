import React from 'react'
import HelperPosition from '../../components/HelperPosition'
import HaystackForward from './HaystackForward';
import HaystackReverse from './HaystackReverse'
import Codons from '../../components/Codons'
import { Left5, Left3, Right5, Right3 } from '../../components/HelperEnds'
import HaystackRestrictionSites from './HaystackRestrictionSites';

const Haystack = ({
  forward, reverse, FG, RG, restrictionSites
}) => {
  const className = "haystack mt-3" + (FG.length > 3 ? ' haystack-with-UFG' : '') + (RG.length > 3 ? ' haystack-with-URG' : '')
  return (
    <div className={className}>
      <div style={{ position: 'relative', top: '-1rem' }}>
        <div className="forward">
          <div className="multiline">
            <div className="sequence">
              <HelperPosition length={forward.length} />
              <HaystackRestrictionSites seq={forward} restrictionSites={restrictionSites} />
              <Left5 />{forward}<Right3 />
              <HaystackReverse />
            </div>
          </div>
        </div>
        <div className="reverse">
          <div className="multiline">
            <div className="sequence">
              <HaystackForward />
              <Left3 />{reverse}<Right5 />
            </div>
            <Codons seq={forward} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Haystack